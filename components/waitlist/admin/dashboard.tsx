"use client";

import { useEffect, useMemo, useState } from "react";
import type { RoleInterest } from "@/lib/api/types";
import {
  addSubscriber,
  deleteSubscriber,
  getBroadcastLogs,
  getSubscribers,
  sendBroadcast,
  toggleVerifyVendor,
  type AdminSubscriber,
  type BroadcastLog,
} from "@/lib/waitlist/admin-store";
import { AdminAddSubscriberModal } from "./add-subscriber-modal";
import { AdminBackground } from "./background";
import { AdminBroadcastPanel } from "./broadcast-panel";
import { AdminHeader } from "./header";
import { AdminPageHeader } from "./page-header";
import { AdminStatsRow } from "./stats-row";
import { AdminSubscribersPanel } from "./subscribers-panel";
import type { AdminTab, RoleFilter, SortBy } from "./types";
import { ADMIN_PAGE_SIZE } from "./types";
import {
  computeAdminMetrics,
  exportSubscribersCSV,
  filterAndSortSubscribers,
  paginateItems,
} from "./utils";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [subscribers, setSubscribers] = useState<AdminSubscriber[]>([]);
  const [broadcasts, setBroadcasts] = useState<BroadcastLog[]>([]);
  const [activeTab, setActiveTab] = useState<AdminTab>("list");

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("position");
  const [currentPage, setCurrentPage] = useState(1);

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

  useEffect(() => {
    setSubscribers(getSubscribers());
    setBroadcasts(getBroadcastLogs());
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, roleFilter, sortBy]);

  const filteredSubscribers = useMemo(
    () =>
      filterAndSortSubscribers(
        subscribers,
        searchQuery,
        roleFilter,
        sortBy,
      ),
    [subscribers, searchQuery, roleFilter, sortBy],
  );

  const pagination = useMemo(
    () =>
      paginateItems(filteredSubscribers, currentPage, ADMIN_PAGE_SIZE),
    [filteredSubscribers, currentPage],
  );

  const metrics = useMemo(
    () => computeAdminMetrics(subscribers),
    [subscribers],
  );

  const handleDelete = (email: string) => {
    if (confirm(`Are you sure you want to delete ${email}?`)) {
      setSubscribers(deleteSubscriber(email));
    }
  };

  const handleToggleVerify = (email: string) => {
    setSubscribers(toggleVerifyVendor(email));
  };

  const handleAddSubscriberSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError(null);

    if (!addFirstName || !addEmail) {
      setAddError("First name and email are required.");
      return;
    }

    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    try {
      addSubscriber({
        firstName: addFirstName.trim(),
        email: addEmail.trim(),
        roleInterest: addRole,
        status: "active",
      });
      setSubscribers(getSubscribers());
      setIsAdding(false);
      setShowAddModal(false);
      setAddFirstName("");
      setAddEmail("");
      setAddRole("buyer");
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

    const steps = [15, 30, 48, 65, 80, 95, 100];
    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setBroadcastProgress(step);
    }

    sendBroadcast(broadcastSubject, broadcastMessage);
    setBroadcasts(getBroadcastLogs());
    setIsBroadcasting(false);
    setBroadcastSuccess(true);
    setBroadcastSubject("");
    setBroadcastMessage("");

    setTimeout(() => setBroadcastSuccess(false), 4000);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setAddError(null);
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
            subscribers={pagination.items}
            searchQuery={searchQuery}
            roleFilter={roleFilter}
            sortBy={sortBy}
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalItems}
            startIndex={pagination.startIndex}
            endIndex={pagination.endIndex}
            onSearchChange={setSearchQuery}
            onRoleFilterChange={setRoleFilter}
            onSortChange={setSortBy}
            onPageChange={setCurrentPage}
            onExport={() => exportSubscribersCSV(filteredSubscribers)}
            onAdd={() => setShowAddModal(true)}
            onDelete={handleDelete}
            onToggleVerify={handleToggleVerify}
          />
        ) : (
          <AdminBroadcastPanel
            subscriberCount={subscribers.length}
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
