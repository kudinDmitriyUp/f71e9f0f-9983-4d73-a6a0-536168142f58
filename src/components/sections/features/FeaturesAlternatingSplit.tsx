import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import { cls } from "@/lib/utils";

type FeatureItem = {
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

interface FeaturesAlternatingSplitProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  items: FeatureItem[];
}

const FeaturesAlternatingSplit = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
}: FeaturesAlternatingSplitProps) => {
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
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={cls("flex flex-col gap-5 md:gap-12 p-5 md:p-12 card rounded", index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse")}
            >
              <div className="flex flex-col justify-center w-full md:w-1/2 gap-3">
                <span className="flex items-center justify-center size-8 mb-1 text-sm rounded primary-button text-primary-cta-text">
                  {index + 1}
                </span>
                <h3 className="text-4xl md:text-5xl font-medium leading-tight text-balance">{item.title}</h3>
                <p className="text-base leading-tight text-balance">{item.description}</p>
                {(item.primaryButton || item.secondaryButton) && (
                  <div className="flex flex-wrap gap-3 mt-2">
                    {item.primaryButton && <Button text={item.primaryButton.text} href={item.primaryButton.href} variant="primary" />}
                    {item.secondaryButton && <Button text={item.secondaryButton.text} href={item.secondaryButton.href} variant="secondary" />}
                  </div>
                )}
              </div>
              <div className="w-full md:w-1/2 aspect-square rounded overflow-hidden">
                <ImageOrVideo imageSrc={item.imageSrc} videoSrc={item.videoSrc} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesAlternatingSplit;
