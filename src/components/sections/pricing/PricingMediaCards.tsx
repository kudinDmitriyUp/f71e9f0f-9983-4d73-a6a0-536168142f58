import { motion } from "motion/react";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";

type PricingPlan = {
  tag: string;
  price: string;
  period: string;
  features: string[];
  primaryButton: { text: string; href: string };
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const PricingMediaCards = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  plans,
}: {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  plans: PricingPlan[];
}) => (
  <section aria-label="Pricing section" className="py-20">
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

      <div className="flex flex-col gap-5 w-content-width mx-auto">
        {plans.map((plan) => (
          <motion.div
            key={plan.tag}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col md:flex-row gap-5 md:gap-10 p-5 card rounded"
          >
            <div className="w-full md:w-1/2 aspect-square md:aspect-4/3 rounded overflow-hidden">
              <ImageOrVideo imageSrc={plan.imageSrc} videoSrc={plan.videoSrc} />
            </div>

            <div className="flex flex-col justify-center gap-5 w-full md:w-1/2">
              <span className="px-3 py-1 w-fit text-sm card rounded">{plan.price}{plan.period}</span>
              <h3 className="text-4xl md:text-5xl font-medium truncate">{plan.tag}</h3>

              <div className="flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="flex items-center justify-center shrink-0 size-6 primary-button rounded">
                      <Check className="size-3 text-primary-cta-text" strokeWidth={2} />
                    </div>
                    <span className="text-sm leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <Button text={plan.primaryButton.text} href={plan.primaryButton.href} variant="primary" className="w-fit mt-1" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingMediaCards;
