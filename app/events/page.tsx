"use client"

import { useEffect, useState } from "react";
import EventCard from "@/components/ui/EventCard";
import Spinner from "@/components/ui/Spinner";
import { EventItem, EventRecord } from "@/types/types";
import { mapEventRecordToItem } from "@/utils/events";
import { supabase } from "@/utils/supabase/client";

export default function EventsPage() {
  const [eventItems, setEventItems] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: false });

      if (error) {
        console.error("Error fetching all events:", error);
      } else if (data) {
        const mappedEvents = (data as EventRecord[]).map(mapEventRecordToItem);
        setEventItems(mappedEvents);
      }

      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 px-[5%] py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-3 text-4xl font-bold">Events</h1>
        <p className="mb-10 text-slate-300">Explore sessions, workshops, and conversations happening at Roar Hub.</p>

        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {eventItems.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
