import AdminEventsDashboard from "@/components/admin/AdminEventsDashboard";
import { EventRecord } from "@/types/types";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function AdminEventsPage() {
  const supabase = createClient(await cookies());
  const { data } = await supabase.from("events").select("*").order("event_date", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-950 px-[5%] py-12 text-white">
      <AdminEventsDashboard initialEvents={(data as EventRecord[]) ?? []} />
    </main>
  );
}
