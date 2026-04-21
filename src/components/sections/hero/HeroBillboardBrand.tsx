import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import AutoFillText from "@/components/ui/AutoFillText";

type HeroBillboardBrandProps = {
  brand: string;
  description: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const HeroBillboardBrand = ({
  brand,
  description,
  primaryButton,
  secondaryButton,
  imageSrc,
  videoSrc,
}: HeroBillboardBrandProps) => {
  return (
    <section aria-label="Hero section" className="pt-25 pb-20 md:py-30">
      <div className="flex flex-col gap-10 md:gap-13 w-content-width mx-auto">
        <div className="flex flex-col items-end gap-5">
          <AutoFillText className="w-full font-semibold" paddingY="">{brand}</AutoFillText>

          <TextAnimation
            text={description}
            variant="slide-up"
            tag="p"
            className="w-full md:w-1/2 text-lg md:text-2xl leading-tight text-balance text-right"
          />

          <div className="flex flex-wrap justify-end gap-3 mt-1 md:mt-2">
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

export default HeroBillboardBrand;
