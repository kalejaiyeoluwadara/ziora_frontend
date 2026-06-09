"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Trash2,
  UserPlus,
  Download,
  Send,
  Search,
  Filter,
  LogOut,
  Megaphone,
  Check,
  Calendar,
  Users,
  Percent,
  AlertTriangle,
  Award
} from "lucide-react";
import { ZioraLogo, Spinner } from "@/components/icons";
import { Button } from "@/components/ui/button";
import {
  getSubscribers,
  addSubscriber,
  deleteSubscriber,
  toggleVerifyVendor,
  getBroadcastLogs,
  sendBroadcast,
  type AdminSubscriber,
  type BroadcastLog
} from "@/lib/waitlist/admin-store";
import type { RoleInterest } from "@/lib/api/types";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  // Waitlist data
  const [subscribers, setSubscribers] = useState<AdminSubscriber[]>([]);
  const [broadcasts, setBroadcasts] = useState<BroadcastLog[]>([]);

  // Navigation tabs: 'list' | 'broadcast'
  const [activeTab, setActiveTab] = useState<"list" | "broadcast">("list");

  // Filtering / Search
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "buyer" | "vendor" | "both">("all");
  const [sortBy, setSortBy] = useState<"position" | "invites" | "date">("position");

  // Modals / Loading State
  const [showAddModal, setShowAddModal] = useState(false);
  const [addFirstName, setAddFirstName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addRole, setAddRole] = useState<RoleInterest>("buyer");
  const [addError, setAddError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  // Broadcast Form State
  const [broadcastSubject, setBroadcastSubject] = useState("");
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastProgress, setBroadcastProgress] = useState(0);
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Load state on mount
  useEffect(() => {
    setSubscribers(getSubscribers());
    setBroadcasts(getBroadcastLogs());
  }, []);

  // Filter and Sort subscribers
  const filteredSubscribers = subscribers
    .filter((sub) => {
      const matchSearch =
        sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.firstName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRole = roleFilter === "all" || sub.roleInterest === roleFilter;
      return matchSearch && matchRole;
    })
    .sort((a, b) => {
      if (sortBy === "position") {
        return a.position - b.position;
      }
      if (sortBy === "invites") {
        return b.referralCount - a.referralCount;
      }
      // date
      return new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime();
    });

  // Analytics Metrics
  const totalSubs = subscribers.length;
  const totalInvites = subscribers.reduce((acc, s) => acc + s.referralCount, 0);
  const activeVendors = subscribers.filter((s) => s.roleInterest === "vendor" || s.roleInterest === "both").length;
  const verifiedVendors = subscribers.filter((s) => s.status === "verified_vendor").length;
  
  // Calculate a mock conversion rate (number of users who referred at least 1 person / total)
  const conversionRate = totalSubs > 0 
    ? Math.round((subscribers.filter((s) => s.referralCount > 0).length / totalSubs) * 100) 
    : 0;

  // Actions
  const handleDelete = (email: string) => {
    if (confirm(`Are you sure you want to delete ${email}?`)) {
      const updated = deleteSubscriber(email);
      setSubscribers(updated);
    }
  };

  const handleToggleVerify = (email: string) => {
    const updated = toggleVerifyVendor(email);
    setSubscribers(updated);
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
        status: "active"
      });
      setSubscribers(getSubscribers());
      setIsAdding(false);
      setShowAddModal(false);
      // reset
      setAddFirstName("");
      setAddEmail("");
      setAddRole("buyer");
    } catch (err: any) {
      setIsAdding(false);
      setAddError(err.message || "Failed to add subscriber.");
    }
  };

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastSubject || !broadcastMessage) return;

    setIsBroadcasting(true);
    setBroadcastProgress(5);
    setBroadcastSuccess(false);

    // Simulate sending progress bar
    const steps = [15, 30, 48, 65, 80, 95, 100];
    for (const step of steps) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setBroadcastProgress(step);
    }

    sendBroadcast(broadcastSubject, broadcastMessage);
    
    // Refresh states
    setBroadcasts(getBroadcastLogs());
    setIsBroadcasting(false);
    setBroadcastSuccess(true);
    setBroadcastSubject("");
    setBroadcastMessage("");
    
    setTimeout(() => setBroadcastSuccess(false), 4000);
  };

  const handleExportCSV = () => {
    const headers = ["Rank/Position", "First Name", "Email", "Role", "Invites", "Joined Date", "Status"];
    const rows = filteredSubscribers.map((sub) => [
      sub.position,
      sub.firstName,
      sub.email,
      sub.roleInterest,
      sub.referralCount,
      new Date(sub.joinedDate).toLocaleDateString(),
      sub.status
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ziora_waitlist_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="flex-1 bg-[#060814] text-slate-100 relative overflow-hidden min-h-screen pb-16">
      {/* Cyber Grid Background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1E5BFF 1px, transparent 1px), linear-gradient(to bottom, #1E5BFF 1px, transparent 1px)",
          backgroundSize: "45px 45px",
        }}
      />
      {/* Ambient Neon Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-blue-light/10 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[10%] w-[40%] h-[40%] rounded-full bg-[#FF007A]/5 blur-[120px] pointer-events-none -z-10" />

      {/* Navbar */}
      <header className="border-b border-slate-900 bg-slate-950/40 backdrop-blur-md sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="Ziora home">
              <ZioraLogo className="h-6.5 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
            </Link>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold font-mono bg-brand-blue/20 text-brand-blue-light border border-brand-blue-light/30">
              Admin console
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        {/* Page title */}
        <section className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight sm:text-3xl">
              Waitlist Control Panel
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Analyze waitlist performance, manage participants, and broadcast launch announcements.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("list")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                activeTab === "list"
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue-dark/20"
                  : "bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Participants
            </button>
            <button
              onClick={() => setActiveTab("broadcast")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                activeTab === "broadcast"
                  ? "bg-brand-blue text-white shadow-md shadow-brand-blue-dark/20"
                  : "bg-slate-900/50 border border-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              Launch Broadcasts
            </button>
          </div>
        </section>

        {/* HUD Stats Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[10px] font-bold tracking-wider uppercase font-mono">Total Subscribers</span>
              <Users className="h-4 w-4 text-brand-blue-light" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">{totalSubs}</span>
              <span className="text-xs text-emerald-400 block mt-1 font-mono">Real-time sync</span>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[10px] font-bold tracking-wider uppercase font-mono">Total Referral Invites</span>
              <Megaphone className="h-4 w-4 text-[#FF8A00]" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">{totalInvites}</span>
              <span className="text-xs text-slate-400 block mt-1 font-mono">Across all nodes</span>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[10px] font-bold tracking-wider uppercase font-mono">Invite Share Rate</span>
              <Percent className="h-4 w-4 text-[#FF007A]" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">{conversionRate}%</span>
              <span className="text-xs text-[#FF007A] block mt-1 font-mono">Conversion factor</span>
            </div>
          </div>

          <div className="bg-slate-950/60 border border-slate-900 rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-[10px] font-bold tracking-wider uppercase font-mono">Active / Verified Vendors</span>
              <Award className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="mt-3">
              <span className="text-3xl font-extrabold text-white tracking-tight">
                {activeVendors} <span className="text-slate-600 text-sm font-normal">/ {verifiedVendors} verified</span>
              </span>
              <span className="text-xs text-emerald-400 block mt-1 font-mono">Manual audit active</span>
            </div>
          </div>
        </section>

        {activeTab === "list" ? (
          /* TAB 1: SUBSCRIBERS TABLE VIEW */
          <section className="bg-slate-950/40 border border-slate-900 rounded-3xl p-5 md:p-6 overflow-hidden">
            {/* Filter and Action Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 pb-6 border-b border-slate-900">
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                {/* Search field */}
                <div className="relative flex-1 sm:w-64">
                  <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-500">
                    <Search className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search name or email..."
                    className="h-10 w-full pl-10 pr-4 rounded-xl border border-slate-800 bg-slate-900/40 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-brand-blue-light transition-all"
                  />
                </div>

                {/* Filter dropdown */}
                <div className="relative sm:w-48">
                  <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-500">
                    <Filter className="h-4 w-4" />
                  </span>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value as any)}
                    className="h-10 w-full pl-10 pr-8 rounded-xl border border-slate-800 bg-slate-900/40 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-blue-light transition-all appearance-none cursor-pointer"
                  >
                    <option value="all" className="bg-[#0b0e1b]">Filter: All Roles</option>
                    <option value="buyer" className="bg-[#0b0e1b]">Filter: Buyers</option>
                    <option value="vendor" className="bg-[#0b0e1b]">Filter: Vendors</option>
                    <option value="both" className="bg-[#0b0e1b]">Filter: Both</option>
                  </select>
                </div>
                
                {/* Sort dropdown */}
                <div className="relative sm:w-48">
                  <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-slate-500">
                    <Calendar className="h-4 w-4" />
                  </span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="h-10 w-full pl-10 pr-8 rounded-xl border border-slate-800 bg-slate-900/40 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-brand-blue-light transition-all appearance-none cursor-pointer"
                  >
                    <option value="position" className="bg-[#0b0e1b]">Sort: Rank / Position</option>
                    <option value="invites" className="bg-[#0b0e1b]">Sort: Referral Count</option>
                    <option value="date" className="bg-[#0b0e1b]">Sort: Sign-Up Date</option>
                  </select>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 w-full sm:w-auto self-end">
                <button
                  onClick={handleExportCSV}
                  className="flex h-10 flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/40 px-4 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <Download className="h-3.5 w-3.5" />
                  Export CSV
                </button>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex h-10 flex-1 sm:flex-initial items-center justify-center gap-1.5 rounded-xl bg-brand-blue text-xs font-semibold text-white hover:bg-brand-blue-light transition-colors shadow-md shadow-brand-blue-dark/10"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  Add Subscriber
                </button>
              </div>
            </div>

            {/* Table wrapper */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 font-semibold uppercase tracking-wider h-10">
                    <th className="pb-3 px-4">Position</th>
                    <th className="pb-3 px-4">Name</th>
                    <th className="pb-3 px-4">Email</th>
                    <th className="pb-3 px-4">Role</th>
                    <th className="pb-3 px-4 text-center">Invites</th>
                    <th className="pb-3 px-4">Joined Date</th>
                    <th className="pb-3 px-4">Status</th>
                    <th className="pb-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60">
                  {filteredSubscribers.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-500">
                        No subscribers found matching the query filters.
                      </td>
                    </tr>
                  ) : (
                    filteredSubscribers.map((sub) => (
                      <tr key={sub.email} className="hover:bg-slate-900/20 transition-colors h-12">
                        <td className="px-4 font-mono font-bold text-slate-400">
                          #{sub.position}
                        </td>
                        <td className="px-4 font-semibold text-white">
                          {sub.firstName}
                        </td>
                        <td className="px-4 text-slate-300 font-mono">
                          {sub.email}
                        </td>
                        <td className="px-4 capitalize text-slate-400 font-medium">
                          {sub.roleInterest}
                        </td>
                        <td className="px-4 text-center font-mono font-bold text-[#FF8A00]">
                          {sub.referralCount}
                        </td>
                        <td className="px-4 text-slate-400">
                          {new Date(sub.joinedDate).toLocaleDateString()}
                        </td>
                        <td className="px-4">
                          {sub.status === "verified_vendor" ? (
                            <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400 uppercase font-mono">
                              <Check className="h-3 w-3" /> Verified Vendor
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded bg-slate-500/10 border border-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-400 uppercase font-mono">
                              Active
                            </span>
                          )}
                        </td>
                        <td className="px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Toggle Verification for Vendors */}
                            {(sub.roleInterest === "vendor" || sub.roleInterest === "both") && (
                              <button
                                onClick={() => handleToggleVerify(sub.email)}
                                className={`rounded p-1.5 transition-colors border ${
                                  sub.status === "verified_vendor"
                                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                                }`}
                                title={sub.status === "verified_vendor" ? "Unverify Vendor" : "Verify Vendor Store"}
                              >
                                <Award className="h-3.5 w-3.5" />
                              </button>
                            )}
                            {/* Delete Participant */}
                            <button
                              onClick={() => handleDelete(sub.email)}
                              className="rounded p-1.5 border border-slate-800 hover:border-red-500/30 bg-slate-900/60 hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                              title="Delete Participant"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          /* TAB 2: LAUNCH MESSAGING PANEL */
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left compose panel */}
            <div className="lg:col-span-2 bg-slate-950/40 border border-slate-900 rounded-3xl p-6">
              <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 mb-2">
                <Megaphone className="h-5 w-5 text-brand-blue-light" />
                Compose Launch Broadcast
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Send an early-access launch notification to all waitlist participants. Simulated Resend API integration.
              </p>

              {broadcastSuccess && (
                <div className="mb-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-sm font-medium text-emerald-300 flex items-center gap-3">
                  <Check className="h-5 w-5 bg-emerald-500 text-white rounded-full p-0.5" />
                  <div>
                    <p className="font-bold">Broadcast Dispatch Completed!</p>
                    <p className="text-xs text-emerald-400/80 font-normal mt-0.5">
                      Sent to {subscribers.length} total subscribers successfully.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSendBroadcast} className="space-y-4 text-left">
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Broadcast Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={broadcastSubject}
                    onChange={(e) => setBroadcastSubject(e.target.value)}
                    placeholder="⚡ Ziora Early Access: Wave 1 is officially OPEN!"
                    disabled={isBroadcasting}
                    className="h-12 w-full rounded-xl border border-slate-800 bg-slate-900/40 px-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue-light transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
                    Message Body (HTML Supported)
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="Hello from Ziora HQ! We are thrilled to invite you to our exclusive Wave 1 early launch..."
                    disabled={isBroadcasting}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue-light transition-all"
                  />
                </div>

                {isBroadcasting ? (
                  <div className="py-4">
                    <div className="flex justify-between text-xs font-semibold text-slate-400 mb-2">
                      <span>Simulating API broadcasts via Node mailer...</span>
                      <span>{broadcastProgress}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-blue-light transition-all duration-300 rounded-full"
                        style={{ width: `${broadcastProgress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <Button
                    type="submit"
                    size="lg"
                    disabled={!broadcastSubject || !broadcastMessage}
                    className="w-full sm:w-auto h-12 bg-white text-brand-blue hover:bg-white/95 active:scale-[0.98] font-bold px-8 flex items-center justify-center gap-1.5 mt-4"
                  >
                    <Send className="h-4 w-4" />
                    Dispatch Broadcast Message
                  </Button>
                )}
              </form>
            </div>

            {/* Right log panel */}
            <div className="bg-slate-950/40 border border-slate-900 rounded-3xl p-6 flex flex-col">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-900 pb-3 font-mono">
                Broadcast History ({broadcasts.length})
              </h3>
              
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 max-h-[360px]">
                {broadcasts.length === 0 ? (
                  <div className="text-center py-10 text-slate-600 flex flex-col items-center gap-2">
                    <Megaphone className="h-8 w-8 opacity-40" />
                    <span className="text-xs">No notifications broadcasted yet.</span>
                  </div>
                ) : (
                  broadcasts.map((log) => (
                    <div key={log.id} className="border border-slate-900 bg-slate-900/20 p-4 rounded-2xl">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-white truncate flex-1">{log.subject}</h4>
                        <span className="shrink-0 rounded bg-brand-blue/10 border border-brand-blue-light/30 px-1.5 py-0.5 text-[9px] font-mono font-bold text-brand-blue-light uppercase">
                          Sent
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                        {log.message}
                      </p>
                      <div className="mt-3 pt-2 border-t border-slate-900/60 flex items-center justify-between text-[9px] font-mono text-slate-500">
                        <span>Recipients: <strong className="text-white">{log.recipientCount}</strong></span>
                        <span>{new Date(log.sentAt).toLocaleString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* MANUAL ADD MODAL OVERLAY */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950 p-6 shadow-[0_24px_70px_rgba(8,28,92,0.5)] max-w-md w-full">
            {/* Ambient glare */}
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-brand-blue-light/10 blur-3xl pointer-events-none" />

            <div className="flex justify-between items-center mb-6 relative">
              <h3 className="text-base font-bold text-white tracking-tight">
                Add Manual Subscriber
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setAddError(null);
                }}
                className="rounded-full p-1.5 text-slate-500 hover:text-white hover:bg-slate-900 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddSubscriberSubmit} className="space-y-4 text-left relative">
              <div>
                <label htmlFor="add-name" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  First Name
                </label>
                <input
                  id="add-name"
                  type="text"
                  required
                  value={addFirstName}
                  onChange={(e) => setAddFirstName(e.target.value)}
                  placeholder="Kemi"
                  className="h-10 w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue-light transition-all"
                />
              </div>

              <div>
                <label htmlFor="add-email" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Email Address
                </label>
                <input
                  id="add-email"
                  type="email"
                  required
                  value={addEmail}
                  onChange={(e) => setAddEmail(e.target.value)}
                  placeholder="kemi@gmail.com"
                  className="h-10 w-full rounded-xl border border-slate-800 bg-slate-900/40 px-3.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-brand-blue-light transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Role Interest
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["buyer", "vendor", "both"] as const).map((r) => {
                    const active = addRole === r;
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setAddRole(r)}
                        className={`h-9 rounded-lg border text-xs font-semibold capitalize transition-all ${
                          active
                            ? "bg-brand-blue border-brand-blue-light text-white"
                            : "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-white"
                        }`}
                      >
                        {r}
                      </button>
                    );
                  })}
                </div>
              </div>

              {addError && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-[11px] text-red-300 font-medium">
                  {addError}
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isAdding}
                  className="w-full h-11 bg-white text-brand-blue hover:bg-white/95 active:scale-[0.98] font-bold"
                >
                  {isAdding ? (
                    <>
                      <Spinner className="animate-spin text-brand-blue" />
                      Saving...
                    </>
                  ) : (
                    "Save Subscriber"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
