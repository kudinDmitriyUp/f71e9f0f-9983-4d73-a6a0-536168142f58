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

const FooterBrand = ({
  brand,
  columns,
}: {
  brand: string;
  columns: FooterColumn[];
}) => {
  return (
    <footer
      aria-label="Site footer"
      className="w-full py-15 mt-20 rounded-t-lg overflow-hidden primary-button text-primary-cta-text"
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
  );
};

export default FooterBrand;
