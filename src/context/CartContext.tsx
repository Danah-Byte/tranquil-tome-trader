import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Book } from "@/data/books";

export type CartItem = { book: Book; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (book: Book) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "tranquil_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const value = useMemo<CartCtx>(() => {
    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce((s, i) => s + i.qty * i.book.price, 0);
    return {
      items,
      count,
      total,
      add: (book) =>
        setItems((prev) => {
          const found = prev.find((p) => p.book.id === book.id);
          if (found) return prev.map((p) => (p.book.id === book.id ? { ...p, qty: p.qty + 1 } : p));
          return [...prev, { book, qty: 1 }];
        }),
      remove: (id) => setItems((prev) => prev.filter((p) => p.book.id !== id)),
      setQty: (id, qty) =>
        setItems((prev) =>
          qty <= 0 ? prev.filter((p) => p.book.id !== id) : prev.map((p) => (p.book.id === id ? { ...p, qty } : p)),
        ),
      clear: () => setItems([]),
    };
  }, [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
