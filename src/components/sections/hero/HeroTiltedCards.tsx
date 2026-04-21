import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import { cls } from "@/lib/utils";

interface HeroTiltedCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
  items: ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never })[];
}

const HeroTiltedCards = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
}: HeroTiltedCardsProps) => {
  const marqueeItems = [...items, ...items];
  const galleryStyles = [
    "-rotate-6 z-10 -translate-y-5",
    "rotate-6 z-20 translate-y-5 -ml-15",
    "-rotate-6 z-30 -translate-y-5 -ml-15",
    "rotate-6 z-40 translate-y-5 -ml-15",
    "-rotate-6 z-50 -translate-y-5 -ml-15",
  ];

  return (
    <section aria-label="Hero section" className="flex items-center h-fit md:h-svh pt-25 pb-20 md:py-0">
      <div className="flex flex-col items-center gap-10 md:gap-15 w-full md:w-content-width mx-auto">
        <div className="flex flex-col items-center gap-2 w-content-width mx-auto text-center">
          <span className="px-3 py-1 mb-1 text-sm card rounded">{tag}</span>

          <TextAnimation
            text={title}
            variant="slide-up"
            tag="h1"
            className="text-6xl font-medium text-balance"
          />

          <TextAnimation
            text={description}
            variant="slide-up"
            tag="p"
            className="text-base md:text-lg leading-tight text-balance"
          />

          <div className="flex flex-wrap justify-center gap-3 mt-2">
            <Button text={primaryButton.text} href={primaryButton.href} variant="primary" animate />
            <Button text={secondaryButton.text} href={secondaryButton.href} variant="secondary" animate delay={0.1} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="block md:hidden w-full overflow-hidden mask-padding-x"
        >
          <div className="flex w-max animate-marquee-horizontal">
            {marqueeItems.map((item, index) => (
              <div key={index} className="shrink-0 w-[50vw] mr-5 aspect-4/5 p-2 card rounded overflow-hidden">
                <ImageOrVideo imageSrc={item.imageSrc} videoSrc={item.videoSrc} />
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="hidden md:flex justify-center items-center w-full"
        >
          <div className="flex items-center justify-center">
            {items.map((item, index) => (
              <div
                key={index}
                className={cls(
                  "relative w-[23%] aspect-4/5 p-2 card rounded overflow-hidden shadow-lg transition-transform duration-500 ease-out hover:scale-110",
                  galleryStyles[index]
                )}
              >
                <ImageOrVideo imageSrc={item.imageSrc} videoSrc={item.videoSrc} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroTiltedCards;
