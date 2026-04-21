import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";

type FeatureItem = {
  title: string;
  description: string;
  tags: string[];
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

interface FeaturesDetailedCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  items: FeatureItem[];
}

const FeaturesDetailedCards = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
}: FeaturesDetailedCardsProps) => {
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

        <div className="flex flex-col w-content-width mx-auto gap-5">
          {items.map((item) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col md:grid md:grid-cols-10 2xl:w-8/10 mx-auto gap-5 md:gap-10 p-5 md:p-10 cursor-pointer card rounded group"
            >
              <div className="flex flex-col md:col-span-6 gap-3 md:gap-12">
                <h3 className="text-3xl md:text-5xl font-medium leading-tight text-balance">{item.title}</h3>

                <div className="flex flex-col mt-auto gap-5">
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((itemTag) => (
                      <span key={itemTag} className="px-3 py-1 text-sm card rounded">{itemTag}</span>
                    ))}
                  </div>

                  <p className="text-base md:text-2xl leading-tight text-balance">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="aspect-square md:col-span-4 rounded overflow-hidden">
                <ImageOrVideo imageSrc={item.imageSrc} videoSrc={item.videoSrc} className="transition-transform duration-500 ease-in-out group-hover:scale-105" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesDetailedCards;
