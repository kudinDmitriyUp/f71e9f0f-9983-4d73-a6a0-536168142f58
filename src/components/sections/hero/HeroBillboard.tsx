import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";

type HeroBillboardProps = {
  tag: string;
  title: string;
  description: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const HeroBillboard = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  imageSrc,
  videoSrc,
}: HeroBillboardProps) => {
  return (
    <section aria-label="Hero section" className="pt-25 pb-20 md:py-30">
      <div className="flex flex-col gap-10 md:gap-13 w-content-width mx-auto">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="w-full p-3 md:p-5 card rounded overflow-hidden"
        >
          <ImageOrVideo imageSrc={imageSrc} videoSrc={videoSrc} className="aspect-4/5 md:aspect-video" />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBillboard;
