import { motion } from "motion/react";

type Variant = "slide-up" | "fade-blur" | "fade";

interface TextAnimationProps {
  text: string;
  variant: Variant;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  className?: string;
}

const VARIANTS = {
  "slide-up": {
    hidden: { opacity: 0, y: "50%" },
    visible: { opacity: 1, y: 0 },
  },
  "fade-blur": {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  "fade": {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
};

const EASING: Record<Variant, [number, number, number, number]> = {
  "slide-up": [0.25, 0.46, 0.45, 0.94],
  "fade-blur": [0.45, 0, 0.55, 1],
  "fade": [0.45, 0, 0.55, 1],
};

const TextAnimation = ({ text, variant, tag = "p", className = "" }: TextAnimationProps) => {
  const Tag = motion[tag] as typeof motion.p;
  const words = text.split(" ");

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20%" }}
      transition={{ staggerChildren: 0.04 }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={VARIANTS[variant]}
          transition={{ duration: 0.6, ease: EASING[variant] }}
        >
          {word}
          {i < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </Tag>
  );
};

export default TextAnimation;
