import { useRef, useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useButtonClick } from "@/hooks/useButtonClick";
import AutoFillText from "@/components/ui/AutoFillText";
import { cls } from "@/lib/utils";

type FooterLink = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type FooterColumn = {
  items: FooterLink[];
};

const FooterLinkItem = ({ label, href, onClick }: FooterLink) => {
  const handleClick = useButtonClick(href, onClick);

  return (
    <div className="flex items-center gap-2 text-base">
      <ChevronRight className="size-4" strokeWidth={3} aria-hidden="true" />
      <button
        onClick={handleClick}
        className="text-base text-primary-cta-text font-medium hover:opacity-75 transition-opacity cursor-pointer"
      >
        {label}
      </button>
    </div>
  );
};

const FooterBrandReveal = ({
  brand,
  columns,
}: {
  brand: string;
  columns: FooterColumn[];
}) => {
  const footerRef = useRef<HTMLDivElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    if (footerRef.current) {
      resizeObserver.observe(footerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section
      className="relative z-0 w-full mt-20"
      style={{
        height: footerHeight ? `${footerHeight}px` : "auto",
        clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)",
      }}
    >
      <div
        className="fixed bottom-0 w-full"
        style={{ height: footerHeight ? `${footerHeight}px` : "auto" }}
      >
        <footer
          ref={footerRef}
          aria-label="Site footer"
          className="w-full py-15 rounded-t-lg overflow-hidden primary-button text-primary-cta-text"
        >
          <div className="w-content-width mx-auto flex flex-col gap-10 md:gap-20">
            <AutoFillText className="font-medium">{brand}</AutoFillText>

            <div
              className={cls(
                "flex flex-col gap-8 mb-10 md:flex-row",
                columns.length === 1 ? "md:justify-center" : "md:justify-between"
              )}
            >
              {columns.map((column, index) => (
                <div key={index} className="flex flex-col items-start gap-3">
                  {column.items.map((item) => (
                    <FooterLinkItem key={item.label} label={item.label} href={item.href} onClick={item.onClick} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default FooterBrandReveal;
