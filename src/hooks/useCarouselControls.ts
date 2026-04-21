import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

export const useCarouselControls = (emblaApi: EmblaCarouselType | undefined) => {
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setPrevDisabled(!api.canScrollPrev());
    setNextDisabled(!api.canScrollNext());
  }, []);

  const onScroll = useCallback((api: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, api.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    onScroll(emblaApi);

    emblaApi.on("reInit", onSelect).on("select", onSelect);
    emblaApi.on("reInit", onScroll).on("scroll", onScroll);

    return () => {
      emblaApi.off("reInit", onSelect).off("select", onSelect);
      emblaApi.off("reInit", onScroll).off("scroll", onScroll);
    };
  }, [emblaApi, onSelect, onScroll]);

  return { prevDisabled, nextDisabled, scrollPrev, scrollNext, scrollProgress };
};
