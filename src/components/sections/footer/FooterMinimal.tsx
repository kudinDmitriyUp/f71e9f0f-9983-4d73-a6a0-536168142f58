import type { LucideIcon } from "lucide-react";
import { useButtonClick } from "@/hooks/useButtonClick";
import AutoFillText from "@/components/ui/AutoFillText";
import { resolveIcon } from "@/utils/resolve-icon";

type SocialLink = {
  icon: string | LucideIcon;
  href?: string;
  onClick?: () => void;
};

const SocialLinkItem = ({ icon, href, onClick }: SocialLink) => {
  const Icon = resolveIcon(icon);
  const handleClick = useButtonClick(href, onClick);

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center size-10 rounded-full primary-button text-primary-cta-text cursor-pointer"
    >
      <Icon className="size-4" strokeWidth={1.5} />
    </button>
  );
};

const FooterMinimal = ({
  brand,
  copyright,
  socialLinks,
}: {
  brand: string;
  copyright: string;
  socialLinks?: SocialLink[];
}) => {
  return (
    <footer aria-label="Site footer" className="relative w-full py-20">
      <div className="flex flex-col w-content-width mx-auto px-10 pb-5 rounded-lg card">
        <AutoFillText className="font-medium" paddingY="py-5">{brand}</AutoFillText>

        <div className="h-px w-full mb-5 bg-foreground/50" />

        <div className="flex flex-col gap-3 items-center justify-between md:flex-row">
          <span className="text-base opacity-75">{copyright}</span>
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex items-center gap-3">
              {socialLinks.map((link, index) => (
                <SocialLinkItem key={index} icon={link.icon} href={link.href} onClick={link.onClick} />
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default FooterMinimal;
