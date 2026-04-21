import { useState } from "react";
import { Star } from "lucide-react";
import { cls } from "@/lib/utils";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import Button from "@/components/ui/Button";
import Transition from "@/components/ui/Transition";

type ProductVariant = {
  label: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
};

type ProductDetailCardProps = {
  name: string;
  price: string;
  salePrice?: string;
  images: string[];
  description?: string;
  rating?: number;
  ribbon?: string;
  inventoryStatus?: "in-stock" | "out-of-stock";
  inventoryQuantity?: number;
  sku?: string;
  variants?: ProductVariant[];
  quantity?: ProductVariant;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
};

const ProductDetailCard = ({ name, price, salePrice, images, description, rating = 0, ribbon, inventoryStatus, inventoryQuantity, sku, variants, quantity, onAddToCart, onBuyNow }: ProductDetailCardProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <section className="mx-auto py-20 w-content-width">
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="relative md:w-1/2">
          <Transition key={selectedImage} className="card aspect-square overflow-hidden rounded" transitionType="fade" whileInView={false}>
            <ImageOrVideo imageSrc={images[selectedImage]} className="size-full object-cover" />
          </Transition>
          {images.length > 1 && (
            <div className="absolute right-3 top-0 bottom-0 flex flex-col gap-3 py-3 overflow-y-auto mask-fade-y">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className="group card relative shrink-0 size-16 overflow-hidden rounded cursor-pointer"
                >
                  <ImageOrVideo imageSrc={src} className="size-full object-cover transition-transform duration-300 group-hover:scale-110" />
                  <div className={cls(
                    "absolute top-1 right-1 primary-button size-3 rounded-full transition-transform duration-300",
                    selectedImage === i ? "scale-100" : "scale-0 group-hover:scale-100"
                  )} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="card flex flex-col gap-5 p-5 md:w-1/2 rounded">
          <div className="flex items-start justify-between gap-5">
            <h2 className="flex-1 text-2xl font-medium text-foreground md:text-3xl">{name}</h2>
            {ribbon && <span className="secondary-button shrink-0 px-3 py-1 text-sm font-medium rounded text-secondary-cta-text">{ribbon}</span>}
          </div>
          <div className="h-px w-full bg-foreground/10" />
          <div className="flex items-center justify-between">
            <p className="text-xl font-medium text-foreground md:text-2xl">
              {salePrice ? (
                <>
                  <span className="text-foreground/75 line-through mr-1">{price}</span>
                  <span>{salePrice}</span>
                </>
              ) : (
                price
              )}
            </p>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cls("size-5 text-accent", i < Math.floor(rating) ? "fill-accent" : "opacity-20")} strokeWidth={1.5} />
              ))}
            </div>
          </div>
          {(inventoryStatus || inventoryQuantity || sku) && (
            <div className="flex flex-wrap gap-3 text-sm">
              {inventoryStatus && (
                <span className="secondary-button px-2 py-1 rounded text-secondary-cta-text">
                  {inventoryStatus === "in-stock" ? "In Stock" : "Out of Stock"}
                </span>
              )}
              {inventoryQuantity && (
                <span className="secondary-button px-2 py-1 rounded text-secondary-cta-text">{inventoryQuantity} available</span>
              )}
              {sku && <span className="secondary-button px-2 py-1 rounded text-secondary-cta-text">SKU: {sku}</span>}
            </div>
          )}
          {description && <p className="text-sm text-foreground/75 md:text-base">{description}</p>}
          {variants && variants.length > 0 && (
            <div className="flex flex-wrap gap-5">
              {variants.map((variant) => (
                <div key={variant.label} className="flex flex-1 flex-col gap-2 min-w-32">
                  <label className="text-sm font-medium text-foreground">{variant.label}</label>
                  <div className="secondary-button flex items-center px-3 h-9 rounded">
                    <select value={variant.selected} onChange={(e) => variant.onChange(e.target.value)} className="w-full text-base text-secondary-cta-text bg-transparent cursor-pointer focus:outline-none">
                      {variant.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
          {quantity && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-foreground">{quantity.label}</label>
              <div className="secondary-button flex items-center px-3 h-9 w-24 rounded">
                <select value={quantity.selected} onChange={(e) => quantity.onChange(e.target.value)} className="w-full text-base text-secondary-cta-text bg-transparent cursor-pointer focus:outline-none">
                  {quantity.options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <div className="flex flex-col mt-auto gap-3 pt-5">
            <Button text="Add To Cart" onClick={onAddToCart} variant="primary" className="w-full" />
            <Button text="Buy Now" onClick={onBuyNow} variant="secondary" className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailCard;
export type { ProductVariant };
