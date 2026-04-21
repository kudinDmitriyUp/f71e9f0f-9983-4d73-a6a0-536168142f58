import { motion } from "motion/react";
import { Info } from "lucide-react";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import GridOrCarousel from "@/components/ui/GridOrCarousel";
import Button from "@/components/ui/Button";

type FeatureItem = {
  title: string;
  description: string;
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

interface FeaturesRevealCardsProps {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  items: FeatureItem[];
}

const FeaturesRevealCards = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  items,
}: FeaturesRevealCardsProps) => {
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
            {items.map((item, index) => (
              <div key={item.title} className="group relative overflow-hidden aspect-6/7 rounded">
                <ImageOrVideo imageSrc={item.imageSrc} videoSrc={item.videoSrc} className="absolute inset-0" />

                <div className="absolute top-5 left-5 z-20 perspective-[1000px]">
                  <div className="relative size-8 transform-3d transition-transform duration-400 group-hover:rotate-y-180">
                    <div className="absolute inset-0 flex items-center justify-center rounded bg-background backface-hidden">
                      <span className="text-sm font-medium text-foreground">{index + 1}</span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center rounded bg-background backface-hidden rotate-y-180">
                      <Info className="h-1/2 w-1/2 text-foreground" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 h-2/5 backdrop-blur-xl mask-fade-top-overlay" aria-hidden="true" />

                <div className="absolute inset-x-0 bottom-0 z-10 p-1">
                  <div className="relative flex flex-col gap-1 p-3">
                    <div className="absolute inset-0 -z-10 card rounded translate-y-full opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100" />

                    <h3 className="text-2xl font-semibold leading-tight text-background transition-colors duration-400 group-hover:text-foreground">
                      {item.title}
                    </h3>
                    <div className="grid grid-rows-[0fr] transition-all duration-400 ease-out group-hover:grid-rows-[1fr]">
                      <p className="overflow-hidden text-sm leading-tight text-foreground opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </GridOrCarousel>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesRevealCards;
