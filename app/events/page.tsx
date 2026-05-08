import EventCard from "@/components/ui/EventCard";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { EventRecord } from "@/types/types";
import { mapEventRecordToItem } from "@/utils/events";

export default async function EventsPage() {
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("events")
    .select("id, slug, title, event_date, image, excerpt, description, location")
    .order("event_date", { ascending: false });

  const eventItems = ((data as EventRecord[] | null) ?? []).map(mapEventRecordToItem);

  return (
    <main className="min-h-screen bg-slate-950 px-[5%] py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-3 text-4xl font-bold">Events</h1>
        <p className="mb-10 text-slate-300">Explore sessions, workshops, and conversations happening at Roar Hub.</p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {eventItems.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </main>
  );
}
