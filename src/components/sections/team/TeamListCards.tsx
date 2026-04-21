import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";

type TeamMember = {
  name: string;
  role: string;
  detail: string;
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

type TeamGroup = {
  title: string;
  members: TeamMember[];
};

const TeamListCards = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  groups,
}: {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  groups: TeamGroup[];
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
        className="flex flex-col gap-8"
      >
        {groups.map((group) => (
          <div key={group.title} className="p-5 card rounded">
            <h3 className="mb-3 text-2xl md:text-3xl font-medium">{group.title}</h3>

            <div className="flex flex-col divide-y divide-accent border-t border-accent">
              {group.members.map((member) => (
                <div key={member.name} className="flex items-center gap-3 py-5 last:pb-0">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="relative size-12 md:size-16 shrink-0 overflow-hidden rounded">
                      <ImageOrVideo imageSrc={member.imageSrc} videoSrc={member.videoSrc} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-lg md:text-xl font-medium leading-tight truncate">{member.name}</span>
                      <span className="text-base leading-tight opacity-75 truncate">{member.role}</span>
                    </div>
                  </div>
                  <span className="text-sm md:text-lg font-medium shrink-0">{member.detail}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TeamListCards;
