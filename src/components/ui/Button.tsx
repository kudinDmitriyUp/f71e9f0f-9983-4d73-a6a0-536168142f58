"use client";

import { motion } from "motion/react";
import { cls } from "@/lib/utils";
import { useButtonClick } from "@/hooks/useButtonClick";

interface ButtonProps {
  text: string;
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  animate?: boolean;
  animateImmediately?: boolean;
  delay?: number;
  className?: string;
}

const Button = ({ text, variant = "primary", href, onClick, animate = false, animateImmediately = false, delay = 0, className = "" }: ButtonProps) => {
  const handleClick = useButtonClick(href, onClick);

  const classes = cls(
    "flex items-center justify-center h-9 px-6 text-sm rounded cursor-pointer",
    variant === "primary" ? "primary-button text-primary-cta-text" : "secondary-button text-secondary-cta-text",
    className
  );

  const button = href
    ? <a href={href} onClick={handleClick} className={classes}>{text}</a>
    : <button onClick={handleClick} className={classes}>{text}</button>;

  if (animateImmediately) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
      >
        {button}
      </motion.div>
    );
  }

  if (!animate) return button;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {button}
    </motion.div>
  );
};

export default Button;
