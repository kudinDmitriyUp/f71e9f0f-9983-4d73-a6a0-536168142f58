import { motion } from "motion/react";
import TextAnimation from "@/components/ui/TextAnimation";
import GridOrCarousel from "@/components/ui/GridOrCarousel";
import Button from "@/components/ui/Button";

type FeatureItem = {
  title: string;
  description: string;
  label: string;
  value: string;
};

interface FeaturesStatisticsCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  items: FeatureItem[];
}

const FeaturesStatisticsCards = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
}: FeaturesStatisticsCardsProps) => {
  return (
    <section aria-label="Features section" className="py-20">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center w-content-width mx-auto gap-3 md:gap-2">
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
            {items.map((item) => (
              <div key={item.title} className="flex flex-col h-full card rounded">
                <div className="flex flex-col flex-1 gap-10 p-5">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-2xl md:text-3xl font-medium leading-tight truncate">{item.title}</h3>
                    <p className="text-base md:text-lg leading-tight text-foreground/75">{item.description}</p>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-auto">
                    <div className="flex items-center min-w-0 flex-1 gap-2">
                      <span className="shrink-0 size-[1em] rounded-sm bg-accent" />
                      <span className="text-base truncate">{item.label}</span>
                    </div>
                    <span className="text-xl md:text-2xl font-medium">{item.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </GridOrCarousel>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesStatisticsCards;
