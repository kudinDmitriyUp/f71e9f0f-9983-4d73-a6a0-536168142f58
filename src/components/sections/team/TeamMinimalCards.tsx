import { motion } from "motion/react";
import { cls } from "@/lib/utils";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";

type TeamMember = {
  name: string;
  role: string;
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const TeamMinimalCards = ({
  tag,
  title,
  members,
}: {
  tag: string;
  title: string;
  members: TeamMember[];
}) => (
  <section aria-label="Team section" className="py-20">
    <div className="flex flex-col gap-5 md:gap-8 w-content-width mx-auto">
      <div className="flex flex-col gap-5">
        <span className="md:hidden px-3 py-1 w-fit text-sm card rounded">{tag}</span>

        <TextAnimation
          text={title}
          variant="slide-up"
          tag="h2"
          className="text-3xl md:text-5xl font-medium leading-tight text-balance"
        />
      </div>

      <div className="w-full h-px bg-accent" />

      <div className="flex flex-col md:flex-row md:items-start gap-8">
        <span className="hidden md:block px-3 py-1 text-sm card rounded">{tag}</span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={cls(
            "grid grid-cols-1 gap-5 flex-1",
            members.length >= 2 && "md:grid-cols-2"
          )}
        >
          {members.map((member) => (
            <div key={member.name} className="flex flex-col gap-5 p-5 card rounded overflow-hidden">
              <div className="relative aspect-square md:aspect-5/4 rounded overflow-hidden">
                <ImageOrVideo imageSrc={member.imageSrc} videoSrc={member.videoSrc} />
              </div>
              <div className="flex flex-col gap-5">
                <div className="w-full h-px bg-accent" />
                <div className="flex flex-col">
                  <span className="text-xl font-medium leading-tight truncate">{member.name}</span>
                  <span className="text-base leading-tight truncate">{member.role}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default TeamMinimalCards;
