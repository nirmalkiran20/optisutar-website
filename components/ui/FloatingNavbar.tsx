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
          "flex max-w-fit md:min-w-[70vw] lg:min-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-10 py-3 rounded-lg items-center justify-between",
          className
        )}
        style={{
          backdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(17, 25, 40, 0.75)",
          borderRadius: "12px",
          border: "1px solid rgba(255, 255, 255, 0.125)",
          boxShadow: "0px 2px_3px_-1px_rgba(0,0,0,0.1)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mr-8">
          <Image
            src="/logo.png"
            alt="Optisutar - SEO & Digital Marketing Agency"
            width={32}
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