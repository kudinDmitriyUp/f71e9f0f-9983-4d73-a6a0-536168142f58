import { motion } from "motion/react";
import { cls } from "@/lib/utils";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";

type Metric = {
  value: string;
  title: string;
  description: string;
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const MetricsMediaCards = ({
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-content-width mx-auto">
        {metrics.map((metric, index) => {
          const isEven = index % 2 === 1;
          const isLast = index === metrics.length - 1;
          const isOddTotal = metrics.length % 2 !== 0;
          const shouldSpanFull = isLast && isOddTotal;

          return (
            <motion.div
              key={metric.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={cls("grid grid-cols-2 gap-5", shouldSpanFull && "md:col-span-2")}
            >
              <div className={cls(
                "flex flex-col justify-between gap-5 p-5 card rounded",
                shouldSpanFull ? "aspect-square md:aspect-video" : "aspect-square",
                isEven && "order-2 md:order-1"
              )}>
                <span className="text-5xl md:text-6xl font-medium leading-tight truncate">{metric.value}</span>
                <div className="flex flex-col gap-2">
                  <span className="text-xl md:text-2xl font-medium truncate">{metric.title}</span>
                  <div className="w-full h-px bg-accent" />
                  <p className="text-base leading-tight truncate">{metric.description}</p>
                </div>
              </div>

              <div className={cls(
                "rounded overflow-hidden",
                shouldSpanFull ? "aspect-square md:aspect-video" : "aspect-square",
                isEven && "order-1 md:order-2"
              )}>
                <ImageOrVideo imageSrc={metric.imageSrc} videoSrc={metric.videoSrc} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default MetricsMediaCards;
