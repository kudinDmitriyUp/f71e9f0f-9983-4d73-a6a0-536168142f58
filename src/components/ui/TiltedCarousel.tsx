import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import ImageOrVideo from "@/components/ui/ImageOrVideo";

type TiltedCarouselProps = {
  items: ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never })[];
  autoPlayInterval?: number;
};

const TiltedCarousel = ({ items, autoPlayInterval = 4000 }: TiltedCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const itemCount = items.length;

  useEffect(() => {
    if (isFirstRender) {
      const timeout = setTimeout(() => setIsFirstRender(false), 800);
      return () => clearTimeout(timeout);
    }
  }, [isFirstRender]);

  useEffect(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % itemCount);
    }, autoPlayInterval);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlayInterval, itemCount]);

  return (
    <div className="relative flex items-center justify-center w-full overflow-hidden">
      <div className="w-[70%] md:w-[40%] aspect-square md:aspect-video opacity-0" />
      {[-2, -1, 0, 1, 2].map((position) => {
        const itemIndex = (activeIndex + position + itemCount) % itemCount;
        const item = items[itemIndex];
        const isCenter = position === 0;
        const distance = Math.abs(position);

        const scale = distance === 0 ? 1 : distance === 1 ? 0.88 : 0.8;
        const opacity = distance <= 1 ? 1 : 0;
        const xPercent = position * 100;
        const yPercent = distance === 0 ? 0 : distance === 1 ? 5 : 10;
        const rotate = position * 2;

        const initialState = distance <= 1 && isFirstRender
          ? isCenter
            ? { opacity: 0, y: "25px", scale: 1, x: "0%", rotate: 0 }
            : { opacity: 0, scale: 0.88, x: `calc(${xPercent}% + ${position > 0 ? 20 : -20}px)`, y: "5%", rotate }
          : { scale, opacity, x: `${xPercent}%`, y: `${yPercent}%`, rotate };

        return (
          <motion.div
            key={itemIndex}
            className="absolute w-[70%] md:w-[40%] aspect-square md:aspect-video p-1 card rounded-lg overflow-hidden"
            style={{ zIndex: isCenter ? 10 : 5 - distance }}
            initial={initialState}
            animate={{ scale, opacity, x: `${xPercent}%`, y: `${yPercent}%`, rotate }}
            transition={{
              duration: 0.8,
              ease: [0.65, 0, 0.35, 1],
              delay: distance <= 1 && isFirstRender ? (isCenter ? 0.45 : 0.6) : 0,
            }}
          >
            <ImageOrVideo
              imageSrc={item.imageSrc}
              videoSrc={item.videoSrc}
              className="w-full h-full rounded-lg object-cover"
            />
            <motion.div
              className="absolute inset-0 bg-background/50 backdrop-blur-[1px] pointer-events-none"
              initial={{ opacity: isCenter ? 0 : 1 }}
              animate={{ opacity: isCenter ? 0 : 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default TiltedCarousel;
