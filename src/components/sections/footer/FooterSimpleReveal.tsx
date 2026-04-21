import { useRef, useEffect, useState } from "react";
import { useButtonClick } from "@/hooks/useButtonClick";

type FooterColumn = {
  title: string;
  items: { label: string; href?: string; onClick?: () => void }[];
};

type FooterLink = {
  label: string;
  href?: string;
  onClick?: () => void;
};

const FooterLinkItem = ({ label, href, onClick }: FooterLink) => {
  const handleClick = useButtonClick(href, onClick);

  return (
    <button
      onClick={handleClick}
      className="text-base text-primary-cta-text hover:opacity-75 transition-opacity cursor-pointer"
    >
      {label}
    </button>
  );
};

const FooterBottomLink = ({ label, href, onClick }: FooterLink) => {
  const handleClick = useButtonClick(href, onClick);

  return (
    <button
      onClick={handleClick}
      className="text-sm opacity-50 hover:opacity-75 transition-opacity cursor-pointer"
    >
      {label}
    </button>
  );
};

const FooterSimpleReveal = ({
  brand,
  columns,
  copyright,
  links,
}: {
  brand: string;
  columns: FooterColumn[];
  copyright: string;
  links: FooterLink[];
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
          className="w-full py-15 primary-button text-primary-cta-text"
        >
          <div className="w-content-width mx-auto">
            <div className="flex flex-col md:flex-row gap-10 md:gap-0 justify-between items-start mb-10">
              <h2 className="text-4xl font-medium">{brand}</h2>

              <div className="w-full md:w-fit flex flex-wrap gap-y-10 md:gap-12">
                {columns.map((column) => (
                  <div key={column.title} className="w-1/2 md:w-auto flex flex-col items-start gap-3">
                    <h3 className="text-sm opacity-50">{column.title}</h3>
                    {column.items.map((item) => (
                      <FooterLinkItem key={item.label} label={item.label} href={item.href} onClick={item.onClick} />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-primary-cta-text/20">
              <span className="text-sm opacity-50">{copyright}</span>
              <div className="flex items-center gap-3">
                {links.map((link) => (
                  <FooterBottomLink key={link.label} label={link.label} href={link.href} onClick={link.onClick} />
                ))}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default FooterSimpleReveal;
