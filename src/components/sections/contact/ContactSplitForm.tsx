import { useState } from "react";
import { motion } from "motion/react";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import { sendContactEmail } from "@/lib/api/email";

type InputField = {
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
};

type TextareaField = {
  name: string;
  placeholder: string;
  rows?: number;
  required?: boolean;
};

type ContactSplitFormProps = {
  tag: string;
  title: string;
  description: string;
  inputs: InputField[];
  textarea?: TextareaField;
  buttonText: string;
  onSubmit?: (data: Record<string, string>) => void;
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const ContactSplitForm = ({
  tag,
  title,
  description,
  inputs,
  textarea,
  buttonText,
  onSubmit,
  imageSrc,
  videoSrc,
}: ContactSplitFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    inputs.forEach((input) => {
      initial[input.name] = "";
    });
    if (textarea) {
      initial[textarea.name] = "";
    }
    return initial;
  });

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendContactEmail({ formData });
      onSubmit?.(formData);
      const reset: Record<string, string> = {};
      inputs.forEach((input) => {
        reset[input.name] = "";
      });
      if (textarea) {
        reset[textarea.name] = "";
      }
      setFormData(reset);
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
          <div className="p-5 md:p-10 card rounded">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="card rounded px-3 py-1 text-sm">{tag}</span>

                <TextAnimation
                  text={title}
                  variant="slide-up"
                  tag="h2"
                  className="text-4xl font-medium text-balance"
                />

                <TextAnimation
                  text={description}
                  variant="slide-up"
                  tag="p"
                  className="text-sm md:text-base leading-tight text-balance"
                />
              </div>

              <div className="flex flex-col gap-3">
                {inputs.map((input) => (
                  <input
                    key={input.name}
                    type={input.type}
                    placeholder={input.placeholder}
                    value={formData[input.name] || ""}
                    onChange={(e) => setFormData({ ...formData, [input.name]: e.target.value })}
                    required={input.required}
                    aria-label={input.placeholder}
                    className="w-full px-5 py-3 text-base bg-transparent placeholder:opacity-75 focus:outline-none card rounded"
                  />
                ))}

                {textarea && (
                  <textarea
                    placeholder={textarea.placeholder}
                    value={formData[textarea.name] || ""}
                    onChange={(e) => setFormData({ ...formData, [textarea.name]: e.target.value })}
                    required={textarea.required}
                    rows={textarea.rows || 5}
                    aria-label={textarea.placeholder}
                    className="w-full px-5 py-3 text-base bg-transparent placeholder:opacity-75 focus:outline-none resize-none card rounded"
                  />
                )}

                <button
                  type="submit"
                  className="w-full h-9 px-5 text-sm rounded text-primary-cta-text cursor-pointer primary-button"
                >
                  {buttonText}
                </button>
              </div>
            </form>
          </div>

          <div className="h-100 md:h-auto card rounded overflow-hidden">
            <ImageOrVideo imageSrc={imageSrc} videoSrc={videoSrc} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSplitForm;
