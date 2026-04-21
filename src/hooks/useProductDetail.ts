import { useState, useMemo, useCallback } from "react";
import useProduct from "./useProduct";
import type { ExtendedCartItem } from "./useCart";

type ProductImage = {
  src: string;
  alt: string;
};

type ProductMeta = {
  salePrice?: string;
  ribbon?: string;
  inventoryStatus?: string;
  inventoryQuantity?: number;
  sku?: string;
};

type ProductVariant = {
  label: string;
  options: string[];
  selected: string;
  onChange: (value: string) => void;
};

const useProductDetail = (productId: string) => {
  const { product, isLoading, error } = useProduct(productId);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const images = useMemo<ProductImage[]>(() => {
    if (!product) return [];

    if (product.images && product.images.length > 0) {
      return product.images.map((src, index) => ({
        src,
        alt: product.imageAlt || `${product.name} - Image ${index + 1}`,
      }));
    }
    return [
      {
        src: product.imageSrc,
        alt: product.imageAlt || product.name,
      },
    ];
  }, [product]);

  const meta = useMemo<ProductMeta>(() => {
    if (!product?.metadata) return {};

    const metadata = product.metadata;

    let salePrice: string | undefined;
    const onSaleValue = metadata.onSale;
    const onSale =
      String(onSaleValue) === "true" || onSaleValue === 1 || String(onSaleValue) === "1";
    const salePriceValue = metadata.salePrice;

    if (onSale && salePriceValue !== undefined && salePriceValue !== null) {
      if (typeof salePriceValue === "number") {
        salePrice = `$${salePriceValue.toFixed(2)}`;
      } else {
        const salePriceStr = String(salePriceValue);
        salePrice = salePriceStr.startsWith("$") ? salePriceStr : `$${salePriceStr}`;
      }
    }

    let inventoryQuantity: number | undefined;
    if (metadata.inventoryQuantity !== undefined) {
      const qty = metadata.inventoryQuantity;
      inventoryQuantity = typeof qty === "number" ? qty : parseInt(String(qty), 10);
    }

    return {
      salePrice,
      ribbon: metadata.ribbon ? String(metadata.ribbon) : undefined,
      inventoryStatus: metadata.inventoryStatus ? String(metadata.inventoryStatus) : undefined,
      inventoryQuantity,
      sku: metadata.sku ? String(metadata.sku) : undefined,
    };
  }, [product]);

  const variants = useMemo<ProductVariant[]>(() => {
    if (!product) return [];

    const variantList: ProductVariant[] = [];

    if (product.metadata?.variantOptions) {
      try {
        const variantOptionsStr = String(product.metadata.variantOptions);
        const parsedOptions = JSON.parse(variantOptionsStr);

        if (Array.isArray(parsedOptions)) {
          parsedOptions.forEach((option: { name?: string; values?: string | string[] }) => {
            if (option.name && option.values) {
              const values =
                typeof option.values === "string"
                  ? option.values.split(",").map((v: string) => v.trim())
                  : Array.isArray(option.values)
                    ? option.values.map((v) => String(v).trim())
                    : [String(option.values)];

              if (values.length > 0) {
                const optionLabel = option.name;
                const currentSelected = selectedVariants[optionLabel] || values[0];

                variantList.push({
                  label: optionLabel,
                  options: values,
                  selected: currentSelected,
                  onChange: (value) => {
                    setSelectedVariants((prev) => ({
                      ...prev,
                      [optionLabel]: value,
                    }));
                  },
                });
              }
            }
          });
        }
      } catch {
        // Failed to parse variantOptions
      }
    }

    if (variantList.length === 0 && product.brand) {
      variantList.push({
        label: "Brand",
        options: [product.brand],
        selected: product.brand,
        onChange: () => {},
      });
    }

    if (variantList.length === 0 && product.variant) {
      const variantOptions = product.variant.includes("/")
        ? product.variant.split("/").map((v) => v.trim())
        : [product.variant];

      const variantLabel = "Variant";
      const currentSelected = selectedVariants[variantLabel] || variantOptions[0];

      variantList.push({
        label: variantLabel,
        options: variantOptions,
        selected: currentSelected,
        onChange: (value) => {
          setSelectedVariants((prev) => ({
            ...prev,
            [variantLabel]: value,
          }));
        },
      });
    }

    return variantList;
  }, [product, selectedVariants]);

  const quantityVariant = useMemo<ProductVariant>(
    () => ({
      label: "Quantity",
      options: Array.from({ length: 10 }, (_, i) => String(i + 1)),
      selected: String(selectedQuantity),
      onChange: (value) => setSelectedQuantity(parseInt(value, 10)),
    }),
    [selectedQuantity]
  );

  const createCartItem = useCallback((): ExtendedCartItem | null => {
    if (!product) return null;

    const variantStrings = Object.entries(selectedVariants).map(
      ([label, value]) => `${label}: ${value}`
    );

    if (variantStrings.length === 0 && product.variant) {
      variantStrings.push(`Variant: ${product.variant}`);
    }

    const variantId = Object.values(selectedVariants).join("-") || "default";

    return {
      id: `${product.id}-${variantId}-${selectedQuantity}`,
      productId: product.id,
      name: product.name,
      variants: variantStrings,
      price: product.price,
      quantity: selectedQuantity,
      imageSrc: product.imageSrc,
      imageAlt: product.imageAlt || product.name,
    };
  }, [product, selectedVariants, selectedQuantity]);

  return {
    product,
    isLoading,
    error,
    images,
    meta,
    variants,
    quantityVariant,
    selectedQuantity,
    selectedVariants,
    createCartItem,
  };
};

export default useProductDetail;
export type { ProductImage, ProductMeta, ProductVariant };
