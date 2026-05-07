import EventCard from "@/components/ui/EventCard";
import { events } from "@/data/events";

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-[5%] py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-3 text-4xl font-bold">Events</h1>
        <p className="mb-10 text-slate-300">
          Explore sessions, workshops, and conversations happening at Roar Hub.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </main>
  );
}
