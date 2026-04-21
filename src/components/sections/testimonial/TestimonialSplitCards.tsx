import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import type { EmblaCarouselType } from "embla-carousel";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import { cls } from "@/lib/utils";

type Testimonial = {
  tag: string;
  title: string;
  quote: string;
  name: string;
  date: string;
} & ({ avatarImageSrc: string; avatarVideoSrc?: never } | { avatarVideoSrc: string; avatarImageSrc?: never })
  & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const TestimonialSplitCards = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  testimonials,
}: {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  testimonials: Testimonial[];
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("select", onSelect).on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section aria-label="Testimonials section" className="py-20">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3 md:gap-2 w-content-width mx-auto">
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
          className="flex flex-col gap-5"
        >
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="flex-none w-content-width md:w-[calc(var(--width-content-width)*0.8)] mr-5">
                  <div className="flex flex-col justify-between md:grid md:grid-cols-2 h-full card rounded overflow-hidden">
                    <div className="flex flex-col justify-between gap-5 md:gap-8 p-5 md:p-10">
                      <div className="flex flex-col gap-3 md:gap-5">
                        <span className="px-3 py-1 w-fit text-sm card rounded">{testimonial.tag}</span>
                        <h3 className="text-3xl md:text-4xl font-medium leading-tight">{testimonial.title}</h3>
                        <p className="text-base md:text-lg leading-tight opacity-75">{testimonial.quote}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="size-12 overflow-hidden rounded-full">
                          <ImageOrVideo imageSrc={testimonial.avatarImageSrc} videoSrc={testimonial.avatarVideoSrc} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-medium leading-tight">{testimonial.name}</span>
                          <span className="text-sm leading-tight opacity-75">{testimonial.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative min-h-80 h-full md:aspect-square">
                      <ImageOrVideo imageSrc={testimonial.imageSrc} videoSrc={testimonial.videoSrc} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cls("size-2 rounded-full transition-colors", index === selectedIndex ? "bg-foreground" : "bg-foreground/10")}
                aria-label="Go to slide"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSplitCards;
