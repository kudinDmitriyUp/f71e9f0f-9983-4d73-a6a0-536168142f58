import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import { cls } from "@/lib/utils";

type KpiItem = {
  value: string;
  label: string;
};

type HeroSplitKpiProps = {
  tag: string;
  title: string;
  description: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
  kpis: [KpiItem, KpiItem, KpiItem];
} & ({ imageSrc: string; videoSrc?: never } | { videoSrc: string; imageSrc?: never });

const KPI_POSITIONS = ["top-[5%] left-0", "top-[40%] right-0", "bottom-[5%] left-[5%]"];

const HeroSplitKpi = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  imageSrc,
  videoSrc,
  kpis,
}: HeroSplitKpiProps) => {
  const kpiRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    let mouseX = 0;
    let mouseY = 0;
    const offsets = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }];
    const multipliers = [-0.25, -0.5, 0.25];
    let animationId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 100 - 50;
      mouseY = (e.clientY / window.innerHeight) * 100 - 50;
    };

    const animate = () => {
      offsets.forEach((offset, i) => {
        offset.x += ((mouseX * multipliers[i]) - offset.x) * 0.025;
        offset.y += ((mouseY * multipliers[i]) - offset.y) * 0.025;

        const el = kpiRefs.current[i];
        if (el) el.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
      });
      animationId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section aria-label="Hero section" className="flex items-center h-fit md:h-svh pt-25 pb-20 md:py-0">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-20 w-content-width mx-auto">
        <div className="w-full md:w-1/2">
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="px-3 py-1 mb-2 text-sm card rounded">{tag}</span>

            <TextAnimation
              text={title}
              variant="fade"
              tag="h1"
              className="text-7xl 2xl:text-8xl font-medium text-center md:text-left text-balance"
            />

            <TextAnimation
              text={description}
              variant="fade"
              tag="p"
              className="max-w-8/10 text-lg md:text-xl leading-tight text-center md:text-left"
            />

            <div className="flex flex-wrap max-md:justify-center gap-3 mt-2">
              <Button text={primaryButton.text} href={primaryButton.href} variant="primary" animate />
              <Button text={secondaryButton.text} href={secondaryButton.href} variant="secondary" animate delay={0.1} />
            </div>
          </div>
        </div>

        <div className="relative w-full md:w-1/2 h-100 md:h-[65vh] md:max-h-[75svh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="w-full h-full p-3 card rounded overflow-hidden scale-80"
          >
            <ImageOrVideo imageSrc={imageSrc} videoSrc={videoSrc} />
          </motion.div>

          {kpis.map((kpi, index) => (
            <motion.div
              key={index}
              ref={(el) => { kpiRefs.current[index] = el; }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 + index * 0.1 }}
              className={cls(
                "absolute flex flex-col items-center p-3 md:p-5 card backdrop-blur-sm rounded",
                KPI_POSITIONS[index]
              )}
            >
              <p className="text-2xl md:text-4xl font-medium">{kpi.value}</p>
              <p className="text-sm md:text-base text-foreground/70">{kpi.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSplitKpi;
