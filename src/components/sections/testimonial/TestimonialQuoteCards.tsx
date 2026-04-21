import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import GridOrCarousel from "@/components/ui/GridOrCarousel";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const TestimonialQuoteCards = ({
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
}) => (
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
      >
        <GridOrCarousel carouselThreshold={4}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="flex flex-col gap-5 p-5 card rounded">
              <div className="relative size-24 overflow-hidden rounded">
                <ImageOrVideo imageSrc={testimonial.imageSrc} videoSrc={testimonial.videoSrc} />
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-2xl font-medium leading-tight">{testimonial.name}</span>
                <span className="text-base leading-tight opacity-75">{testimonial.role}</span>
              </div>

              <p className="text-lg leading-tight">{testimonial.quote}</p>
            </div>
          ))}
        </GridOrCarousel>
      </motion.div>
    </div>
  </section>
);

export default TestimonialQuoteCards;
