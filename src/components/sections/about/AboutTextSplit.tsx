import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";

interface AboutTextSplitProps {
  title: string;
  descriptions: string[];
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
}

const AboutTextSplit = ({
  title,
  descriptions,
  primaryButton,
  secondaryButton,
}: AboutTextSplitProps) => {
  return (
    <section aria-label="About section" className="py-20">
      <div className="flex flex-col gap-30 mx-auto w-content-width">
        <div className="flex flex-col md:flex-row gap-3 md:gap-15">
          <div className="w-full md:w-1/2">
            <TextAnimation
              text={title}
              variant="slide-up"
              tag="h2"
              className="text-7xl font-medium"
            />
          </div>

          <div className="flex flex-col gap-5 w-full md:w-1/2">
            {descriptions.map((desc, index) => (
              <TextAnimation
                key={index}
                text={desc}
                variant="slide-up"
                tag="p"
                className="text-base md:text-2xl leading-tight text-foreground/75"
              />
            ))}

            {(primaryButton || secondaryButton) && (
              <div className="flex flex-wrap max-md:justify-center gap-5">
                {primaryButton && <Button text={primaryButton.text} href={primaryButton.href} variant="primary" animate />}
                {secondaryButton && <Button text={secondaryButton.text} href={secondaryButton.href} variant="secondary" animate delay={0.1} />}
              </div>
            )}
          </div>
        </div>

        <div className="w-full border-b border-foreground/10" />
      </div>
    </section>
  );
};

export default AboutTextSplit;
