import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";

type HeroBillboardCarouselProps = {
  tag: string;
  title: string;
  description: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
  items: ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never })[];
};

const HeroBillboardCarousel = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
}: HeroBillboardCarouselProps) => {
  const duplicated = [...items, ...items, ...items, ...items];

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

      <div className="w-content-width mx-auto overflow-hidden mask-fade-x">
        <div className="flex w-max animate-marquee-horizontal" style={{ animationDuration: "60s" }}>
          {duplicated.map((item, i) => (
            <div key={i} className="shrink-0 w-60 md:w-75 2xl:w-80 aspect-4/5 mr-3 md:mr-5 p-1.5 card rounded-lg overflow-hidden">
              <ImageOrVideo
                imageSrc={item.imageSrc}
                videoSrc={item.videoSrc}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroBillboardCarousel;
