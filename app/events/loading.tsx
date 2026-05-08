export default function EventsLoading() {
  return (
    <main className="min-h-screen bg-slate-950 px-[5%] py-16 text-white">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-4 h-10 w-48 rounded bg-slate-700" />
        <div className="mb-10 h-5 w-96 rounded bg-slate-800" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-96 rounded-2xl bg-slate-800" />
          ))}
        </div>
      </div>
    </main>
  );
}
