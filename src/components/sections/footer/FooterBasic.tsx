import { useButtonClick } from "@/hooks/useButtonClick";

type FooterLink = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type FooterColumn = {
  title: string;
  items: FooterLink[];
};

const FooterLinkItem = ({ label, href, onClick }: FooterLink) => {
  const handleClick = useButtonClick(href, onClick);

  return (
    <button
      onClick={handleClick}
      className="text-base hover:opacity-75 transition-opacity cursor-pointer"
    >
      {label}
    </button>
  );
};

const FooterBasic = ({
  columns,
  leftText,
  rightText,
}: {
  columns: FooterColumn[];
  leftText: string;
  rightText: string;
}) => {
  return (
    <footer aria-label="Site footer" className="w-full pt-20 pb-10">
      <div className="w-content-width mx-auto">
        <div className="w-full flex flex-wrap justify-between gap-y-10 mb-10">
          {columns.map((column) => (
            <div key={column.title} className="w-1/2 md:w-auto flex flex-col items-start gap-3">
              <h3 className="text-sm opacity-50">{column.title}</h3>
              {column.items.map((item) => (
                <FooterLinkItem key={item.label} label={item.label} href={item.href} onClick={item.onClick} />
              ))}
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-foreground/20" />

        <div className="w-full flex items-center justify-between pt-5">
          <span className="text-sm opacity-50">{leftText}</span>
          <span className="text-sm opacity-50">{rightText}</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterBasic;
