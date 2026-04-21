import { useState, useEffect, useRef } from "react";
import { cls } from "@/lib/utils";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import Transition from "@/components/ui/Transition";
import Button from "@/components/ui/Button";

type FeatureItem = {
  title: string;
  description: string;
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

interface FeaturesTimelineCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  items: FeatureItem[];
}

const FeaturesTimelineCards = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
}: FeaturesTimelineCardsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [activeIndex]);

  useEffect(() => {
    if (progress === 100) {
      setActiveIndex((i) => (i + 1) % items.length);
    }
  }, [progress, items.length]);

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) setActiveIndex(index);
  };

  return (
    <section aria-label="Features timeline section" className="py-20">
      <div className="flex flex-col w-content-width mx-auto gap-8">
        <div className="flex flex-col items-center gap-3 md:gap-2">
          <span className="px-3 py-1 text-sm card rounded">{tag}</span>

          <TextAnimation
            text={title}
            variant="slide-up"
            tag="h2"
            className="text-6xl font-medium text-center text-balance"
          />

          <TextAnimation
            text={description}
            variant="slide-up"
            tag="p"
            className="md:max-w-6/10 text-lg leading-tight text-center"
          />

          {(primaryButton || secondaryButton) && (
            <div className="flex flex-wrap justify-center gap-3 mt-1 md:mt-2">
              {primaryButton && <Button text={primaryButton.text} href={primaryButton.href} variant="primary" animate />}
              {secondaryButton && <Button text={secondaryButton.text} href={secondaryButton.href} variant="secondary" animate delay={0.1} />}
            </div>
          )}
        </div>

        <Transition className="flex flex-col gap-5">
          <div className="relative aspect-square md:aspect-10/4 overflow-hidden card rounded">
            <Transition key={activeIndex} transitionType="full" className="absolute inset-6 overflow-hidden rounded">
              <ImageOrVideo imageSrc={items[activeIndex].imageSrc} videoSrc={items[activeIndex].videoSrc} className="absolute inset-0" />
            </Transition>
          </div>

          <div className={cls(
            "grid grid-cols-1 gap-5",
            items.length === 2 && "md:grid-cols-2",
            items.length === 3 && "md:grid-cols-3",
            items.length >= 4 && "md:grid-cols-4"
          )}>
            {items.map((item, index) => (
              <div
                key={item.title}
                data-active={index === activeIndex}
                onClick={() => handleCardClick(index)}
                className="flex flex-col justify-between gap-5 p-5 card rounded transition-opacity duration-300 opacity-50 data-[active=true]:opacity-100 cursor-pointer data-[active=true]:cursor-default hover:opacity-75 data-[active=true]:hover:opacity-100"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center size-8 primary-button rounded">
                    <span className="text-sm font-medium text-primary-cta-text">{index + 1}</span>
                  </div>
                  <h3 className="mt-1 text-3xl font-medium leading-tight text-balance">{item.title}</h3>
                  <p className="text-base leading-tight text-balance">{item.description}</p>
                </div>
                <div className="relative w-full h-px overflow-hidden">
                  <div className="absolute inset-0 bg-foreground/20" />
                  <div className="absolute inset-y-0 left-0 bg-foreground transition-[width] duration-100" style={{ width: index === activeIndex ? `${progress}%` : index < activeIndex ? "100%" : "0%" }} />
                </div>
              </div>
            ))}
          </div>
        </Transition>
      </div>
    </section>
  );
};

export default FeaturesTimelineCards;
