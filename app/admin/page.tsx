"use client";

import { useEffect, useState } from "react";
import { AdminLogin } from "@/components/waitlist/admin-login";
import { AdminDashboard } from "@/components/waitlist/admin-dashboard";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = sessionStorage.getItem("ziora_admin_auth");
    setIsAuthenticated(auth === "true");
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#060814]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-blue-light border-t-transparent" />
      </div>
    );
  }

  const handleLogin = () => {
    sessionStorage.setItem("ziora_admin_auth", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("ziora_admin_auth");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
