import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";

type HeroSplitProps = {
  tag: string;
  title: string;
  description: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const HeroSplit = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  imageSrc,
  videoSrc,
}: HeroSplitProps) => {
  return (
    <section aria-label="Hero section" className="flex items-center h-fit md:h-svh pt-25 pb-20 md:py-0">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 w-content-width mx-auto">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="px-3 py-1 mb-2 text-sm card rounded">{tag}</span>

            <TextAnimation
              text={title}
              variant="fade"
              tag="h1"
              className="text-7xl 2xl:text-8xl font-medium text-center md:text-left text-balance"
            />

            <TextAnimation
              text={description}
              variant="fade"
              tag="p"
              className="max-w-8/10 text-lg md:text-xl leading-tight text-center md:text-left"
            />

            <div className="flex flex-wrap max-md:justify-center gap-3 mt-2">
              <Button text={primaryButton.text} href={primaryButton.href} variant="primary" animate />
              <Button text={secondaryButton.text} href={secondaryButton.href} variant="secondary" animate delay={0.1} />
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="w-full md:w-1/2 h-100 md:h-[65vh] md:max-h-[75svh] p-3 card rounded overflow-hidden"
        >
          <ImageOrVideo imageSrc={imageSrc} videoSrc={videoSrc} />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSplit;
