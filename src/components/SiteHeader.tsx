import { Link } from "@tanstack/react-router";
import { ShoppingBag, BookOpen, User, Languages } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";

export function SiteHeader() {
  const { count } = useCart();
  const { t, lang, setLang } = useI18n();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="font-serif text-xl font-semibold tracking-tight">{t("brand")}</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          <Link to="/" className="text-foreground/80 transition-colors hover:text-primary" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>
            {t("nav.home")}
          </Link>
          <Link to="/shop" className="text-foreground/80 transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>
            {t("nav.shop")}
          </Link>
          <Link to="/admin" className="text-foreground/80 transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>
            {t("nav.admin")}
          </Link>
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            aria-label="Toggle language"
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-card px-2.5 text-xs font-medium text-foreground/80 transition-colors hover:bg-secondary"
          >
            <Languages className="h-3.5 w-3.5" />
            {lang === "en" ? "العربية" : "English"}
          </button>
          <Link
            to="/login"
            className="hidden h-9 items-center gap-1.5 rounded-md px-3 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground sm:inline-flex"
          >
            <User className="h-4 w-4" />
            {t("nav.signin")}
          </Link>
          <Link
            to="/cart"
            className="relative inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">{t("nav.cart")}</span>
            {count > 0 && (
              <span className="ms-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--gold)] px-1.5 text-xs font-semibold text-[oklch(0.25_0.02_60)]">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
