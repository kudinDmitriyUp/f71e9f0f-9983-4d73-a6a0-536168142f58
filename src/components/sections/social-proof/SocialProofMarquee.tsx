import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";

const SocialProofMarquee = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  names,
}: {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  names: string[];
}) => {
  return (
    <section aria-label="Social proof section" className="py-20">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3 md:gap-2 w-content-width mx-auto">
          <span className="px-3 py-1 text-sm rounded card">{tag}</span>

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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-content-width mx-auto overflow-hidden mask-fade-x"
        >
          <div className="flex w-max animate-marquee-horizontal" style={{ animationDuration: "45s" }}>
            {[...names, ...names, ...names, ...names].map((name, index) => (
              <div key={index} className="shrink-0 mx-3 px-5 py-3 rounded card">
                <span className="text-2xl font-semibold whitespace-nowrap opacity-75">{name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofMarquee;
