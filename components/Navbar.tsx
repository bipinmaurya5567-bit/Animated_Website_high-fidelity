"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

export function Navbar() {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 60], [0.3, 0.9]);
  const borderOpacity = useTransform(scrollY, [0, 60], [0.2, 0.6]);
  const backgroundColor = useMotionTemplate`rgba(17, 17, 17, ${bgOpacity})`;
  const borderColor = useMotionTemplate`rgba(255, 255, 255, ${borderOpacity})`;

  return (
    <motion.header
      className="fixed inset-x-4 top-4 z-50 rounded-2xl border border-white/20 px-4 py-3 backdrop-blur-xl md:inset-x-8 md:px-6"
      style={{
        backgroundColor,
        borderColor,
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <svg
            width="28"
            height="28"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_16px_rgba(249,115,22,0.5)]"
          >
            <path d="M36 4L12 34H30L24 60L52 26H34L36 4Z" fill="url(#nanoBananaGradient)" />
            <defs>
              <linearGradient id="nanoBananaGradient" x1="12" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FB923C" />
                <stop offset="1" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
          <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-fuchsia-500 bg-clip-text text-xl font-bold text-transparent">
            Nano Banana
          </span>
        </Link>

        <button className="rounded-full border border-orange-300/40 bg-orange-500/20 px-5 py-2 text-sm font-semibold text-white transition hover:scale-[1.03] hover:border-orange-200 hover:bg-orange-500/35 hover:shadow-[0_0_30px_rgba(249,115,22,0.45)]">
          Order Now
        </button>
      </div>
    </motion.header>
  );
}
