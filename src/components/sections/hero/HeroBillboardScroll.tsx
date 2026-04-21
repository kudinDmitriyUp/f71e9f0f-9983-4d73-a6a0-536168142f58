import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";

type HeroBillboardScrollProps = {
  tag: string;
  title: string;
  description: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const HeroBillboardScroll = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  imageSrc,
  videoSrc,
}: HeroBillboardScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <section aria-label="Hero section">
      <div
        ref={containerRef}
        className="pt-25 pb-20 md:py-30 perspective-distant"
      >
        <div className="w-content-width mx-auto">
          <div className="flex flex-col items-center gap-3 text-center">
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
        </div>

        <div className="w-content-width mx-auto mt-8 p-3 card rounded overflow-hidden rotate-x-20 md:hidden">
          <ImageOrVideo imageSrc={imageSrc} videoSrc={videoSrc} className="aspect-4/5" />
        </div>

        <motion.div
          style={{ rotateX: rotate, scale }}
          className="w-content-width mx-auto mt-5 2xl:mt-2 p-5 card rounded overflow-hidden hidden md:block"
        >
          <ImageOrVideo imageSrc={imageSrc} videoSrc={videoSrc} className="aspect-video" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBillboardScroll;
