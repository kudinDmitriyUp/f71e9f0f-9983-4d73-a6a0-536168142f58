import { useState, useEffect } from "react";
import { cls } from "@/lib/utils";

const BARS = [
  { height: 100, hoverHeight: 40 },
  { height: 84, hoverHeight: 100 },
  { height: 62, hoverHeight: 75 },
  { height: 90, hoverHeight: 50 },
  { height: 70, hoverHeight: 90 },
  { height: 50, hoverHeight: 60 },
  { height: 75, hoverHeight: 85 },
  { height: 80, hoverHeight: 70 },
];

const AnimatedBarChart = () => {
  const [active, setActive] = useState(2);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setActive((p) => (p + 1) % BARS.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="hidden md:block h-full w-full"
      style={{ maskImage: "linear-gradient(to bottom, black 40%, transparent)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-end gap-4 h-full w-full">
        {BARS.map((bar, i) => (
          <div
            key={i}
            className="relative w-full rounded bg-background-accent transition-all duration-500"
            style={{ height: `${isHovered ? bar.hoverHeight : bar.height}%` }}
          >
            <div className={cls("absolute inset-0 rounded primary-button transition-opacity duration-500", active === i ? "opacity-100" : "opacity-0")} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedBarChart;
