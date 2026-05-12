"use client";

import { supabase } from "@/utils/supabase/client";
import { FormEvent, useState } from "react";


export default function AdminAuthModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded-xl border border-white/10 bg-slate-900 p-6">
        <h1 className="text-2xl font-semibold">Admin Sign In</h1>
        <p className="text-sm text-slate-300">Sign in with your admin account to continue.</p>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full rounded bg-slate-800 px-3 py-2 text-sm"
        />
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded bg-slate-800 px-3 py-2 text-sm"
        />
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-[#0e6efd] py-2 font-semibold disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
