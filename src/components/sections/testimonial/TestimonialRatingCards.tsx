import { Star } from "lucide-react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import GridOrCarousel from "@/components/ui/GridOrCarousel";
import { cls } from "@/lib/utils";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const TestimonialRatingCards = ({
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

        <GridOrCarousel carouselThreshold={3}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="flex flex-col justify-between gap-5 h-full p-5 rounded card">
              <div className="flex flex-col items-start gap-5">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={cls("size-5 text-accent", index < testimonial.rating ? "fill-accent" : "fill-transparent")}
                      strokeWidth={1.5}
                    />
                  ))}
                </div>

                <p className="text-lg leading-tight">{testimonial.quote}</p>
              </div>

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
          ))}
        </GridOrCarousel>
      </div>
    </section>
  );
};

export default TestimonialRatingCards;
