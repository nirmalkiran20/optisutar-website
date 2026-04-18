"use client";

import React from "react";
import { testimonials } from "@/data";
import { InfiniteMovingCards } from "./ui/InfiniteCards";

const tools = [
  { name: "SEMrush", color: "#FF6B35" },
  { name: "Ahrefs", color: "#FF9500" },
  { name: "Google Analytics 4", color: "#E8710A" },
  { name: "Google Search Console", color: "#4285F4" },
  { name: "Google Ads", color: "#34A853" },
  { name: "Hotjar", color: "#FF3C00" },
  { name: "Screaming Frog", color: "#7B2D8B" },
  { name: "Moz Pro", color: "#00A3E0" },
];

const Clients = () => {
  return (
    <section id="testimonials" className="py-20">
      <h1 className="heading">
        Kind words from
        <span className="text-purple"> satisfied clients</span>
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div className="h-[50vh] md:h-[30rem] rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>

        {/* Tools we use */}
        <div className="mt-10 w-full">
          <p className="text-center text-white/40 text-sm mb-6 uppercase tracking-widest">
            Tools we use
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="px-4 py-2 rounded-full border border-white/10 bg-[#10132E] text-sm font-medium text-white/80 hover:border-white/30 hover:text-white transition duration-200"
                style={{
                  boxShadow: `0 0 12px ${tool.color}22`,
                  borderColor: `${tool.color}33`,
                }}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: tool.color }}
                />
                {tool.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;