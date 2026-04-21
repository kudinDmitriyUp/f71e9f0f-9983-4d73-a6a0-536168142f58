import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Plus, ArrowRight } from "lucide-react";
import { cls } from "@/lib/utils";
import Button from "@/components/ui/Button";

interface NavbarCenteredProps {
  logo: string;
  navItems: { name: string; href: string }[];
  ctaButton: { text: string; href: string };
}

const NavLink = ({
  href,
  onClick,
  className,
  children,
}: {
  href: string;
  onClick?: (e: React.MouseEvent) => void;
  className: string;
  children: React.ReactNode;
}) => {
  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          const element = document.getElementById(href.slice(1));
          element?.scrollIntoView({ behavior: "smooth", block: "start" });
          onClick?.(e);
        }}
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link to={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
};

const NavbarCentered = ({ logo, navItems, ctaButton }: NavbarCenteredProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cls(
          "fixed z-1000 top-0 left-0 w-full transition-all duration-500 ease-in-out",
          isScrolled ? "h-15 bg-background/80 backdrop-blur-sm" : "h-20 bg-background/0 backdrop-blur-0"
        )}
      >
        <div className="relative flex items-center justify-between h-full w-content-width mx-auto">
          <Link to="/" className="text-xl font-medium text-foreground">{logo}</Link>

          <div className="hidden md:flex absolute left-1/2 items-center gap-6 -translate-x-1/2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                href={item.href}
                className="text-base text-foreground hover:opacity-70 transition-opacity"
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:block">
            <Button text={ctaButton.text} href={ctaButton.href} variant="primary" />
          </div>

          <button
            className="flex md:hidden items-center justify-center shrink-0 h-8 w-8 bg-foreground rounded cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <Plus
              className={cls("w-1/2 h-1/2 text-background transition-transform duration-300", menuOpen ? "rotate-45" : "rotate-0")}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-135%" }}
            animate={{ y: 0 }}
            exit={{ y: "-135%" }}
            transition={{ type: "spring", damping: 26, stiffness: 170 }}
            className="md:hidden fixed z-1000 top-3 left-3 right-3 p-6 card rounded"
          >
            <div className="flex items-center justify-between mb-6">
              <p className="text-xl text-foreground">Menu</p>
              <button
                className="flex items-center justify-center shrink-0 h-8 w-8 bg-foreground rounded cursor-pointer"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <Plus className="w-1/2 h-1/2 text-background rotate-45" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <div key={item.name}>
                  <NavLink
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-base font-medium text-foreground"
                  >
                    {item.name}
                    <ArrowRight className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                  </NavLink>
                  {index < navItems.length - 1 && (
                    <div className="h-px bg-linear-to-r from-transparent via-foreground/20 to-transparent" />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button text={ctaButton.text} href={ctaButton.href} variant="primary" className="w-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarCentered;
