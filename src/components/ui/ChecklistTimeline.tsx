import { Check, Loader } from "lucide-react";
import { cls } from "@/lib/utils";

type Item = { label: string; detail: string };

const DELAYS = [
  ["delay-150", "delay-200", "delay-[250ms]"],
  ["delay-[350ms]", "delay-[400ms]", "delay-[450ms]"],
  ["delay-[550ms]", "delay-[600ms]", "delay-[650ms]"],
];

const ChecklistTimeline = ({ heading, subheading, items, completedLabel }: { heading: string; subheading: string; items: [Item, Item, Item]; completedLabel: string }) => (
  <div className="group relative flex items-center justify-center h-full w-full overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center">
      {[1, 0.8, 0.6].map((s) => <div key={s} className="absolute h-full aspect-square rounded-full border border-background-accent/30" style={{ transform: `scale(${s})` }} />)}
    </div>
    <div className="relative flex flex-col gap-3 p-4 max-w-full w-8/10 mask-fade-y">
      <div className="flex items-center gap-2 p-3 card shadow rounded">
        <Loader className="h-4 w-4 text-primary transition-transform duration-1000 group-hover:rotate-360" strokeWidth={1.5} />
        <p className="text-xs truncate">{heading}</p>
        <p className="text-xs text-foreground/75 ml-auto whitespace-nowrap">{subheading}</p>
      </div>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 px-3 py-2 card shadow rounded">
          <div className="relative flex items-center justify-center h-6 w-6 card shadow rounded">
            <div className="absolute h-2 w-2 primary-button rounded transition-opacity duration-300 group-hover:opacity-0" />
            <div className={cls("absolute inset-0 flex items-center justify-center primary-button rounded opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100", DELAYS[i][0])}>
              <Check className="h-3 w-3 text-primary-cta-text" strokeWidth={2} />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-between gap-4 min-w-0">
            <p className={cls("text-xs truncate opacity-0 transition-opacity duration-300 group-hover:opacity-100", DELAYS[i][1])}>{item.label}</p>
            <p className={cls("text-xs text-foreground/75 whitespace-nowrap opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0", DELAYS[i][2])}>{item.detail}</p>
          </div>
        </div>
      ))}
      <div className="relative flex items-center justify-center p-3 primary-button rounded">
        <div className="absolute flex gap-2 transition-opacity duration-500 delay-900 group-hover:opacity-0">
          {[0, 1, 2].map((j) => <div key={j} className="h-2 w-2 rounded bg-primary-cta-text" />)}
        </div>
        <p className="text-xs text-primary-cta-text truncate opacity-0 transition-opacity duration-500 delay-900 group-hover:opacity-100">{completedLabel}</p>
      </div>
    </div>
  </div>
);

export default ChecklistTimeline;
