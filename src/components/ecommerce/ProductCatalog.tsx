import { Star, ArrowUpRight, Loader2 } from "lucide-react";
import { cls } from "@/lib/utils";
import ImageOrVideo from "@/components/ui/ImageOrVideo";
import useProducts from "@/hooks/useProducts";
import type { ProductVariant } from "./ProductDetailCard";

type CatalogProduct = {
  id: string;
  name: string;
  price: string;
  imageSrc: string;
  category?: string;
  rating?: number;
  reviewCount?: string;
  onClick?: () => void;
};

type ProductCatalogProps = {
  products?: CatalogProduct[];
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  filters?: ProductVariant[];
};

const ProductCatalog = ({ products: productsProp, searchValue = "", onSearchChange, filters }: ProductCatalogProps) => {
  const { products: fetchedProducts, isLoading } = useProducts();

  const products: CatalogProduct[] = productsProp && productsProp.length > 0
    ? productsProp
    : fetchedProducts.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        imageSrc: p.imageSrc,
        category: p.brand,
        rating: p.rating,
        reviewCount: p.reviewCount,
        onClick: p.onProductClick,
      }));

  if (isLoading && (!productsProp || productsProp.length === 0)) {
    return (
      <section className="mx-auto py-20 w-content-width">
        <div className="flex justify-center">
          <Loader2 className="size-8 text-foreground animate-spin" strokeWidth={1.5} />
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto py-20 w-content-width">
      {(onSearchChange || (filters && filters.length > 0)) && (
        <div className="flex flex-col gap-5 mb-5 md:flex-row md:items-end">
          {onSearchChange && (
            <div className="flex flex-1 flex-col gap-2 min-w-32">
              <label className="text-sm font-medium text-foreground">Search</label>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products..."
                className="card px-4 h-9 w-full md:w-80 text-base text-foreground bg-transparent rounded focus:outline-none"
              />
            </div>
          )}
          {filters && filters.length > 0 && (
            <div className="flex gap-5 items-end">
              {filters.map((filter) => (
                <div key={filter.label} className="flex flex-col gap-2 min-w-32">
                  <label className="text-sm font-medium text-foreground">{filter.label}</label>
                  <div className="secondary-button flex items-center px-3 h-9 rounded">
                    <select
                      value={filter.selected}
                      onChange={(e) => filter.onChange(e.target.value)}
                      className="w-full text-base text-secondary-cta-text bg-transparent cursor-pointer focus:outline-none"
                    >
                      {filter.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {products.length === 0 ? (
        <p className="py-20 text-center text-sm text-foreground/50">No products found</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={product.onClick}
              className="card group h-full flex flex-col gap-3 p-3 text-left rounded cursor-pointer"
            >
              <div className="relative aspect-square rounded overflow-hidden">
                <ImageOrVideo imageSrc={product.imageSrc} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 group-hover:bg-background/20 group-hover:backdrop-blur-xs">
                  <div className="primary-button flex items-center justify-center size-12 rounded-full opacity-0 scale-75 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
                    <ArrowUpRight className="size-5 text-primary-cta-text" strokeWidth={2} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {product.category && (
                  <span className="secondary-button w-fit px-2 py-0.5 text-sm text-secondary-cta-text rounded">{product.category}</span>
                )}
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-medium text-foreground truncate">{product.name}</h3>
                  {product.rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cls("size-4 text-accent", i < Math.floor(product.rating || 0) ? "fill-accent" : "opacity-20")}
                            strokeWidth={1.5}
                          />
                        ))}
                      </div>
                      {product.reviewCount && (
                        <span className="text-sm text-foreground">({product.reviewCount})</span>
                      )}
                    </div>
                  )}
                </div>
                <p className="text-2xl font-medium text-foreground">{product.price}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductCatalog;
export type { CatalogProduct };
