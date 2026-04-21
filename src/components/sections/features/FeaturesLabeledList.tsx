import { Fragment } from "react";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";

type FeatureItem = {
  label: string;
  title: string;
  bullets: string[];
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
};

interface FeaturesLabeledListProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  items: FeatureItem[];
}

const FeaturesLabeledList = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
}: FeaturesLabeledListProps) => {
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

        <div className="flex flex-col gap-5 w-content-width mx-auto">
          {items.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col md:flex-row gap-5 md:gap-12 p-5 md:p-12 card rounded"
            >
              <div className="w-full md:w-1/2 flex md:justify-start">
                <h3 className="text-7xl font-medium leading-tight truncate">{item.label}</h3>
              </div>

              <div className="w-full h-px bg-foreground/20 md:hidden" />

              <div className="flex flex-col w-full md:w-1/2 gap-5">
                <h4 className="text-2xl md:text-3xl font-medium leading-tight">{item.title}</h4>

                <div className="flex flex-wrap items-center gap-1">
                  {item.bullets.map((text, index) => (
                    <Fragment key={index}>
                      <span className="text-base">{text}</span>
                      {index < item.bullets.length - 1 && <span className="text-base text-accent">•</span>}
                    </Fragment>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 mt-2">
                  <Button text={item.primaryButton.text} href={item.primaryButton.href} variant="primary" />
                  <Button text={item.secondaryButton.text} href={item.secondaryButton.href} variant="secondary" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesLabeledList;
