import { motion } from "motion/react";
import { cls } from "@/lib/utils";
import TextAnimation from "@/components/ui/TextAnimation";

type Metric = {
  value: string;
  description: string;
};

const MetricsMinimalCards = ({
  tag,
  title,
  metrics,
}: {
  tag: string;
  title: string;
  metrics: Metric[];
}) => (
  <section aria-label="Metrics section" className="py-20">
    <div className="flex flex-col gap-8 w-content-width mx-auto">
      <div className="flex flex-col gap-5">
        <span className="px-3 py-1 w-fit text-sm card rounded md:hidden">{tag}</span>

        <TextAnimation
          text={title}
          variant="slide-up"
          tag="h2"
          className="text-3xl md:text-5xl font-medium leading-tight text-balance"
        />
      </div>

      <div className="w-full h-px bg-accent" />

      <div className="flex flex-col md:flex-row md:items-start gap-8">
        <span className="hidden md:block px-3 py-1 text-sm card rounded">{tag}</span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={cls(
            "grid grid-cols-1 gap-5 flex-1",
            metrics.length >= 2 && "md:grid-cols-2"
          )}
        >
          {metrics.map((metric) => (
            <div key={metric.value} className="flex flex-col justify-between gap-5 p-5 md:p-8 aspect-video card rounded">
              <span className="text-6xl md:text-8xl font-medium leading-none truncate">{metric.value}</span>
              <div className="flex flex-col gap-5">
                <div className="w-full h-px bg-accent" />
                <p className="text-base md:text-lg leading-tight text-balance">{metric.description}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default MetricsMinimalCards;
