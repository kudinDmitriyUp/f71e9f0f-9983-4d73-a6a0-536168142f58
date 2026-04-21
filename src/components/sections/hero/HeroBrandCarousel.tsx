import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import AutoFillText from "@/components/ui/AutoFillText";
import { cls } from "@/lib/utils";

type HeroBrandCarouselProps = {
  brand: string;
  description: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
  items: ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never })[];
};

const INTERVAL = 4000;

const HeroBrandCarousel = ({
  brand,
  description,
  primaryButton,
  secondaryButton,
  items,
}: HeroBrandCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, INTERVAL);
    return () => clearInterval(interval);
  }, [currentIndex, items.length]);

  return (
    <section
      aria-label="Hero section"
      className="relative w-full h-svh overflow-hidden flex flex-col justify-end"
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={cls(
            "absolute inset-0 transition-opacity duration-500",
            currentIndex === index ? "opacity-100 z-1" : "opacity-0 pointer-events-none"
          )}
          aria-hidden={currentIndex !== index}
        >
          <ImageOrVideo
            imageSrc={item.imageSrc}
            videoSrc={item.videoSrc}
            className="absolute inset-0 w-full h-full object-cover rounded-none"
          />
        </div>
      ))}

      <div
        className="absolute z-10 w-full h-[50svh] md:h-[75svh] left-0 bottom-0 backdrop-blur-xl mask-[linear-gradient(to_bottom,transparent,black_60%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-content-width mx-auto pb-5">
        <div className="flex flex-col">
          <div className="w-full flex flex-col md:flex-row md:justify-between items-start md:items-end gap-3 md:gap-5">
            <TextAnimation
              text={description}
              variant="slide-up"
              tag="p"
              className="w-full md:w-1/2 text-lg md:text-2xl text-balance font-medium leading-tight"
            />

            <div className="w-full md:w-1/2 flex justify-start md:justify-end">
              <div className="flex flex-wrap gap-3">
                <Button text={primaryButton.text} href={primaryButton.href} variant="primary" animateImmediately />
                <Button text={secondaryButton.text} href={secondaryButton.href} variant="secondary" animateImmediately delay={0.1} />
              </div>
            </div>
          </div>

          <AutoFillText className="font-semibold">{brand}</AutoFillText>

          <div className="flex gap-3 pb-5">
            {items.map((_, index) => (
              <button
                key={index}
                className="relative h-1 w-full rounded overflow-hidden bg-foreground/20 cursor-pointer"
                onClick={() => setCurrentIndex(index)}
                aria-label="Slide"
                aria-current={currentIndex === index}
              >
                <div
                  className={cls(
                    "absolute inset-0 bg-foreground rounded origin-left",
                    currentIndex === index ? "animate-progress" : (index < currentIndex ? "scale-x-100" : "scale-x-0")
                  )}
                  style={{ animationDuration: `${INTERVAL}ms` }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBrandCarousel;
