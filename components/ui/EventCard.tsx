"use client";

import { EventItem } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type EventCardProps = {
  event: EventItem;
};

export default function EventCard({ event }: EventCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="h-full w-full rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
    >
      <div className="relative h-52 w-full overflow-hidden rounded-xl bg-slate-700">
        <Image src={event.image} alt={event.title} fill className="object-cover object-center" />
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
    </motion.article>
  );
}
