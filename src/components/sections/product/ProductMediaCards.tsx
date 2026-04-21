import { ArrowUpRight, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import GridOrCarousel from "@/components/ui/GridOrCarousel";
import useProducts from "@/hooks/useProducts";

type ProductMediaCardsProps = {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  products?: {
    name: string;
    price: string;
    imageSrc: string;
    onClick?: () => void;
  }[];
};

const ProductMediaCards = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  products: productsProp,
}: ProductMediaCardsProps) => {
  const { products: fetchedProducts, isLoading } = useProducts();
  const isFromApi = fetchedProducts.length > 0;
  const products = isFromApi
    ? fetchedProducts.map((p) => ({
        name: p.name,
        price: p.price,
        imageSrc: p.imageSrc,
        onClick: p.onProductClick,
      }))
    : productsProp;

  if (isLoading && !productsProp) {
    return (
      <section aria-label="Products section" className="py-20">
        <div className="w-content-width mx-auto flex justify-center">
          <Loader2 className="size-8 animate-spin text-foreground" strokeWidth={1.5} />
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section aria-label="Products section" className="py-20">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center w-content-width mx-auto gap-3 md:gap-2">
          <span className="px-3 py-1 text-sm card rounded">{tag}</span>

          <TextAnimation
            text={title}
            variant="slide-up"
            tag="h2"
            className="text-6xl font-medium text-center text-balance"
          />

          <TextAnimation
            text={description}
            variant="slide-up"
            tag="p"
            className="md:max-w-6/10 text-lg leading-tight text-center"
          />

          {(primaryButton || secondaryButton) && (
            <div className="flex flex-wrap justify-center gap-3 mt-1 md:mt-2">
              {primaryButton && <Button text={primaryButton.text} href={primaryButton.href} variant="primary" animate />}
              {secondaryButton && <Button text={secondaryButton.text} href={secondaryButton.href} variant="secondary" animate delay={0.1} />}
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <GridOrCarousel carouselThreshold={3}>
            {products.map((product) => (
              <button
                key={product.name}
                onClick={product.onClick}
                className="group h-full flex flex-col gap-5 p-5 text-left card rounded cursor-pointer"
              >
                <div className="aspect-square rounded overflow-hidden">
                  <ImageOrVideo imageSrc={product.imageSrc} />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-medium truncate">{product.name}</h3>
                    <p className="text-2xl font-medium">{product.price}</p>
                  </div>

                  <div className="flex items-center justify-center size-10 shrink-0 rounded primary-button">
                    <ArrowUpRight className="size-4 text-primary-cta-text transition-transform duration-300 group-hover:rotate-45" strokeWidth={1.5} />
                  </div>
                </div>
              </button>
            ))}
          </GridOrCarousel>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductMediaCards;
