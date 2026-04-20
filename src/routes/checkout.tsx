import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Lock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
  head: () => ({ meta: [{ title: "Checkout — Tranquil Pages" }] }),
});

function Checkout() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const [method, setMethod] = useState<"mada" | "applepay" | "card">("mada");
  const [done, setDone] = useState(false);

  const shipping = total > 200 ? 0 : 25;

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
        <h1 className="mt-6 font-serif text-3xl">{t("checkout.thanks.title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("checkout.thanks.sub")}</p>
        <Link
          to="/"
          className="mt-8 inline-flex h-10 items-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {t("checkout.thanks.cta")}
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-serif text-2xl">{t("checkout.empty")}</h1>
        <Link to="/shop" search={{ q: undefined, category: undefined }} className="mt-4 inline-block text-primary underline">
          {t("checkout.continue")}
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      clear();
      setDone(true);
      navigate({ to: "/checkout" });
    }, 600);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-serif text-3xl md:text-4xl">{t("checkout.title")}</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-serif text-xl">{t("checkout.shipping.title")}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label={t("checkout.field.name")} name="name" required />
              <Field label={t("checkout.field.email")} name="email" type="email" required />
              <Field label={t("checkout.field.address")} name="address" className="sm:col-span-2" required />
              <Field label={t("checkout.field.city")} name="city" required />
              <Field label={t("checkout.field.zip")} name="zip" required />
            </div>
          </section>

          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-serif text-xl">{t("checkout.payment.title")}</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              <Lock className="me-1 inline h-3 w-3" /> {t("checkout.payment.demo")}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <PayOption label={t("checkout.pay.mada")} id="mada" current={method} onSelect={setMethod} />
              <PayOption label={t("checkout.pay.apple")} id="applepay" current={method} onSelect={setMethod} />
              <PayOption label={t("checkout.pay.card")} id="card" current={method} onSelect={setMethod} />
            </div>
            {method === "card" && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Field label={t("checkout.card.number")} name="card" placeholder="4242 4242 4242 4242" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="MM/YY" name="exp" />
                  <Field label="CVC" name="cvc" />
                </div>
              </div>
            )}
          </section>
        </div>

        <aside className="h-fit rounded-lg border border-border bg-card p-6">
          <h2 className="font-serif text-xl">{t("checkout.order")}</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map(({ book, qty }) => (
              <li key={book.id} className="flex justify-between gap-3">
                <span className="text-foreground/85">{book.title[lang]} <span className="text-muted-foreground">× {qty}</span></span>
                <span>${(book.price * qty).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">{t("cart.subtotal")}</dt><dd>${total.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">{t("cart.shipping")}</dt><dd>{shipping === 0 ? t("cart.free") : `$${shipping.toFixed(2)}`}</dd></div>
            <div className="mt-2 flex justify-between border-t border-border pt-3 text-base font-medium">
              <dt>{t("cart.total")}</dt><dd className="text-primary">${(total + shipping).toFixed(2)}</dd>
            </div>
          </dl>
          <button
            type="submit"
            className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {t("checkout.pay")} ${(total + shipping).toFixed(2)}
          </button>
        </aside>
      </form>
    </div>
  );
}

function Field({
  label, name, type = "text", required, placeholder, className = "",
}: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; className?: string }) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1 block text-foreground/80">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-primary"
      />
    </label>
  );
}

function PayOption({
  id, label, current, onSelect,
}: { id: "mada" | "applepay" | "card"; label: string; current: string; onSelect: (v: "mada" | "applepay" | "card") => void }) {
  const active = current === id;
  return (
    <button
      type="button"
      onClick={() => onSelect(id)}
      className={`rounded-md border px-4 py-3 text-sm transition-colors ${
        active ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-secondary"
      }`}
    >
      {label}
    </button>
  );
}
