import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import Transition from "@/components/ui/Transition";

type Testimonial = {
  title: string;
  quote: string;
  name: string;
  role: string;
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const TestimonialDetailedCards = ({
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
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section aria-label="Testimonials section" className="py-20">
      <div className="flex flex-col gap-8 w-content-width mx-auto">
        <div className="flex flex-col items-center gap-3 md:gap-2">
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
          className="grid grid-cols-1 gap-5 md:grid-cols-2"
        >
          <div className="flex flex-col justify-between gap-5 p-5 md:p-8 rounded card">
            <Transition key={activeIndex} transitionType="fade" whileInView={false} className="flex flex-col gap-3">
              <h3 className="text-2xl md:text-3xl font-medium leading-tight">
                {activeTestimonial.title}
              </h3>

              <blockquote className="text-base md:text-lg leading-tight opacity-75">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </blockquote>
            </Transition>

            <div className="h-px w-full md:hidden bg-foreground/50" />

            <div className="flex items-center justify-between gap-5">
              <Transition key={activeIndex} transitionType="fade" whileInView={false} className="flex flex-col">
                <span className="text-base font-medium leading-tight">{activeTestimonial.name}</span>
                <span className="text-sm leading-tight opacity-75">{activeTestimonial.role}</span>
              </Transition>

              <div className="flex gap-3">
                <button
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="flex items-center justify-center size-9 cursor-pointer rounded primary-button"
                >
                  <ArrowLeft className="size-4 text-primary-cta-text" strokeWidth={1.5} />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="flex items-center justify-center size-9 cursor-pointer rounded primary-button"
                >
                  <ArrowRight className="size-4 text-primary-cta-text" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          <Transition key={activeIndex} transitionType="fade" whileInView={false} className="aspect-square rounded overflow-hidden">
            <ImageOrVideo imageSrc={activeTestimonial.imageSrc} videoSrc={activeTestimonial.videoSrc} />
          </Transition>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialDetailedCards;
