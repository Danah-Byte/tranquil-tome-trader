import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Your cart — Tranquil Pages" }] }),
});

function CartPage() {
  const { items, setQty, remove, total } = useCart();
  const { t, lang } = useI18n();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-serif text-3xl">{t("cart.empty.title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("cart.empty.sub")}</p>
        <Link
          to="/shop"
          search={{ q: undefined, category: undefined }}
          className="mt-8 inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {t("cart.empty.cta")}
        </Link>
      </div>
    );
  }

  const shipping = total > 200 ? 0 : 25;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-serif text-3xl md:text-4xl">{t("cart.title")}</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px]">
        <ul className="divide-y divide-border rounded-lg border border-border bg-card">
          {items.map(({ book, qty }) => (
            <li key={book.id} className="flex gap-4 p-4">
              <img src={book.cover} alt={book.title[lang]} width={80} height={107} className="h-28 w-20 rounded-sm object-cover" loading="lazy" />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-lg leading-tight">{book.title[lang]}</h3>
                    <p className="text-xs text-muted-foreground">{book.author[lang]}</p>
                  </div>
                  <p className="font-medium text-primary">SAR {(book.price * qty).toFixed(2)}</p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="inline-flex items-center rounded-md border border-border">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => setQty(book.id, qty - 1)}
                      className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm">{qty}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => setQty(book.id, qty + 1)}
                      className="grid h-8 w-8 place-items-center text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => remove(book.id)}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> {t("cart.remove")}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-lg border border-border bg-card p-6">
          <h2 className="font-serif text-xl">{t("cart.summary")}</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">{t("cart.subtotal")}</dt><dd>SAR {total.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">{t("cart.shipping")}</dt><dd>{shipping === 0 ? t("cart.free") : `SAR ${shipping.toFixed(2)}`}</dd></div>
            <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-medium">
              <dt>{t("cart.total")}</dt><dd className="text-primary">SAR {(total + shipping).toFixed(2)}</dd>
            </div>
          </dl>
          <Link
            to="/checkout"
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {t("cart.checkout")}
          </Link>
          <p className="mt-3 text-center text-xs text-muted-foreground">{t("cart.secure")}</p>
        </aside>
      </div>
    </div>
  );
}
