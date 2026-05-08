import Link from "next/link";
import EventCard from "./ui/EventCard";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { EventRecord } from "@/types/types";
import { mapEventRecordToItem } from "@/utils/events";
import { events as fallbackEvents } from "@/data/events";

export default async function Events() {
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("event")
    .select("id, slug, title, event_date, image, excerpt, description, location")
    .order("event_date", { ascending: false })
    .limit(3);

  const eventItems = (data as EventRecord[] | null)?.map(mapEventRecordToItem) ?? fallbackEvents;

  return (
    <section className="font-plus-jakarta w-full bg-[#2c3e50] px-[3%] py-24 text-white">
      <div className="mx-auto flex w-fit flex-col items-center gap-2 text-center">
        <h4 className="text-base font-semibold uppercase text-[#0e6efd] md:text-xl">Life at the Hub</h4>
        <h3 className="font-outfit max-w-129 text-2xl font-bold text-white md:text-[38px]">Event Gallery</h3>
      </div>

      <div className="my-16 grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        {eventItems.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          href="/events"
          className="rounded-full border border-white/40 px-6 py-2 font-semibold transition-colors hover:bg-white hover:text-[#2c3e50]"
        >
          See more
        </Link>
      </div>
    </section>
  );
}
