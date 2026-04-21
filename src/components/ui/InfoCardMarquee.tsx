import type { LucideIcon } from "lucide-react";
import { resolveIcon } from "@/utils/resolve-icon";

type Item = { icon: string | LucideIcon; label: string; value: string };

const InfoCardMarquee = ({ items }: { items: Item[] }) => {
  const duplicated = [...items, ...items, ...items, ...items];

  return (
    <div className="h-full overflow-hidden mask-fade-y">
      <div className="flex flex-col animate-marquee-vertical">
        {duplicated.map((item, i) => (
          <div key={i} className="flex items-center justify-between gap-4 p-3 mb-4 card rounded">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center h-10 w-10 secondary-button rounded">
                {(() => { const Icon = resolveIcon(item.icon); return <Icon className="h-4 w-4 text-secondary-cta-text" strokeWidth={1.5} />; })()}
              </div>
              <p className="text-base truncate">{item.label}</p>
            </div>
            <p className="text-base">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCardMarquee;
