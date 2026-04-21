import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import { cls } from "@/lib/utils";

type StepItem = {
  tag: string;
  title: string;
  subtitle: string;
  description: string;
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

interface FeaturesDetailedStepsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  steps: StepItem[];
}

const FeaturesDetailedSteps = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  steps,
}: FeaturesDetailedStepsProps) => {
  return (
    <section aria-label="Features detailed steps section" className="py-20">
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

        <div className="flex flex-col w-content-width mx-auto gap-5">
          {steps.map((step, index) => {
            const stepNumber = String(index + 1).padStart(2, "0");
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex flex-col md:flex-row justify-between 2xl:w-8/10 mx-auto gap-5 md:gap-12 p-5 md:p-12 card rounded overflow-hidden"
              >
                <div className="flex flex-col justify-between w-full md:w-1/2">
                  <div className="flex flex-col gap-5">
                    <span className="w-fit px-3 py-1 text-sm card rounded">{step.tag}</span>
                    <h3 className="text-5xl md:text-8xl font-medium leading-none">{step.title}</h3>
                  </div>
                  <div className="block md:hidden w-full h-px my-5 bg-accent/20" />
                  <div className="flex flex-col gap-2 md:gap-5">
                    <h4 className="text-2xl md:text-3xl font-medium text-balance">{step.subtitle}</h4>
                    <p className="text-base md:text-lg leading-tight text-balance">{step.description}</p>
                  </div>
                </div>
                <div className="flex flex-col w-full md:w-35/100 gap-10">
                  <span className="hidden md:block self-end text-8xl font-medium text-accent">{stepNumber}</span>
                  <div className={cls("aspect-square rounded overflow-hidden", index % 2 === 0 ? "rotate-3" : "-rotate-3")}>
                    <ImageOrVideo imageSrc={step.imageSrc} videoSrc={step.videoSrc} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesDetailedSteps;
