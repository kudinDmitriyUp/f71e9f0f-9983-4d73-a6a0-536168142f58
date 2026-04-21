import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const TestimonialMarqueeCards = ({
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
  const half = Math.ceil(testimonials.length / 2);
  const topRow = testimonials.slice(0, half);
  const bottomRow = testimonials.slice(half);

  return (
    <section aria-label="Testimonials section" className="py-20">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center gap-3 md:gap-2 w-content-width mx-auto">
          <span className="px-3 py-1 text-sm rounded card">{tag}</span>

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
          className="flex flex-col gap-5 w-content-width mx-auto"
        >
          <div className="overflow-hidden mask-fade-x">
            <div className="flex w-max animate-marquee-horizontal" style={{ animationDuration: "30s" }}>
              {[...topRow, ...topRow, ...topRow, ...topRow].map((testimonial, index) => (
                <div key={`top-${index}`} className="shrink-0 w-72 md:w-80 mr-5 p-5 rounded card">
                  <div className="flex flex-col justify-between gap-5 h-full">
                    <p className="text-lg leading-tight line-clamp-3">{testimonial.quote}</p>

                    <div className="flex items-center gap-3">
                      <div className="size-10 overflow-hidden rounded-full">
                        <ImageOrVideo imageSrc={testimonial.imageSrc} videoSrc={testimonial.videoSrc} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-medium leading-tight">{testimonial.name}</span>
                        <span className="text-sm leading-tight opacity-75">{testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="overflow-hidden mask-fade-x">
            <div className="flex w-max animate-marquee-horizontal-reverse" style={{ animationDuration: "30s" }}>
              {[...bottomRow, ...bottomRow, ...bottomRow, ...bottomRow].map((testimonial, index) => (
                <div key={`bottom-${index}`} className="shrink-0 w-72 md:w-80 mr-5 p-5 rounded card">
                  <div className="flex flex-col justify-between gap-5 h-full">
                    <p className="text-lg leading-tight line-clamp-3">{testimonial.quote}</p>

                    <div className="flex items-center gap-3">
                      <div className="size-10 overflow-hidden rounded-full">
                        <ImageOrVideo imageSrc={testimonial.imageSrc} videoSrc={testimonial.videoSrc} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-base font-medium leading-tight">{testimonial.name}</span>
                        <span className="text-sm leading-tight opacity-75">{testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialMarqueeCards;
