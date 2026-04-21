import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";

type TeamMember = {
  name: string;
  role: string;
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const TeamStackedCards = ({
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
    <div className="flex flex-col gap-8 w-content-width mx-auto">
      <div className="flex flex-col items-center gap-3 md:gap-2">
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
        className="flex flex-wrap justify-center gap-y-5"
      >
        {members.map((member) => (
          <div key={member.name} className="flex flex-col items-center w-[55%] md:w-[28%] -mx-[4%] md:-mx-[2%] text-center">
            <div className="p-3 mb-3 w-full aspect-square card rounded overflow-hidden">
              <ImageOrVideo imageSrc={member.imageSrc} videoSrc={member.videoSrc} className="rounded" />
            </div>
            <span className="w-4/5 text-2xl font-medium leading-tight truncate">{member.name}</span>
            <span className="w-4/5 text-base leading-tight opacity-75 truncate">{member.role}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TeamStackedCards;
