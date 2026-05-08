"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { EventRecord } from "@/types/types";

type EventForm = Omit<EventRecord, "id" | "created_at" | "updated_at">;

const emptyForm: EventForm = { title: "", slug: "", event_date: "", image: "", excerpt: "", description: "", location: "" };

export default function AdminEventsDashboard({ initialEvents }: { initialEvents: EventRecord[] }) {
  const supabase = createClient();
  const [events, setEvents] = useState<EventRecord[]>(initialEvents);
  const [form, setForm] = useState<EventForm>(emptyForm);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const refreshEvents = async () => {
    const { data } = await supabase.from("event").select("*").order("event_date", { ascending: false });
    setEvents((data as EventRecord[]) ?? []);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    if (selectedId) {
      await supabase.from("event").update(form).eq("id", selectedId);
    } else {
      await supabase.from("event").insert(form);
    }
    setForm(emptyForm);
    setSelectedId(null);
    await refreshEvents();
    setSaving(false);
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_1fr]">
      <section>
        <h1 className="mb-6 text-3xl font-bold">Admin Events Dashboard</h1>
        <div className="space-y-4">
          {events.map((event) => (
            <article key={event.id} className="rounded-xl border border-white/10 bg-slate-900 p-4">
              <h3 className="text-lg font-semibold">{event.title}</h3>
              <p className="text-sm text-slate-300">{event.event_date} • {event.location}</p>
              <div className="mt-3 flex gap-3">
                <button onClick={() => { setSelectedId(event.id); setForm({ title: event.title, slug: event.slug, event_date: event.event_date, image: event.image, excerpt: event.excerpt, description: event.description, location: event.location }); }} className="rounded bg-blue-600 px-3 py-1 text-sm">Edit</button>
                <button onClick={async () => { setSaving(true); await supabase.from("event").delete().eq("id", event.id); await refreshEvents(); setSaving(false); }} className="rounded bg-red-600 px-3 py-1 text-sm">Delete</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-white/10 bg-slate-900 p-6">
        <h2 className="mb-4 text-2xl font-semibold">{selectedId ? "Update Event" : "Create Event"}</h2>
        <form onSubmit={onSubmit} className="space-y-3">
          {Object.entries(form).map(([key, value]) => (
            <input key={key} required type={key === "event_date" ? "date" : "text"} value={value} onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))} placeholder={key.replace("_", " ")} className="w-full rounded bg-slate-800 px-3 py-2 text-sm" />
          ))}
          <button disabled={saving} className="w-full rounded bg-[#0e6efd] py-2 font-semibold disabled:opacity-50">{saving ? "Saving..." : selectedId ? "Update Event" : "Create Event"}</button>
        </form>
      </section>
    </div>
  );
}
