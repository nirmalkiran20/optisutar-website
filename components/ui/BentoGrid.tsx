"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./GradientBg";

const useCounter = (target: number, duration: number, started: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);
  return count;
};

const StatsCard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const clients = useCounter(150, 1800, started);
  const retention = useCounter(98, 2000, started);
  const campaigns = useCounter(20, 1500, started);
  const stats = [
    { value: clients, suffix: "+", label: "Clients Served", color: "#CBACF9" },
    { value: retention, suffix: "%", label: "Client Retention", color: "#38bdf8" },
    { value: campaigns, suffix: "+", label: "Active Campaigns", color: "#4ade80" },
  ];
  return (
    <div ref={ref} className="flex flex-col gap-4 mt-4 w-full">
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-4">
          <div className="text-2xl font-black min-w-[70px] tabular-nums" style={{ color: stat.color }}>
            {stat.value}{stat.suffix}
          </div>
          <div className="flex-1">
            <div className="text-xs text-white/40 mb-1">{stat.label}</div>
            <div className="h-1 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full transition-all duration-1000"
                style={{ width: started ? "100%" : "0%", backgroundColor: stat.color, transitionDelay: "300ms" }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const WhatsAppButton = () => {
  const phone = "919876543210";
  const message = encodeURIComponent("Hi! I'd like to get a free SEO audit for my website.");
  const waLink = `https://wa.me/${phone}?text=${message}`;
  return (
    <div className="mt-5 relative">
      <a href={waLink} target="_blank" rel="noopener noreferrer"
        className="relative inline-flex h-12 w-full overflow-hidden rounded-lg p-[1px] focus:outline-none">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#25D366_0%,#128C7E_50%,#25D366_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-6 text-sm font-medium text-white backdrop-blur-3xl gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};

// Per-card image config
const cardImages: Record<number, { src: string; position: string }> = {
  1: { src: "/card4.jpg", position: "object-center" },
  2: { src: "/card3.jpg", position: "object-center" },
  3: { src: "/card2.jpg", position: "object-center" },
  4: { src: "/card5.jpg", position: "object-center" },
  5: { src: "/card1.jpg", position: "object-center" },
};

export const BentoGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => (
  <div className={cn("grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto", className)}>
    {children}
  </div>
);

export const BentoGridItem = ({
  className, id, title, description, titleClassName,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const leftLists = ["SEMrush", "Ahrefs", "GA4"];
  const rightLists = ["GSC", "Ads", "Hotjar"];
  const cardImg = cardImages[id];

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl hover:border-white/[0.25] transition-all duration-300 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        className
      )}
      style={{ background: "linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)" }}
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>

        {/* Background image — shown for cards 1-5 */}
        {cardImg && (
          <>
            <img
              src={cardImg.src}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover ${cardImg.position} opacity-40 group-hover/bento:opacity-60 group-hover/bento:scale-105 transition-all duration-700`}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#04071d] via-[#04071d]/40 to-transparent group-hover/bento:via-[#04071d]/10 transition-all duration-500" />
          </>
        )}

        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center font-bold px-4 pointer-events-none" />
          </BackgroundGradientAnimation>
        )}

        <div className={cn(titleClassName, "relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10 z-10")}>
          {/* Description */}
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#C1C2D3] z-10 group-hover/bento:text-white transition-colors duration-300">
            {description}
          </div>

          {/* Title with sliding underline */}
          <div className="font-sans text-lg lg:text-3xl max-w-96 font-bold z-10 mt-2">
            <span className="relative inline-block group-hover/bento:text-white transition-colors duration-300">
              {title}
              <span
                className="absolute -bottom-1 left-0 w-0 h-[2px] group-hover/bento:w-full transition-all duration-500 ease-out rounded-full"
                style={{ background: "linear-gradient(90deg, #CBACF9, #6366f1)" }}
              />
            </span>
          </div>

          {/* Card 2 — Countries */}
          {id === 2 && (
            <div className="flex flex-col items-center justify-center h-full gap-4 mt-6">
              <div className="flex flex-wrap gap-2 justify-center">
                {["India", "UAE", "USA", "UK", "Australia", "Singapore"].map((country) => (
                  <span key={country} className="px-3 py-1 rounded-full text-xs font-semibold bg-black/50 backdrop-blur-sm text-white border border-white/20 hover:border-purple transition-all duration-200">
                    {country}
                  </span>
                ))}
              </div>
              <p className="text-white/60 text-xs text-center mt-2">Serving clients across 6+ countries</p>
            </div>
          )}

          {/* Card 3 — Tool stack */}
          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                {leftLists.map((item, i) => (
                  <span key={i} className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base rounded-lg text-center bg-black/60 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-200 text-white">
                    {item}
                  </span>
                ))}
                <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg bg-black/30" />
              </div>
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-8">
                <span className="lg:py-4 lg:px-3 py-4 px-3 rounded-lg bg-black/30" />
                {rightLists.map((item, i) => (
                  <span key={i} className="lg:py-4 lg:px-3 py-2 px-3 text-xs lg:text-base rounded-lg text-center bg-black/60 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-200 text-white">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Card 4 — Stats */}
          {id === 4 && <StatsCard />}

          {/* Card 6 — WhatsApp */}
          {id === 6 && <WhatsAppButton />}
        </div>
      </div>
    </div>
  );
};