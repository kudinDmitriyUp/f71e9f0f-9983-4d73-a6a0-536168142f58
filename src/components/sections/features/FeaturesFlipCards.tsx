import { useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import GridOrCarousel from "@/components/ui/GridOrCarousel";
import Button from "@/components/ui/Button";

type FeatureItem = {
  title: string;
  descriptions: string[];
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

interface FeaturesFlipCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  items: FeatureItem[];
}

const FeatureFlipCard = ({ item }: { item: FeatureItem }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full cursor-pointer perspective-[3000px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        data-flipped={isFlipped}
        className="relative w-full h-full transition-transform duration-500 transform-3d data-[flipped=true]:transform-[rotateY(180deg)]"
      >
        <div className="flex flex-col gap-5 p-5 card rounded backface-hidden">
          <div className="flex items-start justify-between gap-5">
            <h3 className="text-2xl font-medium leading-tight">{item.title}</h3>
            <div className="flex items-center justify-center shrink-0 size-8 primary-button rounded">
              <Plus className="h-2/5 w-2/5 text-primary-cta-text" />
            </div>
          </div>
          <div className="relative overflow-hidden aspect-4/5 rounded">
            <ImageOrVideo imageSrc={item.imageSrc} videoSrc={item.videoSrc} className="absolute inset-0" />
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between gap-5 p-5 card rounded backface-hidden transform-[rotateY(180deg)]">
          <div className="flex items-start justify-between gap-5">
            <h3 className="text-2xl font-medium leading-tight">{item.title}</h3>
            <div className="flex items-center justify-center shrink-0 size-8 primary-button rounded">
              <Plus className="h-2/5 w-2/5 rotate-45 text-primary-cta-text" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            {item.descriptions.map((desc, index) => (
              <p key={index} className="text-lg leading-tight text-foreground/75">{desc}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturesFlipCards = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
}: FeaturesFlipCardsProps) => {
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
          <GridOrCarousel>
            {items.map((item) => (
              <FeatureFlipCard key={item.title} item={item} />
            ))}
          </GridOrCarousel>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesFlipCards;
