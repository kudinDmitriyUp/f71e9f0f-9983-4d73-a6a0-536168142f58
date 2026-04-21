import { Children, type ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cls } from "@/lib/utils";
import { useCarouselControls } from "@/hooks/useCarouselControls";

interface GridOrCarouselProps {
  children: ReactNode;
  carouselThreshold?: 2 | 3 | 4;
}

const GridOrCarousel = ({ children, carouselThreshold = 4 }: GridOrCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ dragFree: true });
  const { prevDisabled, nextDisabled, scrollPrev, scrollNext, scrollProgress } = useCarouselControls(emblaApi);

  const items = Children.toArray(children);
  const count = items.length;

  if (count <= carouselThreshold) {
    return (
      <div className={cls(
        "grid grid-cols-1 gap-5 mx-auto w-content-width",
        count === 2 && "md:grid-cols-2",
        count === 3 && "md:grid-cols-3",
        count === 4 && "md:grid-cols-4"
      )}>
        {children}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 w-full">
      <div ref={emblaRef} className="overflow-hidden w-full cursor-grab">
        <div className="flex gap-4">
          <div className="shrink-0 w-carousel-padding" />
          {items.map((child, i) => (
            <div key={i} className={cls("shrink-0", carouselThreshold === 2 ? "w-carousel-item-2" : carouselThreshold === 3 ? "w-carousel-item-3" : "w-carousel-item-4")}>{child}</div>
          ))}
          <div className="shrink-0 w-carousel-padding" />
        </div>
      </div>
      <div className="flex w-full">
        <div className="shrink-0 w-carousel-padding-controls" />
        <div className="flex justify-between items-center w-full">
          <div className="relative h-2 w-1/2 card rounded overflow-hidden">
            <div className="absolute top-0 bottom-0 -left-full w-full primary-button rounded" style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }} />
          </div>
          <div className="flex items-center gap-3">
            <button onClick={scrollPrev} disabled={prevDisabled} type="button" aria-label="Previous" className="flex items-center justify-center h-8 aspect-square secondary-button rounded cursor-pointer disabled:opacity-50">
              <ChevronLeft className="h-2/5 aspect-square text-secondary-cta-text" />
            </button>
            <button onClick={scrollNext} disabled={nextDisabled} type="button" aria-label="Next" className="flex items-center justify-center h-8 aspect-square secondary-button rounded cursor-pointer disabled:opacity-50">
              <ChevronRight className="h-2/5 aspect-square text-secondary-cta-text" />
            </button>
          </div>
        </div>
        <div className="shrink-0 w-carousel-padding-controls" />
      </div>
    </div>
  );
};

export default GridOrCarousel;
