import { useState } from "react";
import { motion } from "motion/react";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import { sendContactEmail } from "@/lib/api/email";

type ContactSplitEmailProps = {
  tag: string;
  title: string;
  description: string;
  inputPlaceholder: string;
  buttonText: string;
  termsText?: string;
  onSubmit?: (email: string) => void;
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const ContactSplitEmail = ({
  tag,
  title,
  description,
  inputPlaceholder,
  buttonText,
  termsText,
  onSubmit,
  imageSrc,
  videoSrc,
}: ContactSplitEmailProps) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendContactEmail({ email });
      onSubmit?.(email);
      setEmail("");
    } catch {}
  };

  return (
    <section aria-label="Contact section" className="py-20">
      <div className="w-content-width mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div className="flex items-center justify-center py-15 md:py-20 card rounded">
            <div className="flex flex-col items-center w-full gap-3 px-5">
              <span className="card rounded px-3 py-1 text-sm">{tag}</span>

              <TextAnimation
                text={title}
                variant="slide-up"
                tag="h2"
                className="text-5xl md:text-6xl font-medium text-center text-balance"
              />

              <TextAnimation
                text={description}
                variant="slide-up"
                tag="p"
                className="md:max-w-8/10 text-lg leading-tight text-center"
              />

              <form
                onSubmit={handleSubmit}
                className="flex flex-col md:flex-row w-full md:w-8/10 2xl:w-6/10 gap-3 md:gap-1 p-1 mt-2 card rounded"
              >
                <input
                  type="email"
                  placeholder={inputPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-5 py-3 md:py-0 text-base text-center md:text-left bg-transparent placeholder:opacity-75 focus:outline-none truncate"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="primary-button h-9 px-5 text-sm rounded text-primary-cta-text cursor-pointer"
                >
                  {buttonText}
                </button>
              </form>

              {termsText && (
                <p className="text-xs opacity-75 text-center md:max-w-8/10 2xl:max-w-6/10">
                  {termsText}
                </p>
              )}
            </div>
          </div>

          <div className="h-100 md:h-auto card rounded overflow-hidden">
            <ImageOrVideo imageSrc={imageSrc} videoSrc={videoSrc} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSplitEmail;
