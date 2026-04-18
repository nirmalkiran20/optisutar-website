"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";

const resultBadges: { [key: number]: { label: string; color: string }[] } = {
  1: [
    { label: "300% Traffic", color: "#34A853" },
    { label: "Page 1 Rankings", color: "#4285F4" },
    { label: "SEO", color: "#FF6B35" },
    { label: "Link Building", color: "#9333EA" },
    { label: "6 Months", color: "#FF9500" },
  ],
  2: [
    { label: "5x ROAS", color: "#34A853" },
    { label: "Google Ads", color: "#4285F4" },
    { label: "-40% CPC", color: "#FF6B35" },
    { label: "PPC", color: "#9333EA" },
    { label: "Local Business", color: "#FF9500" },
  ],
  3: [
    { label: "40 Keywords", color: "#34A853" },
    { label: "Page 1", color: "#4285F4" },
    { label: "60+ Articles", color: "#FF6B35" },
    { label: "Content SEO", color: "#9333EA" },
    { label: "B2B SaaS", color: "#FF9500" },
  ],
  4: [
    { label: "+200% Calls", color: "#34A853" },
    { label: "Local SEO", color: "#4285F4" },
    { label: "GMB", color: "#FF6B35" },
    { label: "Citations", color: "#9333EA" },
    { label: "Healthcare", color: "#FF9500" },
  ],
};

const RecentProjects = () => {
  return (
    <div className="py-20">
      <h1 className="heading">
        A selection of our{" "}
        <span className="text-purple">recent client results</span>
      </h1>
      <div className="flex flex-wrap items-center justify-center p-4 gap-16 mt-10">
        {projects.map((item) => (
          <div
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.id}
          >
            <PinContainer
              title="optisutar.com"
              href="https://optisutar.com"
            >
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl"
                  style={{ backgroundColor: "#13162D" }}
                >
                  <img src="/bg.png" alt="bgimg" />
                </div>
                <img
                  src={item.img}
                  alt="cover"
                  className="z-10 absolute bottom-0"
                />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-base line-clamp-1">
                {item.title}
              </h1>

              <p
                className="lg:text-xl lg:font-normal font-light text-sm line-clamp-2"
                style={{ color: "#BEC1DD", margin: "1vh 0" }}
              >
                {item.des}
              </p>

              <div className="flex items-center justify-between mt-7 mb-3">
                {/* Result badges instead of tech icons */}
                <div className="flex items-center gap-1 flex-wrap max-w-[60%]">
                  {resultBadges[item.id]?.slice(0, 3).map((badge, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full font-medium"
                      style={{
                        backgroundColor: `${badge.color}22`,
                        color: badge.color,
                        border: `1px solid ${badge.color}44`,
                      }}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>

                <div className="flex justify-center items-center">
                  <p className="flex lg:text-xl md:text-xs text-sm text-purple">
                    View Case Study
                  </p>
                  <FaLocationArrow className="ms-3" color="#CBACF9" />
                </div>
              </div>
            </PinContainer>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;