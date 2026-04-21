import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";

type HeroCenteredLogosProps = {
  tag: string;
  title: string;
  description: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
  logos: string[];
};

const HeroCenteredLogos = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  logos,
}: HeroCenteredLogosProps) => {
  return (
    <section aria-label="Hero section" className="h-svh flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 pt-8 w-content-width mx-auto text-center">
          <span className="px-3 py-1 mb-1 text-sm card rounded">{tag}</span>

          <TextAnimation
            text={title}
            variant="slide-up"
            tag="h1"
            className="md:max-w-7/10 text-6xl font-medium text-balance"
          />

          <TextAnimation
            text={description}
            variant="slide-up"
            tag="p"
            className="md:max-w-6/10 text-base md:text-lg leading-tight text-balance"
          />

          <div className="flex flex-wrap justify-center gap-3 mt-2">
            <Button text={primaryButton.text} href={primaryButton.href} variant="primary" animate />
            <Button text={secondaryButton.text} href={secondaryButton.href} variant="secondary" animate delay={0.1} />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="w-content-width mx-auto pb-8 overflow-hidden mask-fade-x"
      >
        <div className="flex w-max animate-marquee-horizontal" style={{ animationDuration: "30s" }}>
          {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <div key={index} className="shrink-0 mx-3 px-4 py-2 rounded card">
              <span className="text-xl font-semibold whitespace-nowrap opacity-75">{logo}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroCenteredLogos;
