import { Children, useCallback, useEffect, useState, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cls } from "@/lib/utils";

interface LoopCarouselProps {
  children: ReactNode;
}

const LoopCarousel = ({ children }: LoopCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items = Children.toArray(children);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("select", onSelect).on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full md:w-content-width mx-auto">
      <div ref={emblaRef} className="overflow-hidden w-full mask-fade-x">
        <div className="flex w-full">
          {items.map((child, index) => (
            <div key={index} className="shrink-0 w-content-width md:w-[clamp(18rem,50vw,48rem)] mr-3 md:mr-6">
              <div
                className={cls(
                  "transition-all duration-500 ease-out",
                  selectedIndex === index ? "opacity-100 scale-100" : "opacity-70 scale-90"
                )}
              >
                {child}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between w-content-width mx-auto pointer-events-none">
        <button
          onClick={scrollPrev}
          type="button"
          aria-label="Previous slide"
          className="flex items-center justify-center h-8 aspect-square primary-button rounded cursor-pointer pointer-events-auto"
        >
          <ChevronLeft className="h-2/5 aspect-square text-primary-cta-text" />
        </button>
        <button
          onClick={scrollNext}
          type="button"
          aria-label="Next slide"
          className="flex items-center justify-center h-8 aspect-square primary-button rounded cursor-pointer pointer-events-auto"
        >
          <ChevronRight className="h-2/5 aspect-square text-primary-cta-text" />
        </button>
      </div>
    </div>
  );
};

export default LoopCarousel;
