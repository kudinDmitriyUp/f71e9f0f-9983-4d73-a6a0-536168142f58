import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import GridOrCarousel from "@/components/ui/GridOrCarousel";

type Metric = {
  value: string;
  description: string;
};

const MetricsSimpleCards = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  metrics,
}: {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  metrics: Metric[];
}) => (
  <section aria-label="Metrics section" className="py-20">
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-3 md:gap-2 w-content-width mx-auto">
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
        <GridOrCarousel carouselThreshold={3}>
          {metrics.map((metric) => (
            <div key={metric.value} className="flex flex-col justify-between gap-5 p-5 min-h-70 h-full card rounded">
              <span className="text-7xl md:text-8xl font-medium leading-none truncate">{metric.value}</span>
              <p className="text-base leading-tight text-balance">{metric.description}</p>
            </div>
          ))}
        </GridOrCarousel>
      </motion.div>
    </div>
  </section>
);

export default MetricsSimpleCards;
