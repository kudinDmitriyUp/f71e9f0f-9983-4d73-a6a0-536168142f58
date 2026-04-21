import { motion } from "motion/react";
import type { ReactNode } from "react";

interface TransitionProps {
  children: ReactNode;
  className?: string;
  transitionType?: "full" | "fade";
  whileInView?: boolean;
}

const Transition = ({
  children,
  className = "flex flex-col w-full gap-6",
  transitionType = "full",
  whileInView = true,
}: TransitionProps) => {
  const initial = transitionType === "full"
    ? { opacity: 0, y: 20 }
    : { opacity: 0 };

  const target = transitionType === "full"
    ? { opacity: 1, y: 0 }
    : { opacity: 1 };

  return (
    <motion.div
      initial={initial}
      {...(whileInView ? { whileInView: target, viewport: { once: true, margin: "-15%" } } : { animate: target })}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Transition;
