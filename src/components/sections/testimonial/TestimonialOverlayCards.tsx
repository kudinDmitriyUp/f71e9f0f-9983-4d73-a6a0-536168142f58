import { motion } from "motion/react";
import { Star } from "lucide-react";
import { cls } from "@/lib/utils";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import GridOrCarousel from "@/components/ui/GridOrCarousel";

type Testimonial = {
  name: string;
  role: string;
  company: string;
  rating: number;
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const TestimonialOverlayCards = ({
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
            <div key={testimonial.name} className="relative aspect-3/4 rounded overflow-hidden">
              <ImageOrVideo imageSrc={testimonial.imageSrc} videoSrc={testimonial.videoSrc} />

              <div className="absolute inset-x-5 bottom-5 flex flex-col gap-2 p-5 card rounded backdrop-blur-sm">
                <div className="flex gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={cls(
                        "size-5 text-accent",
                        index < testimonial.rating ? "fill-accent" : "fill-transparent"
                      )}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>

                <span className="text-2xl font-medium leading-tight">{testimonial.name}</span>

                <div className="flex flex-col">
                  <span className="text-base leading-tight">{testimonial.role}</span>
                  <span className="text-base leading-tight opacity-75">{testimonial.company}</span>
                </div>
              </div>
            </div>
          ))}
        </GridOrCarousel>
      </motion.div>
    </div>
  </section>
);

export default TestimonialOverlayCards;
