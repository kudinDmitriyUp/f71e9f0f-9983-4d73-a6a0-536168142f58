import ImageOrVideo from "@/components/ui/ImageOrVideo";
import { cls } from "@/lib/utils";

type Item = { imageSrc?: string; videoSrc?: string };

const MediaStack = ({ items }: { items: [Item, Item, Item] }) => (
  <div className="group/stack relative flex items-center justify-center h-full w-full rounded select-none card">
    <div className={cls(
      "absolute z-1 overflow-hidden p-1 w-3/5 aspect-4/3 rounded primary-button",
      "translate-x-[12%] -translate-y-[8%] rotate-8 transition-all duration-500",
      "group-hover/stack:translate-x-[22%] group-hover/stack:-translate-y-[14%] group-hover/stack:rotate-12"
    )}>
      <ImageOrVideo imageSrc={items[2].imageSrc} videoSrc={items[2].videoSrc} className="h-full rounded" />
    </div>
    <div className={cls(
      "absolute z-2 overflow-hidden p-1 w-3/5 aspect-4/3 rounded primary-button",
      "-translate-x-[12%] -translate-y-[8%] -rotate-8 transition-all duration-500",
      "group-hover/stack:-translate-x-[22%] group-hover/stack:-translate-y-[14%] group-hover/stack:-rotate-12"
    )}>
      <ImageOrVideo imageSrc={items[1].imageSrc} videoSrc={items[1].videoSrc} className="h-full rounded" />
    </div>
    <div className={cls(
      "absolute z-30 overflow-hidden p-1 w-3/5 aspect-4/3 rounded primary-button",
      "translate-y-[10%] transition-all duration-500",
      "group-hover/stack:translate-y-[20%]"
    )}>
      <ImageOrVideo imageSrc={items[0].imageSrc} videoSrc={items[0].videoSrc} className="h-full rounded" />
    </div>
  </div>
);

export default MediaStack;
