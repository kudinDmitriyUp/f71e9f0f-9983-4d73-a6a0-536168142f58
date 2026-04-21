import { motion } from "motion/react";
import TextAnimation from "@/components/ui/TextAnimation";
import Button from "@/components/ui/Button";
import HoverPattern from "@/components/ui/HoverPattern";
import GridOrCarousel from "@/components/ui/GridOrCarousel";
import type { LucideIcon } from "lucide-react";
import { resolveIcon } from "@/utils/resolve-icon";

type FeatureItem = {
  icon: string | LucideIcon;
  title: string;
  description: string;
};

interface FeaturesIconCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  features: FeatureItem[];
}

const FeaturesIconCards = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  features,
}: FeaturesIconCardsProps) => {
  return (
    <section aria-label="Features icon cards section" className="py-20">
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <GridOrCarousel>
            {features.map((feature) => {
              const FeatureIcon = resolveIcon(feature.icon);
              return (
              <div key={feature.title} className="flex flex-col gap-5 p-5 card rounded">
                <HoverPattern className="flex items-center justify-center aspect-square rounded">
                  <div className="relative z-10 flex items-center justify-center size-12 primary-button rounded shadow">
                    <FeatureIcon className="size-4 text-primary-cta-text" strokeWidth={1.5} />
                  </div>
                </HoverPattern>
                <div className="flex flex-col gap-1">
                  <h3 className="text-2xl font-medium leading-tight">{feature.title}</h3>
                  <p className="text-sm leading-tight">{feature.description}</p>
                </div>
              </div>
              );
            })}
          </GridOrCarousel>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesIconCards;
