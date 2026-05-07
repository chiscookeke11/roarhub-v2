import { EventItem } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

type EventCardProps = {
  event: EventItem;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <article className="w-full h-full rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <div className="relative h-52 w-full overflow-hidden rounded-xl bg-slate-700">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="mt-4 flex flex-col gap-3">
        <p className="text-sm font-medium text-blue-200">{event.date}</p>
        <h3 className="text-xl font-semibold text-white">{event.title}</h3>
        <p className="text-sm leading-relaxed text-slate-200">{event.excerpt}</p>

        <Link
          href={`/events/${event.slug}`}
          className="mt-2 inline-flex w-fit rounded-full bg-[#0e6efd] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0b5ed7]"
        >
          View event
        </Link>
      </div>
    </article>
  );
}
