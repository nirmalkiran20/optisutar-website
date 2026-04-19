"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
  initial={{ opacity: 1, y: -100 }}
  animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
  transition={{ duration: 0.2 }}
  className={cn(
    "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-3 rounded-xl items-center justify-between",
    "border border-white/15 bg-white/6 backdrop-blur-xl shadow-2xl",
    className
  )}
  style={{
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    boxShadow:
      "0 8px 32px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
  }}
>
  {/* 🔥 Optional glow layer */}
  <div className="absolute inset-0 -z-10 blur-2xl opacity-20 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500" />
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-8">
          <Image
            src="/logo.png"
            alt="Optisutar - SEO & Digital Marketing Agency"
            width={35}
            height={32}
            className="rounded-md"
          />
          <span className="text-white font-bold text-sm hidden sm:block">
            Optisutar
          </span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center space-x-6">
          {navItems.map((navItem, idx) => (
            <Link
              key={idx}
              href={navItem.link}
              className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 transition-colors duration-200"
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="text-sm cursor-pointer">{navItem.name}</span>
            </Link>
          ))}
        </div>

        {/* CTA — links to /contact */}
        <Link
          href="/contact"
          className="ml-8 text-sm font-medium px-4 py-2 rounded-lg text-white hidden sm:block hover:opacity-90 transition-opacity duration-200"
          style={{ background: "linear-gradient(90deg, #10b981, #059669)" }}
        >
          Free Audit
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};