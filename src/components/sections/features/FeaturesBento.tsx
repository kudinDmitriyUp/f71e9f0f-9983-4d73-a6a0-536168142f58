import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import GridOrCarousel from "@/components/ui/GridOrCarousel";
import InfoCardMarquee from "@/components/ui/InfoCardMarquee";
import TiltedStackCards from "@/components/ui/TiltedStackCards";
import AnimatedBarChart from "@/components/ui/AnimatedBarChart";
import OrbitingIcons from "@/components/ui/OrbitingIcons";
import IconTextMarquee from "@/components/ui/IconTextMarquee";
import ChatMarquee from "@/components/ui/ChatMarquee";
import ChecklistTimeline from "@/components/ui/ChecklistTimeline";
import MediaStack from "@/components/ui/MediaStack";
import type { LucideIcon } from "lucide-react";

type IconInput = string | LucideIcon;

type FeatureCard = { title: string; description: string } & (
  | { bentoComponent: "info-card-marquee"; items: { icon: IconInput; label: string; value: string }[] }
  | { bentoComponent: "tilted-stack-cards"; items: [{ icon: IconInput; title: string; subtitle: string; detail: string }, { icon: IconInput; title: string; subtitle: string; detail: string }, { icon: IconInput; title: string; subtitle: string; detail: string }] }
  | { bentoComponent: "animated-bar-chart" }
  | { bentoComponent: "orbiting-icons"; centerIcon: IconInput; items: IconInput[] }
  | { bentoComponent: "icon-text-marquee"; centerIcon: IconInput; texts: string[] }
  | { bentoComponent: "chat-marquee"; aiIcon: IconInput; userIcon: IconInput; exchanges: { userMessage: string; aiResponse: string }[]; placeholder: string }
  | { bentoComponent: "checklist-timeline"; heading: string; subheading: string; items: [{ label: string; detail: string }, { label: string; detail: string }, { label: string; detail: string }]; completedLabel: string }
  | { bentoComponent: "media-stack"; items: [{ imageSrc?: string; videoSrc?: string }, { imageSrc?: string; videoSrc?: string }, { imageSrc?: string; videoSrc?: string }] }
);

const getBentoComponent = (feature: FeatureCard) => {
  switch (feature.bentoComponent) {
    case "info-card-marquee": return <InfoCardMarquee items={feature.items} />;
    case "tilted-stack-cards": return <TiltedStackCards items={feature.items} />;
    case "animated-bar-chart": return <AnimatedBarChart />;
    case "orbiting-icons": return <OrbitingIcons centerIcon={feature.centerIcon} items={feature.items} />;
    case "icon-text-marquee": return <IconTextMarquee centerIcon={feature.centerIcon} texts={feature.texts} />;
    case "chat-marquee": return <ChatMarquee aiIcon={feature.aiIcon} userIcon={feature.userIcon} exchanges={feature.exchanges} placeholder={feature.placeholder} />;
    case "checklist-timeline": return <ChecklistTimeline heading={feature.heading} subheading={feature.subheading} items={feature.items} completedLabel={feature.completedLabel} />;
    case "media-stack": return <MediaStack items={feature.items} />;
  }
};

const FeaturesBento = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  features,
}: {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  features: FeatureCard[];
}) => (
  <section aria-label="Features bento section" className="py-20">
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center w-content-width mx-auto gap-3 md:gap-2">
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
        <GridOrCarousel carouselThreshold={3}>
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-5 p-5 card rounded h-full">
              <div className="relative h-72 overflow-hidden">{getBentoComponent(feature)}</div>
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-medium leading-tight">{feature.title}</h3>
                <p className="text-sm leading-tight">{feature.description}</p>
              </div>
            </div>
          ))}
        </GridOrCarousel>
      </motion.div>
    </div>
  </section>
);

export default FeaturesBento;
