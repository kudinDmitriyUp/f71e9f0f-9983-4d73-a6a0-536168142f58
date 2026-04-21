type Product = {
  id: string;
  name: string;
  price: string;
  imageSrc: string;
  imageAlt?: string;
  images?: string[];
  brand?: string;
  variant?: string;
  rating?: number;
  reviewCount?: string;
  description?: string;
  priceId?: string;
  metadata?: Record<string, string | number | undefined>;
  onFavorite?: () => void;
  onProductClick?: () => void;
  isFavorited?: boolean;
};

const defaultProducts: Product[] = [
  {
    id: "1",
    name: "Classic White Sneakers",
    price: "$129",
    brand: "Nike",
    variant: "White / Size 42",
    rating: 4.5,
    reviewCount: "128",
    imageSrc: "/placeholders/placeholder-1.webp",
    imageAlt: "Classic white sneakers",
  },
  {
    id: "2",
    name: "Leather Crossbody Bag",
    price: "$89",
    brand: "Coach",
    variant: "Brown / Medium",
    rating: 4.8,
    reviewCount: "256",
    imageSrc: "/placeholders/placeholder-2.webp",
    imageAlt: "Brown leather crossbody bag",
  },
  {
    id: "3",
    name: "Wireless Headphones",
    price: "$199",
    brand: "Sony",
    variant: "Black",
    rating: 4.7,
    reviewCount: "512",
    imageSrc: "/placeholders/placeholder-3.webp",
    imageAlt: "Black wireless headphones",
  },
  {
    id: "4",
    name: "Minimalist Watch",
    price: "$249",
    brand: "Fossil",
    variant: "Silver / 40mm",
    rating: 4.6,
    reviewCount: "89",
    imageSrc: "/placeholders/placeholder-1.webp",
    imageAlt: "Silver minimalist watch",
  },
];

const formatPrice = (amount: number, currency: string): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount / 100);
};

const fetchProducts = async (): Promise<Product[]> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const projectId = import.meta.env.VITE_PROJECT_ID;

  if (!apiUrl || !projectId) {
    return [];
  }

  try {
    const url = `${apiUrl}/stripe/project/products?projectId=${projectId}&expandDefaultPrice=true`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    const resp = await response.json();
    const data = resp.data.data || resp.data;

    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    return data.map((product: Record<string, unknown>) => {
      const metadata: Record<string, string | number | undefined> = {};
      const productMetadata = product.metadata as Record<string, unknown> | undefined;
      if (productMetadata && typeof productMetadata === "object") {
        Object.keys(productMetadata).forEach((key) => {
          const value = productMetadata[key];
          if (value !== null && value !== undefined) {
            const numValue = parseFloat(String(value));
            metadata[key] = isNaN(numValue) ? String(value) : numValue;
          }
        });
      }

      const images = product.images as string[] | undefined;
      const imageSrc = images?.[0] || (product.imageSrc as string) || "/placeholders/placeholder-1.webp";
      const imageAlt = (product.imageAlt as string) || (product.name as string) || "";
      const finalImages = images && Array.isArray(images) && images.length > 0 ? images : [imageSrc];

      const defaultPrice = product.default_price as Record<string, unknown> | undefined;

      return {
        id: (product.id as string) || String(Math.random()),
        name: (product.name as string) || "Untitled Product",
        description: (product.description as string) || "",
        price: defaultPrice?.unit_amount
          ? formatPrice(defaultPrice.unit_amount as number, (defaultPrice.currency as string) || "usd")
          : (product.price as string) || "$0",
        priceId: (defaultPrice?.id as string) || (product.priceId as string),
        imageSrc,
        imageAlt,
        images: finalImages,
        brand: (productMetadata?.brand as string) || (product.brand as string) || "",
        variant: (productMetadata?.variant as string) || (product.variant as string) || "",
        rating: productMetadata?.rating ? parseFloat(String(productMetadata.rating)) : undefined,
        reviewCount: (productMetadata?.reviewCount as string) || undefined,
        metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
      };
    });
  } catch {
    return [];
  }
};

const fetchProduct = async (productId: string): Promise<Product | null> => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const projectId = import.meta.env.VITE_PROJECT_ID;

  if (!apiUrl || !projectId) {
    return null;
  }

  try {
    const url = `${apiUrl}/stripe/project/products/${productId}?projectId=${projectId}&expandDefaultPrice=true`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }

    const resp = await response.json();
    const product = resp.data?.data || resp.data || resp;

    if (!product || typeof product !== "object") {
      return null;
    }

    const metadata: Record<string, string | number | undefined> = {};
    const productMetadata = product.metadata as Record<string, unknown> | undefined;
    if (productMetadata && typeof productMetadata === "object") {
      Object.keys(productMetadata).forEach((key) => {
        const value = productMetadata[key];
        if (value !== null && value !== undefined && value !== "") {
          const numValue = parseFloat(String(value));
          metadata[key] = isNaN(numValue) ? String(value) : numValue;
        }
      });
    }

    const defaultPrice = product.default_price as Record<string, unknown> | undefined;
    let priceValue = product.price as string | undefined;
    if (!priceValue && defaultPrice?.unit_amount) {
      priceValue = formatPrice(defaultPrice.unit_amount as number, (defaultPrice.currency as string) || "usd");
    }
    if (!priceValue) {
      priceValue = "$0";
    }

    const images = product.images as string[] | undefined;
    const imageSrc = images?.[0] || (product.imageSrc as string) || "/placeholders/placeholder-1.webp";
    const imageAlt = (product.imageAlt as string) || (product.name as string) || "";
    const finalImages = images && Array.isArray(images) && images.length > 0 ? images : [imageSrc];

    return {
      id: (product.id as string) || String(Math.random()),
      name: (product.name as string) || "Untitled Product",
      description: (product.description as string) || "",
      price: priceValue,
      priceId: (defaultPrice?.id as string) || (product.priceId as string),
      imageSrc,
      imageAlt,
      images: finalImages,
      brand: (productMetadata?.brand as string) || (product.brand as string) || "",
      variant: (productMetadata?.variant as string) || (product.variant as string) || "",
      rating: productMetadata?.rating ? parseFloat(String(productMetadata.rating)) : undefined,
      reviewCount: (productMetadata?.reviewCount as string) || undefined,
      metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
    };
  } catch {
    return null;
  }
};

export { fetchProducts, fetchProduct, defaultProducts, formatPrice, type Product };
