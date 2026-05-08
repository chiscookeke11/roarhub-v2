"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { UpClient } from "@/utils/supabase/client";
import AdminAuthModal from "@/components/admin/AdminAuthModal";

const ALLOWED_ADMINS = [
  "chiscookeke11@gmail.com",
  "uzodinma.ofoegbuna@unn.edu.ng",
  "team@lionsciencepark.com",
  "lionscienceparkunn1@gmail.com",
  "denis.ekeh@unn.edu.ng",
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => UpClient(), []);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Auth check failed:", error.message);
      }
      setUser(data.user ?? null);
      setLoading(false);
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Sign-out error:", error.message);
      return;
    }

    setUser(null);
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center text-[#0e6efd]">Checking authentication...</div>;
  if (!user) return <AdminAuthModal />;
  if (!ALLOWED_ADMINS.includes(user.email ?? "")) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-4 text-center">
        <h2 className="text-xl font-semibold text-red-600">Unauthorized Access</h2>
        <p className="max-w-md text-sm text-slate-600">This account does not have permission to access the admin dashboard.</p>
        <button onClick={handleSignOut} className="rounded bg-[#0e6efd] px-5 py-2 text-sm text-white">Sign Out</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-10 border-b border-[#0e6efd]/20 bg-[#f7fcfe]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <h1 className="text-sm font-semibold text-[#0e6efd]">Welcome, <span className="font-normal">{user.email}</span></h1>
          <button onClick={handleSignOut} className="rounded bg-[#0e6efd] px-3 py-2 text-xs text-white">Sign Out</button>
        </div>
        <nav className="overflow-x-auto bg-slate-100">
          <div className="mx-auto flex w-fit min-w-full gap-3 px-5 py-3">
            <Link href="/admin/events" className="rounded bg-[#0e6efd] px-4 py-2 text-sm text-white">Events Control Panel</Link>
            <Link href="/admin/tenants-panel" className="rounded bg-[#0e6efd] px-4 py-2 text-sm text-white">Tenants Control Panel</Link>
            <Link href="/admin/startups-panel" className="rounded bg-[#0e6efd] px-4 py-2 text-sm text-white">Startups Control Panel</Link>
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
}
