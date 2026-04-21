import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import TiltedCarousel from "@/components/ui/TiltedCarousel";

type HeroBillboardTiltedCarouselProps = {
  tag: string;
  title: string;
  description: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
  items: ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never })[];
};

const HeroBillboardTiltedCarousel = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
}: HeroBillboardTiltedCarouselProps) => {
  return (
    <section
      aria-label="Hero section"
      className="flex flex-col items-center justify-center gap-8 w-full min-h-svh py-25"
    >
      <div className="flex flex-col items-center gap-3 w-content-width mx-auto text-center">
        <span className="px-3 py-1 mb-1 text-sm card rounded">{tag}</span>

        <TextAnimation
          text={title}
          variant="slide-up"
          tag="h1"
          className="text-6xl font-medium text-balance"
        />

        <TextAnimation
          text={description}
          variant="slide-up"
          tag="p"
          className="text-base md:text-lg leading-tight text-balance"
        />

        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <Button text={primaryButton.text} href={primaryButton.href} variant="primary" animate />
          <Button text={secondaryButton.text} href={secondaryButton.href} variant="secondary" animate delay={0.1} />
        </div>
      </div>

      <TiltedCarousel items={items} />
    </section>
  );
};

export default HeroBillboardTiltedCarousel;
