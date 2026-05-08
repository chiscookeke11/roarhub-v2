import { EventItem, EventRecord } from "@/types/types";

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "2-digit",
  year: "numeric",
});

export const mapEventRecordToItem = (event: EventRecord): EventItem => ({
  id: event.id,
  slug: event.slug,
  title: event.title,
  date: dateFormatter.format(new Date(event.event_date)),
  image: event.image,
  excerpt: event.excerpt,
  description: event.description,
  location: event.location,
});
