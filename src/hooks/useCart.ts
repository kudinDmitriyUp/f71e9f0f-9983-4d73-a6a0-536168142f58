import { useState, useEffect, useCallback, useMemo } from "react";

type CartItem = {
  id: string;
  name: string;
  variants?: string[];
  price: string;
  quantity: number;
  imageSrc: string;
  imageAlt?: string;
};

type ExtendedCartItem = CartItem & {
  productId: string;
};

const CART_STORAGE_KEY = "shop_cart_items";

const saveCartToStorage = (items: ExtendedCartItem[]) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {}
};

const loadCartFromStorage = (): ExtendedCartItem[] => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {}
  return [];
};

const clearCartFromStorage = () => {
  try {
    localStorage.removeItem(CART_STORAGE_KEY);
  } catch {}
};

const useCart = () => {
  const [cartItems, setCartItems] = useState<ExtendedCartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("success");
    const sessionId = urlParams.get("session_id");

    if (success === "true" || sessionId) {
      clearCartFromStorage();
      setCartItems([]);

      const url = new URL(window.location.href);
      url.searchParams.delete("success");
      url.searchParams.delete("session_id");
      window.history.replaceState({}, "", url.pathname + url.search);
    } else {
      const loadedItems = loadCartFromStorage();
      if (loadedItems.length > 0) {
        setCartItems(loadedItems);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("success");
    const sessionId = urlParams.get("session_id");
    if (success === "true" || sessionId) return;

    if (cartItems.length > 0) {
      saveCartToStorage(cartItems);
    } else {
      clearCartFromStorage();
    }
  }, [cartItems]);

  const addItem = useCallback((item: ExtendedCartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    clearCartFromStorage();
  }, []);

  const total = useMemo(() => {
    return cartItems
      .reduce(
        (sum, item) =>
          sum + parseFloat(item.price.replace("$", "").replace(",", "")) * item.quantity,
        0
      )
      .toFixed(2);
  }, [cartItems]);

  const itemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const getCheckoutItems = useCallback(() => {
    return cartItems.map((item) => {
      const metadata: Record<string, string> = {};
      if (item.variants && item.variants.length > 0) {
        item.variants.forEach((variant) => {
          const [key, value] = variant.split(":").map((s) => s.trim());
          if (key && value) {
            metadata[key.toLowerCase()] = value;
          }
        });
      }

      return {
        productId: item.productId,
        quantity: item.quantity,
        imageSrc: item.imageSrc,
        imageAlt: item.imageAlt,
        metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
      };
    });
  }, [cartItems]);

  return {
    items: cartItems,
    isOpen,
    setIsOpen,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    total,
    itemCount,
    getCheckoutItems,
  };
};

export default useCart;
export type { CartItem, ExtendedCartItem };
