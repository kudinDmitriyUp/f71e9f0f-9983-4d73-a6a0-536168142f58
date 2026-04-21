import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";

type HeroSplitVerticalMarqueeProps = {
  tag: string;
  title: string;
  description: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
  leftItems: ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never })[];
  rightItems: ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never })[];
};

const HeroSplitVerticalMarquee = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  leftItems,
  rightItems,
}: HeroSplitVerticalMarqueeProps) => {
  const duplicatedLeft = [...leftItems, ...leftItems, ...leftItems, ...leftItems];
  const duplicatedRight = [...rightItems, ...rightItems, ...rightItems, ...rightItems];

  return (
    <section aria-label="Hero section" className="flex items-center h-fit md:h-svh pt-25 pb-20 md:py-0">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 w-content-width mx-auto">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="px-3 py-1 mb-2 text-sm card rounded">{tag}</span>

            <TextAnimation
              text={title}
              variant="fade"
              tag="h1"
              className="text-7xl 2xl:text-8xl font-medium text-center md:text-left text-balance"
            />

            <TextAnimation
              text={description}
              variant="fade"
              tag="p"
              className="max-w-8/10 text-lg md:text-xl leading-tight text-center md:text-left"
            />

            <div className="flex flex-wrap max-md:justify-center gap-3 mt-2">
              <Button text={primaryButton.text} href={primaryButton.href} variant="primary" animate />
              <Button text={secondaryButton.text} href={secondaryButton.href} variant="secondary" animate delay={0.1} />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-100 md:h-[75vh] flex gap-3 overflow-hidden">
          <div className="flex-1 overflow-hidden mask-fade-y">
            <div className="flex flex-col gap-3 animate-marquee-vertical">
              {duplicatedLeft.map((item, index) => (
                <div key={index} className="shrink-0 aspect-square p-3 card rounded overflow-hidden">
                  <ImageOrVideo imageSrc={item.imageSrc} videoSrc={item.videoSrc} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-hidden mask-fade-y">
            <div className="flex flex-col gap-3 animate-marquee-vertical-reverse">
              {duplicatedRight.map((item, index) => (
                <div key={index} className="shrink-0 aspect-square p-3 card rounded overflow-hidden">
                  <ImageOrVideo imageSrc={item.imageSrc} videoSrc={item.videoSrc} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSplitVerticalMarquee;
