import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import Transition from "@/components/ui/Transition";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import { cls } from "@/lib/utils";

type Avatar = {
  name: string;
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const TestimonialAvatarCard = ({
  tag,
  title,
  primaryButton,
  secondaryButton,
  avatars,
}: {
  tag: string;
  title: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  avatars: Avatar[];
}) => {
  const visibleAvatars = avatars.slice(0, 5);
  const remainingCount = avatars.length - visibleAvatars.length;

  return (
    <section aria-label="Testimonials section" className="py-20">
      <div className="w-content-width mx-auto">
        <Transition className="flex flex-col items-center gap-5 py-20 px-8 rounded card">
          <div className="flex flex-col items-center gap-3">
            <span className="px-3 py-1 text-sm rounded card">{tag}</span>

            <TextAnimation
              text={title}
              variant="slide-up"
              tag="h3"
              className="md:max-w-7/10 text-3xl md:text-5xl font-medium leading-tight text-center text-balance"
            />

            {(primaryButton || secondaryButton) && (
              <div className="flex flex-wrap justify-center gap-3 mt-1">
                {primaryButton && <Button text={primaryButton.text} href={primaryButton.href} variant="primary" animate />}
                {secondaryButton && <Button text={secondaryButton.text} href={secondaryButton.href} variant="secondary" animate delay={0.1} />}
              </div>
            )}
          </div>

          <div className="flex items-center mt-1">
            {visibleAvatars.map((avatar, index) => (
              <div
                key={avatar.name}
                className={cls("relative size-14 md:size-20 overflow-hidden rounded-full border-2 border-background", index > 0 && "-ml-5")}
                style={{ zIndex: visibleAvatars.length - index }}
              >
                <ImageOrVideo imageSrc={avatar.imageSrc} videoSrc={avatar.videoSrc} />
              </div>
            ))}
            {remainingCount > 0 && (
              <div
                className="flex items-center justify-center size-14 md:size-20 -ml-5 rounded-full border-2 border-background card"
                style={{ zIndex: 0 }}
              >
                <span className="text-sm md:text-base font-medium">+{remainingCount}</span>
              </div>
            )}
          </div>
        </Transition>
      </div>
    </section>
  );
};

export default TestimonialAvatarCard;
