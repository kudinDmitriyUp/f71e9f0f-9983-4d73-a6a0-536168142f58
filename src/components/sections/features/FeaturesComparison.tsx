import { motion } from "motion/react";
import { Check, X } from "lucide-react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";

interface FeaturesComparisonProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  negativeItems: string[];
  positiveItems: string[];
}

const FeaturesComparison = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  negativeItems,
  positiveItems,
}: FeaturesComparisonProps) => {
  return (
    <section aria-label="Features comparison section" className="py-20">
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
          className="grid grid-cols-1 md:grid-cols-2 w-content-width md:w-6/10 mx-auto gap-5"
        >
          <div className="flex flex-col gap-5 p-5 card rounded opacity-50">
            {negativeItems.map((item) => (
              <div key={item} className="flex items-center gap-2 text-base">
                <X className="shrink-0 h-[1em] w-auto" />
                <span className="text-base truncate">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-5 p-5 card rounded">
            {positiveItems.map((item) => (
              <div key={item} className="flex items-center gap-2 text-base">
                <Check className="shrink-0 h-[1em] w-auto" />
                <span className="text-base truncate">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesComparison;
