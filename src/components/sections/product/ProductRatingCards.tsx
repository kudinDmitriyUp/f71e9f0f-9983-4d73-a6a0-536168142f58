import { Star, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { cls } from "@/lib/utils";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import GridOrCarousel from "@/components/ui/GridOrCarousel";
import useProducts from "@/hooks/useProducts";

type ProductRatingCardsProps = {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  products?: {
    brand: string;
    name: string;
    price: string;
    rating: number;
    reviewCount: string;
    imageSrc: string;
    onClick?: () => void;
  }[];
};

const ProductRatingCards = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  products: productsProp,
}: ProductRatingCardsProps) => {
  const { products: fetchedProducts, isLoading } = useProducts();
  const isFromApi = fetchedProducts.length > 0;
  const products = isFromApi
    ? fetchedProducts.map((p) => ({
        brand: p.brand || "",
        name: p.name,
        price: p.price,
        rating: p.rating || 0,
        reviewCount: p.reviewCount || "0",
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

                <div className="flex flex-col gap-2">
                  <span className="secondary-button w-fit px-2 py-0.5 text-sm text-secondary-cta-text rounded">{product.brand}</span>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-medium truncate">{product.name}</h3>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={cls(
                              "size-4 text-accent",
                              index < Math.floor(product.rating) ? "fill-accent" : "opacity-20"
                            )}
                            strokeWidth={1.5}
                          />
                        ))}
                      </div>
                      <span className="text-sm">({product.reviewCount})</span>
                    </div>
                  </div>

                  <p className="text-2xl font-medium">{product.price}</p>
                </div>
              </button>
            ))}
          </GridOrCarousel>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductRatingCards;
