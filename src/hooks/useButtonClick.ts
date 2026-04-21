import { useNavigate, useLocation } from "react-router-dom";

export const useButtonClick = (href?: string, onClick?: () => void) => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToElement = (sectionId: string, delay: number = 100) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, delay);
  };

  const handleClick = () => {
    if (href) {
      const isExternalLink = /^(https?:\/\/|www\.)/.test(href);

      if (isExternalLink) {
        window.open(
          href.startsWith("www.") ? `https://${href}` : href,
          "_blank",
          "noopener,noreferrer"
        );
      } else if (href.startsWith("/")) {
        const [path, hash] = href.split("#");

        if (path !== location.pathname) {
          navigate(path);
          if (hash) {
            setTimeout(() => {
              window.location.hash = hash;
              scrollToElement(hash, 100);
            }, 100);
          }
        } else if (hash) {
          window.location.hash = hash;
          scrollToElement(hash, 50);
        }
      } else if (href.startsWith("#")) {
        scrollToElement(href.slice(1), 50);
      } else {
        scrollToElement(href, 50);
      }
    }
    onClick?.();
  };

  return handleClick;
};
