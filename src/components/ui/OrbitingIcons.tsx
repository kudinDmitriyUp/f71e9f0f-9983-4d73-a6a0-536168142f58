import type { LucideIcon } from "lucide-react";
import { resolveIcon } from "@/utils/resolve-icon";

const OrbitingIcons = ({ centerIcon, items }: { centerIcon: string | LucideIcon; items: (string | LucideIcon)[] }) => {
  const CenterIcon = resolveIcon(centerIcon);
  return (
  <div
    className="relative flex items-center justify-center h-full overflow-hidden"
    style={{ perspective: "2000px", maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent), linear-gradient(to right, transparent, black 10%, black 90%, transparent)", maskComposite: "intersect" }}
  >
    <div className="flex items-center justify-center w-full h-full" style={{ transform: "rotateY(20deg) rotateX(20deg) rotateZ(-20deg)" }}>
      <div className="absolute h-60 w-60 opacity-85 border border-background-accent shadow rounded-full" />
      <div className="absolute h-80 w-80 opacity-75 border border-background-accent shadow rounded-full" />
      <div className="absolute h-100 w-100 opacity-65 border border-background-accent shadow rounded-full" />
      <div className="absolute flex items-center justify-center h-40 w-40 border border-background-accent shadow rounded-full">
        <div className="flex items-center justify-center h-20 w-20 primary-button rounded-full">
          <CenterIcon className="h-10 w-10 text-primary-cta-text" strokeWidth={1.25} />
        </div>
        {items.map((iconInput, i) => {
          const Icon = resolveIcon(iconInput);
          return (
            <div
              key={i}
              className="absolute flex items-center justify-center h-10 w-10 rounded shadow card -ml-5 -mt-5"
              style={{ top: "50%", left: "50%", animation: "orbit 12s linear infinite", "--initial-position": `${(360 / items.length) * i}deg`, "--translate-position": "160px" } as React.CSSProperties}
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
};

export default OrbitingIcons;
