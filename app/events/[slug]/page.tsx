"use client"

import Image from "next/image";
import { EventItem } from "@/types/types";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { useParams } from "next/navigation";
import { formatListDate } from "@/utils/events";
import Spinner from "@/components/ui/Spinner";

export default function EventDetailPage() {

  const params = useParams();
  const slug = params.slug as string;
  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchEvent = async () => {

      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) {
        console.error("Error fetching event:", error);
      } else if (data) {
        setEvent(data);
      }

      setLoading(false);
    };

    if (slug) {
      fetchEvent();
    }

  }, [slug]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white ">
        <Spinner />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#1f3556]">
        <h1 className="text-white font-plus-jakarta">
          No event found
        </h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white px-[5%] py-14 text-slate-900 font-sans ">
      <article className="mx-auto max-w-4xl">

        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#0e6efd]">
          {formatListDate(event.date)}
        </p>

        <h1 className="mb-4 text-4xl font-bold">
          {event.title}
        </h1>

        <p className="mb-8 text-lg text-slate-600">
          {event.location}
        </p>

        <div className="relative mb-8 h-[260px] md:h-125 w-full overflow-hidden rounded-2xl">
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
            priority
          />
        </div>

        <div
          className="text-lg leading-relaxed text-slate-700"
          dangerouslySetInnerHTML={{ __html: event.description }}
        />
      </article>
    </main>
  );
}