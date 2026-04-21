import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import AutoFillText from "@/components/ui/AutoFillText";

type HeroBrandProps = {
  brand: string;
  description: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const HeroBrand = ({
  brand,
  description,
  primaryButton,
  secondaryButton,
  imageSrc,
  videoSrc,
}: HeroBrandProps) => {
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
        className="absolute z-10 w-full h-[50svh] md:h-[75svh] left-0 bottom-0 backdrop-blur-xl mask-[linear-gradient(to_bottom,transparent,black_60%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-content-width mx-auto pb-5">
        <div className="flex flex-col">
          <div className="w-full flex flex-col md:flex-row md:justify-between items-start md:items-end gap-3 md:gap-5">
            <TextAnimation
              text={description}
              variant="slide-up"
              tag="p"
              className="w-full md:w-1/2 text-lg md:text-2xl text-balance font-medium leading-tight"
            />

            <div className="w-full md:w-1/2 flex justify-start md:justify-end">
              <div className="flex flex-wrap gap-3">
                <Button text={primaryButton.text} href={primaryButton.href} variant="primary" animateImmediately />
                <Button text={secondaryButton.text} href={secondaryButton.href} variant="secondary" animateImmediately delay={0.1} />
              </div>
            </div>
          </div>

          <AutoFillText className="font-semibold">{brand}</AutoFillText>
        </div>
      </div>
    </section>
  );
};

export default HeroBrand;
