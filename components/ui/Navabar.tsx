"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-[#1f3556] text-white  md:px-12 py-4 flex items-center justify-between font-plus-jakarta px-[11%] lg:px-[10%] ">
      {/* Logo */}
      <div className="text-xl font-bold">
        <span className="text-blue-400">ROAR</span>HUB
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-8">
        <Link href="#" className="text-gray-300 hover:text-blue-400 text-sm ">Home</Link>
        <Link href="#" className="text-gray-300 hover:text-blue-400 text-sm">About</Link>
        <Link href="#" className="text-gray-300 hover:text-blue-400 text-sm">Drive</Link>
        <Link href="#" className="text-gray-300 hover:text-blue-400 text-sm">Startups</Link>
        <Link href="#" className="text-gray-300 hover:text-blue-400 text-sm">Events</Link>
        <Link href="#" className="text-gray-300 hover:text-blue-400 text-sm">Team</Link>

        <Link
          href="#"
          className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg font-medium"
        >
          Get Started
        </Link>
      </div>

      {/* Mobile Toggle */}
      <div
        className="lg:hidden flex flex-col cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span className="w-6 h-0.5 bg-white mb-1"></span>
        <span className="w-6 h-0.5 bg-white mb-1"></span>
        <span className="w-6 h-0.5 bg-white"></span>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full bg-[#1f3556] flex flex-col items-center gap-6 py-6 md:hidden text-xs ">
          <Link href="#hero" onClick={() => setOpen(false)}>Home</Link>
          <Link href="#whoWeAre" onClick={() => setOpen(false)}>About</Link>
          <Link href="#pillars" onClick={() => setOpen(false)}>Drive</Link>
          <Link href="#ecosystem" onClick={() => setOpen(false)}>Startups</Link>
          <Link href="#" onClick={() => setOpen(false)}>Events</Link>
          <Link href="team" onClick={() => setOpen(false)}>Team</Link>

          <Link
            href="#"
            className="bg-cyan-500 px-4 py-2 rounded-lg"
            onClick={() => setOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
