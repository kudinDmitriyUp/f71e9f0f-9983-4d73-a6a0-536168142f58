import type { LucideIcon } from "lucide-react";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import LoopCarousel from "@/components/ui/LoopCarousel";
import Button from "@/components/ui/Button";
import { useButtonClick } from "@/hooks/useButtonClick";
import { resolveIcon } from "@/utils/resolve-icon";

type FeatureItem = {
  title: string;
  description: string;
  buttonIcon: string | LucideIcon;
  buttonHref?: string;
  buttonOnClick?: () => void;
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

interface FeaturesMediaCarouselProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  items: FeatureItem[];
}

const FeatureMediaCarouselCard = ({ item }: { item: FeatureItem }) => {
  const handleClick = useButtonClick(item.buttonHref, item.buttonOnClick);
  const Icon = resolveIcon(item.buttonIcon);

  return (
    <div className="relative overflow-hidden aspect-square md:aspect-3/2 rounded">
      <ImageOrVideo imageSrc={item.imageSrc} videoSrc={item.videoSrc} className="absolute inset-0" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 backdrop-blur-xl mask-fade-top-overlay" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-foreground/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-5 p-5">
        <div className="flex flex-col min-w-0">
          <h3 className="text-2xl md:text-3xl font-medium leading-tight text-background">{item.title}</h3>
          <p className="text-sm md:text-base leading-tight text-background/75">{item.description}</p>
        </div>
        <button
          onClick={handleClick}
          type="button"
          aria-label={item.buttonHref ? `Navigate to ${item.buttonHref}` : "Action button"}
          className="flex items-center justify-center shrink-0 size-8 cursor-pointer primary-button rounded"
        >
          <Icon className="h-2/5 w-2/5 text-primary-cta-text" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
};

const FeaturesMediaCarousel = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
}: FeaturesMediaCarouselProps) => {
  return (
    <section aria-label="Features section" className="w-full py-20">
      <div className="flex flex-col w-full gap-8">
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

        <LoopCarousel>
          {items.map((item) => (
            <FeatureMediaCarouselCard key={item.title} item={item} />
          ))}
        </LoopCarousel>
      </div>
    </section>
  );
};

export default FeaturesMediaCarousel;
