import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import GridOrCarousel from "@/components/ui/GridOrCarousel";

type FeatureItem = {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

interface FeaturesTaggedCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  items: FeatureItem[];
}

const FeaturesTaggedCards = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
}: FeaturesTaggedCardsProps) => {
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
          <GridOrCarousel carouselThreshold={3}>
            {items.map((item) => (
              <div key={item.title} className="flex flex-col gap-5 h-full group">
                <div className="relative aspect-square rounded overflow-hidden">
                  <ImageOrVideo imageSrc={item.imageSrc} videoSrc={item.videoSrc} className="transition-transform duration-500 ease-in-out group-hover:scale-105" />
                  <span className="absolute top-5 right-5 px-3 py-1 text-sm card rounded">{item.tag}</span>
                </div>
                <div className="flex flex-col gap-5 p-5 flex-1 card rounded">
                  <h3 className="text-xl md:text-2xl font-medium leading-tight">{item.title}</h3>
                  <p className="text-base leading-tight">{item.description}</p>
                  {(item.primaryButton || item.secondaryButton) && (
                    <div className="flex flex-wrap gap-3 mt-2">
                      {item.primaryButton && <Button text={item.primaryButton.text} href={item.primaryButton.href} variant="primary" />}
                      {item.secondaryButton && <Button text={item.secondaryButton.text} href={item.secondaryButton.href} variant="secondary" />}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </GridOrCarousel>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesTaggedCards;
