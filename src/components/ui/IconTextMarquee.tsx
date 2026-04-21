import type { LucideIcon } from "lucide-react";
import { cls } from "@/lib/utils";
import { resolveIcon } from "@/utils/resolve-icon";

const IconTextMarquee = ({ centerIcon, texts }: { centerIcon: string | LucideIcon; texts: string[] }) => {
  const CenterIcon = resolveIcon(centerIcon);
  const items = [...texts, ...texts];

  return (
    <div className="relative flex flex-col h-full w-full overflow-hidden" style={{ maskImage: "radial-gradient(ellipse at center, black 0%, black 30%, transparent 70%)" }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 w-full opacity-60">
        {Array.from({ length: 10 }).map((_, row) => (
          <div key={row} className={cls("flex gap-2", row % 2 === 0 ? "animate-marquee-horizontal" : "animate-marquee-horizontal-reverse")}>
            {items.map((text, i) => (
              <div key={i} className="flex items-center justify-center px-4 py-2 card rounded">
                <p className="text-sm leading-tight">{text}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-16 w-16 primary-button backdrop-blur-sm rounded">
        <CenterIcon className="h-6 w-6 text-primary-cta-text" strokeWidth={1.5} />
      </div>
    </div>
  );
};

export default IconTextMarquee;
