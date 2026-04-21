import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import GridOrCarousel from "@/components/ui/GridOrCarousel";
import { resolveIcon } from "@/utils/resolve-icon";

type FeatureItem = {
  icon: string | LucideIcon;
  title: string;
  description: string;
  mediaItems: [
    ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never }),
    ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never })
  ];
};

interface FeaturesDualMediaProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  items: FeatureItem[];
}

const FeaturesDualMedia = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
}: FeaturesDualMediaProps) => {
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
          <GridOrCarousel carouselThreshold={2}>
            {items.map((item) => {
              const IconComponent = resolveIcon(item.icon);
              return (
                <div key={item.title} className="flex flex-col gap-5 p-5 h-full card rounded">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-center mb-1 size-15 primary-button rounded">
                      <IconComponent className="h-2/5 w-2/5 text-primary-cta-text" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-medium leading-tight">{item.title}</h3>
                    <p className="text-base leading-tight">{item.description}</p>
                  </div>

                  <div className="grid grid-cols-2 flex-1 mt-auto gap-5">
                    {item.mediaItems.map((mediaItem, mediaIndex) => (
                      <div key={mediaIndex} className="aspect-square rounded overflow-hidden">
                        <ImageOrVideo imageSrc={mediaItem.imageSrc} videoSrc={mediaItem.videoSrc} />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </GridOrCarousel>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesDualMedia;
