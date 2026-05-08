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

export const mapEventItemToRecordDate = (date: string): string => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toISOString().split("T")[0];
};



// This function formats list date
export const formatListDate = (value: string, showTime: boolean = false) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: showTime ? "2-digit" : undefined,
    minute: showTime ? "2-digit" : undefined,
  });
};