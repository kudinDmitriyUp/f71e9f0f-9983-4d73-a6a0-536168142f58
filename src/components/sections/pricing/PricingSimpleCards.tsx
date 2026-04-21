import { motion } from "motion/react";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import GridOrCarousel from "@/components/ui/GridOrCarousel";

type PricingPlan = {
  tag: string;
  price: string;
  description: string;
  features: string[];
};

const PricingSimpleCards = ({
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
          {plans.map((plan) => (
            <div key={plan.tag} className="flex flex-col gap-5 p-5 h-full card rounded">
              <span className="px-5 py-2 w-fit text-sm card rounded">{plan.tag}</span>

              <div className="flex flex-col gap-1">
                <span className="text-5xl font-medium">{plan.price}</span>
                <span className="text-base">{plan.description}</span>
              </div>

              <div className="w-full h-px bg-foreground/20" />

              <div className="flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <div className="flex items-center justify-center shrink-0 size-6 primary-button rounded">
                      <Check className="size-3 text-primary-cta-text" strokeWidth={2} />
                    </div>
                    <span className="text-base">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </GridOrCarousel>
      </motion.div>
    </div>
  </section>
);

export default PricingSimpleCards;
