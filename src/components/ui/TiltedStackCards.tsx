import type { LucideIcon } from "lucide-react";
import { cls } from "@/lib/utils";
import { resolveIcon } from "@/utils/resolve-icon";

type Item = { icon: string | LucideIcon; title: string; subtitle: string; detail: string };

const POS = ["-translate-y-14 hover:-translate-y-20", "translate-x-16 hover:-translate-y-4", "translate-x-32 translate-y-16 hover:translate-y-10"];

const TiltedStackCards = ({ items }: { items: [Item, Item, Item] }) => (
  <div
    className="h-full grid place-items-center [grid-template-areas:'stack']"
    style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent), linear-gradient(to right, black, black 80%, transparent)", maskComposite: "intersect" }}
  >
    {items.map((item, i) => (
      <div key={i} className={cls("flex flex-col justify-between gap-2 p-6 w-80 h-36 card rounded transition-all duration-500 -skew-y-[8deg] [grid-area:stack] 2xl:w-90", POS[i])}>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-5 w-5 rounded primary-button">
            {(() => { const Icon = resolveIcon(item.icon); return <Icon className="h-3 w-3 text-primary-cta-text" strokeWidth={1.5} />; })()}
          </div>
          <p className="text-base">{item.title}</p>
        </div>
        <p className="text-lg whitespace-nowrap">{item.subtitle}</p>
        <p className="text-base">{item.detail}</p>
      </div>
    ))}
  </div>
);

export default TiltedStackCards;
