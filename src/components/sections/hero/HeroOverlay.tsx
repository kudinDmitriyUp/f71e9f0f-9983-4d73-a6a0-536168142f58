import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";

type HeroOverlayProps = {
  tag: string;
  title: string;
  description: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const HeroOverlay = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  imageSrc,
  videoSrc,
}: HeroOverlayProps) => {
  return (
    <section
      aria-label="Hero section"
      className="relative w-full h-svh overflow-hidden flex flex-col justify-end"
    >
      <ImageOrVideo
        imageSrc={imageSrc}
        videoSrc={videoSrc}
        className="absolute inset-0 w-full h-full object-cover rounded-none"
      />

      <div
        className="absolute z-10 w-[150vw] h-[150vw] left-0 bottom-0 -translate-x-1/2 translate-y-1/2 backdrop-blur mask-[radial-gradient(circle,black_20%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-content-width mx-auto pb-10 md:pb-25">
        <div className="flex flex-col gap-3 w-full md:w-4/10 2xl:w-35/100">
          <span className="w-fit px-3 py-1 mb-1.5 text-sm card rounded">{tag}</span>

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

          <div className="flex flex-wrap gap-3 mt-1.5">
            <Button text={primaryButton.text} href={primaryButton.href} variant="primary" animateImmediately />
            <Button text={secondaryButton.text} href={secondaryButton.href} variant="secondary" animateImmediately delay={0.1} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroOverlay;
