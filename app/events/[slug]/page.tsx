import Image from "next/image";
import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { EventRecord } from "@/types/types";
import { mapEventRecordToItem } from "@/utils/events";

type EventDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const supabase = createClient(await cookies());
  const { data } = await supabase
    .from("events")
    .select("id, slug, title, event_date, image, excerpt, description, location")
    .eq("slug", slug)
    .single();

  if (!data) notFound();
  const event = mapEventRecordToItem(data as EventRecord);

  return (
    <main className="min-h-screen bg-white px-[5%] py-14 text-slate-900">
      <article className="mx-auto max-w-4xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#0e6efd]">{event.date}</p>
        <h1 className="mb-4 text-4xl font-bold">{event.title}</h1>
        <p className="mb-8 text-lg text-slate-600">{event.location}</p>

        <div className="relative mb-8 h-[360px] w-full overflow-hidden rounded-2xl">
          <Image src={event.image} alt={event.title} fill className="object-cover" priority />
        </div>

        <p className="text-lg leading-relaxed text-slate-700">{event.description}</p>
      </article>
    </main>
  );
}
