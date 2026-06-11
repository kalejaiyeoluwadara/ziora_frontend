"use client";

import { useEffect, useMemo, useState } from "react";
import type { RoleInterest, AdminOverviewMetrics } from "@/lib/api/types";
import {
  getAdminOverview,
  getAdminSubscribers,
  adminAddSubscriber,
  adminPatchSubscriber,
  adminDeleteSubscriber,
  adminSendBroadcast,
  adminGetBroadcastLogs,
  downloadSubscribersCSV,
} from "@/lib/api/ApClients";
import type { AdminSubscriber, BroadcastLog } from "@/lib/waitlist/admin-store";
import { AdminAddSubscriberModal } from "./add-subscriber-modal";
import { AdminBackground } from "./background";
import { AdminBroadcastPanel } from "./broadcast-panel";
import { AdminHeader } from "./header";
import { AdminPageHeader } from "./page-header";
import { AdminStatsRow } from "./stats-row";
import { AdminSubscribersPanel } from "./subscribers-panel";
import type { AdminTab, RoleFilter, SortBy } from "./types";
import { ADMIN_PAGE_SIZE } from "./types";

interface AdminDashboardProps {
  onLogout: () => void;
}

// Define local interface for subscriber mapping that keeps compatible fields and includes database ID
interface DashboardSubscriber extends AdminSubscriber {
  _id: string;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [subscribers, setSubscribers] = useState<DashboardSubscriber[]>([]);
  const [broadcasts, setBroadcasts] = useState<BroadcastLog[]>([]);
  const [activeTab, setActiveTab] = useState<AdminTab>("list");

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("position");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Trigger state to reload components when operations modify data
  const [refetchTrigger, setRefetchTrigger] = useState(0);
  const triggerRefetch = () => setRefetchTrigger((prev) => prev + 1);

  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [showAddModal, setShowAddModal] = useState(false);
  const [addFirstName, setAddFirstName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addRole, setAddRole] = useState<RoleInterest>("buyer");
  const [addError, setAddError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastProgress, setBroadcastProgress] = useState(0);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  const [overview, setOverview] = useState<AdminOverviewMetrics | null>(null);

  // Fetch overview statistics and broadcast logs
  useEffect(() => {
    let isMounted = true;

    async function loadStatsAndLogs() {
      try {
        const stats = await getAdminOverview();
        if (isMounted) {
          setOverview(stats);
        }

        const logs = await adminGetBroadcastLogs();
        if (isMounted) {
          const mappedLogs = logs.map((log) => ({
            id: log._id,
            subject: log.subject,
            message: log.message,
            sentAt: log.sentAt,
            recipientCount: log.recipientCount,
          }));
          setBroadcasts(mappedLogs);
        }
      } catch (err) {
        console.error("Failed to load overview data or broadcast logs:", err);
      }
    }

    loadStatsAndLogs();

    return () => {
      isMounted = false;
    };
  }, [refetchTrigger]);

  // Fetch paginated subscribers list
  useEffect(() => {
    let isMounted = true;

    async function loadSubscribers() {
      try {
        setIsLoading(true);

        let backendSort = "position";
        if (sortBy === "invites") backendSort = "referralCount";
        else if (sortBy === "date") backendSort = "createdAt";

        const res = await getAdminSubscribers({
          page: currentPage,
          limit: ADMIN_PAGE_SIZE,
          search: searchQuery,
          role: roleFilter,
          sortBy: backendSort,
        });

        if (isMounted) {
          const mappedSubs: DashboardSubscriber[] = res.subscribers.map((sub) => ({
            email: sub.email,
            firstName: sub.firstName || "Subscriber",
            roleInterest: sub.roleInterest,
            referralCode: sub.referralCode,
            referralCount: sub.referralCount,
            position: sub.position,
            joinedDate: sub.createdAt,
            status: sub.status === "converted"
              ? ("verified_vendor" as const)
              : sub.status === "unsubscribed"
              ? ("unsubscribed" as const)
              : ("active" as const),
            _id: sub._id,
          }));

          setSubscribers(mappedSubs);
          setTotalPages(res.pages);
          setTotalItems(res.total);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to load subscribers list:", err);
          setIsLoading(false);
        }
      }
    }

    loadSubscribers();

    return () => {
      isMounted = false;
    };
  }, [currentPage, searchQuery, roleFilter, sortBy, refetchTrigger]);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, roleFilter, sortBy]);

  // Compute metrics from the fetched overview stats
  const metrics = useMemo(() => {
    if (!overview) {
      return {
        totalSubs: 0,
        totalInvites: 0,
        activeVendors: 0,
        verifiedVendors: 0,
        conversionRate: 0,
      };
    }

    const totalSubs = overview.totalSubscribers;
    const totalInvites = Math.round(overview.totalSubscribers * overview.averageReferrals);
    const activeVendors = overview.roleBreakdown.vendor + overview.roleBreakdown.both;
    const verifiedVendors = overview.statusBreakdown.converted;
    const conversionRate = totalSubs > 0
      ? Math.min(100, Math.round(overview.averageReferrals * 100))
      : 0;

    return {
      totalSubs,
      totalInvites,
      activeVendors,
      verifiedVendors,
      conversionRate,
    };
  }, [overview]);

  const startIndex = subscribers.length === 0 ? 0 : (currentPage - 1) * ADMIN_PAGE_SIZE + 1;
  const endIndex = Math.min(currentPage * ADMIN_PAGE_SIZE, totalItems);

  const handleDelete = async (email: string) => {
    const sub = subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
    if (!sub) return;

    if (confirm(`Are you sure you want to delete ${email}?`)) {
      try {
        await adminDeleteSubscriber(sub._id);
        setCurrentPage(1);
        triggerRefetch();
      } catch (err: unknown) {
        alert(err instanceof Error ? err.message : "Failed to delete subscriber.");
      }
    }
  };

  const handleToggleVerify = async (email: string) => {
    const sub = subscribers.find((s) => s.email.toLowerCase() === email.toLowerCase());
    if (!sub) return;

    const newStatus = sub.status === "verified_vendor" ? "active" : "converted";
    try {
      await adminPatchSubscriber(sub._id, { status: newStatus });
      triggerRefetch();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Failed to update subscriber status.");
    }
  };

  const handleAddSubscriberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);

    if (!addFirstName || !addEmail) {
      setAddError("First name and email are required.");
      return;
    }

    setIsAdding(true);

    try {
      await adminAddSubscriber({
        email: addEmail.trim(),
        firstName: addFirstName.trim(),
        roleInterest: addRole,
        status: "active",
      });
      setIsAdding(false);
      setShowAddModal(false);
      setAddFirstName("");
      setAddEmail("");
      setAddRole("buyer");
      setCurrentPage(1);
      triggerRefetch();
    } catch (err: unknown) {
      setIsAdding(false);
      setAddError(
        err instanceof Error ? err.message : "Failed to add subscriber.",
      );
    }
  };

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastSubject || !broadcastMessage) return;

    setIsBroadcasting(true);
    setBroadcastProgress(5);
    setBroadcastSuccess(false);

    const steps = [15, 30, 48, 65, 80, 95];
    let stepIdx = 0;
    const progressInterval = setInterval(() => {
      setBroadcastProgress(steps[stepIdx] || 95);
      if (stepIdx < steps.length - 1) stepIdx++;
    }, 200);

    try {
      await adminSendBroadcast({
        subject: broadcastSubject,
        message: broadcastMessage,
      });

      clearInterval(progressInterval);
      setBroadcastProgress(100);

      setIsBroadcasting(false);
      setBroadcastSuccess(true);
      setBroadcastSubject("");
      setBroadcastMessage("");

      triggerRefetch();

      setTimeout(() => setBroadcastSuccess(false), 4000);
    } catch (err: unknown) {
      clearInterval(progressInterval);
      setIsBroadcasting(false);
      setBroadcastProgress(0);
      alert(err instanceof Error ? err.message : "Failed to send broadcast.");
    }
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setAddError(null);
  };

  const handleExport = async () => {
    try {
      await downloadSubscribersCSV();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="relative min-h-screen flex-1 overflow-hidden bg-[#060814] pb-16 text-slate-100">
      <AdminBackground />
      <AdminHeader onLogout={onLogout} />

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <AdminPageHeader activeTab={activeTab} onTabChange={setActiveTab} />
        <AdminStatsRow metrics={metrics} />

        {activeTab === "list" ? (
          <AdminSubscribersPanel
            subscribers={subscribers}
            searchQuery={searchQuery}
            roleFilter={roleFilter}
            sortBy={sortBy}
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            startIndex={startIndex}
            endIndex={endIndex}
            onSearchChange={setSearchQuery}
            onRoleFilterChange={setRoleFilter}
            onSortChange={setSortBy}
            onPageChange={setCurrentPage}
            onExport={handleExport}
            onAdd={() => setShowAddModal(true)}
            onDelete={handleDelete}
            onToggleVerify={handleToggleVerify}
          />
        ) : (
          <AdminBroadcastPanel
            subscriberCount={totalItems}
            broadcasts={broadcasts}
            subject={broadcastSubject}
            message={broadcastMessage}
            isBroadcasting={isBroadcasting}
            broadcastProgress={broadcastProgress}
            broadcastSuccess={broadcastSuccess}
            onSubjectChange={setBroadcastSubject}
            onMessageChange={setBroadcastMessage}
            onSubmit={handleSendBroadcast}
          />
        )}
      </div>

      <AdminAddSubscriberModal
        isOpen={showAddModal}
        firstName={addFirstName}
        email={addEmail}
        role={addRole}
        error={addError}
        isAdding={isAdding}
        onClose={closeAddModal}
        onFirstNameChange={setAddFirstName}
        onEmailChange={setAddEmail}
        onRoleChange={setAddRole}
        onSubmit={handleAddSubscriberSubmit}
      />
    </main>
  );
}
