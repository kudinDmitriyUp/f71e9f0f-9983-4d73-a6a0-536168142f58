import type { LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import { resolveIcon } from "@/utils/resolve-icon";

type AboutFeaturesSplitProps = {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  items: { icon: string | LucideIcon; title: string; description: string }[];
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const AboutFeaturesSplit = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
  imageSrc,
  videoSrc,
}: AboutFeaturesSplitProps) => {
  return (
    <section aria-label="About section" className="py-20">
      <div className="flex flex-col gap-8 mx-auto w-content-width">
        <div className="flex flex-col items-center gap-3 md:gap-2">
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

        <div className="flex flex-col md:flex-row md:items-stretch gap-5">
          <div className="flex flex-col justify-center gap-5 p-5 w-full md:w-4/10 2xl:w-3/10 card rounded">
            {items.map((item, index) => {
              const ItemIcon = resolveIcon(item.icon);
              return (
              <div key={item.title}>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-center shrink-0 mb-1 size-10 primary-button rounded">
                    <ItemIcon className="h-2/5 w-2/5 text-primary-cta-text" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-medium">{item.title}</h3>
                  <p className="text-base leading-tight">{item.description}</p>
                </div>
                {index < items.length - 1 && (
                  <div className="mt-5 border-b border-accent/40" />
                )}
              </div>
              );
            })}
          </div>

          <div className="p-5 w-full md:w-6/10 2xl:w-7/10 h-80 md:h-auto card rounded overflow-hidden">
            <ImageOrVideo imageSrc={imageSrc} videoSrc={videoSrc} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFeaturesSplit;
