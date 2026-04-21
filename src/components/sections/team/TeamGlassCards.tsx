import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import GridOrCarousel from "@/components/ui/GridOrCarousel";

type TeamMember = {
  name: string;
  role: string;
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const TeamGlassCards = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  members,
}: {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  members: TeamMember[];
}) => (
  <section aria-label="Team section" className="py-20">
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
          {members.map((member) => (
            <div key={member.name} className="relative aspect-4/5 rounded overflow-hidden">
              <ImageOrVideo imageSrc={member.imageSrc} videoSrc={member.videoSrc} />

              <div
                className="absolute inset-x-0 bottom-0 h-1/3 backdrop-blur-xl"
                style={{ maskImage: "linear-gradient(to bottom, transparent, black 60%)" }}
                aria-hidden="true"
              />

              <div className="absolute inset-x-5 bottom-5 flex flex-col text-background">
                <span className="text-2xl font-medium leading-tight truncate">{member.name}</span>
                <span className="text-base leading-tight truncate">{member.role}</span>
              </div>
            </div>
          ))}
        </GridOrCarousel>
      </motion.div>
    </div>
  </section>
);

export default TeamGlassCards;
