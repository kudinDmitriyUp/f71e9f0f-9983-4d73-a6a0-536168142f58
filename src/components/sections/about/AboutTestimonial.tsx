import { motion } from "motion/react";
import { Quote } from "lucide-react";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";

type AboutTestimonialProps = {
  tag: string;
  quote: string;
  author: string;
  role: string;
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const AboutTestimonial = ({
  tag,
  quote,
  author,
  role,
  imageSrc,
  videoSrc,
}: AboutTestimonialProps) => {
  return (
    <section aria-label="Testimonial section" className="py-20">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 mx-auto w-content-width">
        <div className="relative md:col-span-3 p-8 md:px-12 md:py-20 card rounded">
          <div className="absolute flex items-center justify-center -top-7 -left-7 md:-top-8 md:-left-8 size-14 md:size-16 primary-button rounded">
            <Quote className="h-5/10 text-primary-cta-text" strokeWidth={1.5} />
          </div>

          <div className="relative flex flex-col justify-center gap-5 py-8 md:py-5 h-full">
            <span className="w-fit px-3 py-1 text-sm card rounded">{tag}</span>

            <TextAnimation
              text={quote}
              variant="slide-up"
              tag="p"
              className="text-3xl md:text-4xl font-medium leading-tight"
            />

            <div className="flex items-center gap-2">
              <span className="text-base">{author}</span>
              <span className="text-accent">•</span>
              <span className="text-base text-foreground/75">{role}</span>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="md:col-span-2 aspect-square md:aspect-auto md:h-full card rounded overflow-hidden"
        >
          <ImageOrVideo imageSrc={imageSrc} videoSrc={videoSrc} />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutTestimonial;
