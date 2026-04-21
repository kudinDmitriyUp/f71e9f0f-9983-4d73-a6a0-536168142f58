import { useState } from "react";
import { Plus, Minus, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import Button from "@/components/ui/Button";
import TextAnimation from "@/components/ui/TextAnimation";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import GridOrCarousel from "@/components/ui/GridOrCarousel";
import useProducts from "@/hooks/useProducts";

type ProductQuantityCardsProps = {
  tag: string;
  title: string;
  description: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  products?: {
    name: string;
    price: string;
    imageSrc: string;
    onAddToCart?: (quantity: number) => void;
  }[];
};

const ProductQuantityCards = ({
  tag,
  title,
  description,
  primaryButton,
  secondaryButton,
  products: productsProp,
}: ProductQuantityCardsProps) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { products: fetchedProducts, isLoading } = useProducts();
  const isFromApi = fetchedProducts.length > 0;
  const products = isFromApi
    ? fetchedProducts.map((p) => ({
        name: p.name,
        price: p.price,
        imageSrc: p.imageSrc,
        onAddToCart: undefined as ((quantity: number) => void) | undefined,
      }))
    : productsProp;

  const getQuantity = (name: string) => quantities[name] || 1;

  const handleIncrement = (name: string) => {
    setQuantities((prev) => ({ ...prev, [name]: (prev[name] || 1) + 1 }));
  };

  const handleDecrement = (name: string) => {
    setQuantities((prev) => ({ ...prev, [name]: Math.max(1, (prev[name] || 1) - 1) }));
  };

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
              <div
                key={product.name}
                className="h-full flex flex-col gap-5 p-5 card rounded"
              >
                <div className="aspect-square rounded overflow-hidden">
                  <ImageOrVideo imageSrc={product.imageSrc} />
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-medium truncate">{product.name}</h3>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrement(product.name)}
                        className="flex items-center justify-center size-8 rounded card cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="size-4" strokeWidth={1.5} />
                      </button>

                      <span className="w-fit text-base text-center font-medium">{getQuantity(product.name)}</span>

                      <button
                        onClick={() => handleIncrement(product.name)}
                        className="flex items-center justify-center size-8 rounded card cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="size-4" strokeWidth={1.5} />
                      </button>
                    </div>

                    <button
                      onClick={() => product.onAddToCart?.(getQuantity(product.name))}
                      className="h-8 px-5 rounded primary-button text-base text-primary-cta-text font-medium cursor-pointer"
                    >
                      {product.price}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </GridOrCarousel>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductQuantityCards;
