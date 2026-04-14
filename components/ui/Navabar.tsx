"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#whoWeAre", label: "About" },
  { href: "#pillars", label: "Drive" },
  { href: "#ecosystem", label: "Startups" },
  { href: "#events", label: "Events" },
  { href: "#team", label: "Team" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#1f3556] text-white px-[5%] lg:px-[10%] py-4 font-plus-jakarta">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6">
        <Link href="#hero" className="text-xl font-bold tracking-wide">
          <span className="text-blue-400">ROAR</span>HUB
        </Link>

        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-300 hover:text-blue-400 text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="#events"
            className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden flex flex-col cursor-pointer"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          <span className="w-6 h-0.5 bg-white mb-1" />
          <span className="w-6 h-0.5 bg-white mb-1" />
          <span className="w-6 h-0.5 bg-white" />
        </button>
      </div>

      {open && (
        <div className="md:hidden mt-4 border-t border-white/10 py-8 flex flex-col items-start gap-5 text-lg">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}

          <Link
            href="#events"
            className="bg-cyan-500 px-4 py-2 rounded-lg font-medium"
            onClick={() => setOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
