import { getEventBySlug, events } from "@/data/events";
import Image from "next/image";
import { notFound } from "next/navigation";

type EventDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white px-[5%] py-14 text-slate-900">
      <article className="mx-auto max-w-4xl">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#0e6efd]">
          {event.date}
        </p>
        <h1 className="mb-4 text-4xl font-bold">{event.title}</h1>
        <p className="mb-8 text-lg text-slate-600">{event.location}</p>

        <div className="relative mb-8 h-[360px] w-full overflow-hidden rounded-2xl">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <p className="text-lg leading-relaxed text-slate-700">{event.description}</p>
      </article>
    </main>
  );
}
