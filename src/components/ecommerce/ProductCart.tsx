import { useEffect } from "react";
import { X, Plus, Minus, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Button from "@/components/ui/Button";
import ImageOrVideo from "@/components/ui/ImageOrVideo";

type CartItem = {
  id: string;
  name: string;
  price: string;
  quantity: number;
  imageSrc: string;
};

type ProductCartProps = {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: string;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  onCheckout?: () => void;
};

const ProductCart = ({ isOpen, onClose, items, total, onQuantityChange, onRemove, onCheckout }: ProductCartProps) => {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-1001">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute inset-0 bg-foreground/50"
            onClick={onClose}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="card absolute right-0 top-0 flex flex-col p-5 h-screen w-screen md:w-96"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-medium text-foreground">Cart ({items.length})</h2>
              <button onClick={onClose} className="card flex items-center justify-center size-8 rounded cursor-pointer" aria-label="Close cart">
                <X className="size-4 text-foreground" strokeWidth={1.5} />
              </button>
            </div>

            <div className="mt-5 h-px w-full bg-foreground/10" />

            <div className="flex-1 py-5 min-h-0 overflow-y-auto">
              {items.length === 0 ? (
                <p className="py-20 text-center text-sm text-foreground/50">Your cart is empty</p>
              ) : (
                <div className="flex flex-col gap-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="shrink-0 size-24 overflow-hidden rounded">
                        <ImageOrVideo imageSrc={item.imageSrc} className="size-full object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col justify-between min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-base font-medium text-foreground truncate">{item.name}</h3>
                          <p className="shrink-0 text-base font-medium text-foreground">{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => item.quantity > 1 && onQuantityChange?.(item.id, item.quantity - 1)}
                            className="card flex items-center justify-center size-8 rounded cursor-pointer"
                          >
                            <Minus className="size-4 text-foreground" strokeWidth={1.5} />
                          </button>
                          <span className="min-w-5 text-center text-sm font-medium text-foreground">{item.quantity}</span>
                          <button
                            onClick={() => onQuantityChange?.(item.id, item.quantity + 1)}
                            className="card flex items-center justify-center size-8 rounded cursor-pointer"
                          >
                            <Plus className="size-4 text-foreground" strokeWidth={1.5} />
                          </button>
                          <button
                            onClick={() => onRemove?.(item.id)}
                            className="card flex items-center justify-center ml-auto size-8 rounded cursor-pointer"
                          >
                            <Trash2 className="size-4 text-foreground" strokeWidth={1.5} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-5">
              <div className="h-px w-full bg-foreground/10" />
              <div className="flex items-center justify-between">
                <span className="text-base font-medium text-foreground">Total</span>
                <span className="text-base font-medium text-foreground">{total}</span>
              </div>
              <Button text="Checkout" onClick={onCheckout} variant="primary" className="w-full" />
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductCart;
export type { CartItem };
