import { useState } from "react";
import { type Product } from "@/lib/api/product";

type CheckoutItem = {
  productId: string;
  quantity: number;
  imageSrc?: string;
  imageAlt?: string;
  metadata?: {
    brand?: string;
    variant?: string;
    rating?: number;
    reviewCount?: string;
    [key: string]: string | number | undefined;
  };
};

type CheckoutResult = {
  success: boolean;
  url?: string;
  error?: string;
};

const useCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkout = async (items: CheckoutItem[], options?: { successUrl?: string; cancelUrl?: string }): Promise<CheckoutResult> => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const projectId = import.meta.env.VITE_PROJECT_ID;

    if (!apiUrl || !projectId) {
      const errorMsg = "VITE_API_URL or VITE_PROJECT_ID not configured";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/stripe/project/checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectId,
          items,
          successUrl: options?.successUrl || window.location.href,
          cancelUrl: options?.cancelUrl || window.location.href,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.message || `Request failed with status ${response.status}`;
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }

      const data = await response.json();

      if (data.data.url) {
        window.location.href = data.data.url;
      }

      return { success: true, url: data.data.url };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to create checkout session";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const buyNow = async (product: Product | string, quantity: number = 1): Promise<CheckoutResult> => {
    const successUrl = new URL(window.location.href);
    successUrl.searchParams.set("success", "true");

    if (typeof product === "string") {
      return checkout([{ productId: product, quantity }], { successUrl: successUrl.toString() });
    }

    let metadata: CheckoutItem["metadata"] = {};

    if (product.metadata && Object.keys(product.metadata).length > 0) {
      const { ...restMetadata } = product.metadata;
      metadata = restMetadata;
    } else {
      if (product.brand) metadata.brand = product.brand;
      if (product.variant) metadata.variant = product.variant;
      if (product.rating !== undefined) metadata.rating = product.rating;
      if (product.reviewCount) metadata.reviewCount = product.reviewCount;
    }

    return checkout(
      [
        {
          productId: product.id,
          quantity,
          imageSrc: product.imageSrc,
          imageAlt: product.imageAlt,
          metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
        },
      ],
      { successUrl: successUrl.toString() }
    );
  };

  const clearError = () => setError(null);

  return { checkout, buyNow, isLoading, error, clearError };
};

export default useCheckout;
export type { CheckoutItem, CheckoutResult };
