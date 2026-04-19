import { Link } from "@tanstack/react-router";
import { ShoppingBag, BookOpen, User } from "lucide-react";
import { useCart } from "@/context/CartContext";

export function SiteHeader() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="font-serif text-xl font-semibold tracking-tight">Tranquil&nbsp;Pages</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          <Link to="/" className="text-foreground/80 transition-colors hover:text-primary" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }}>
            Home
          </Link>
          <Link to="/shop" className="text-foreground/80 transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>
            Shop
          </Link>
          <Link to="/admin" className="text-foreground/80 transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>
            Admin
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden h-9 items-center gap-1.5 rounded-md px-3 text-sm text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground sm:inline-flex"
          >
            <User className="h-4 w-4" />
            Sign in
          </Link>
          <Link
            to="/cart"
            className="relative inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ShoppingBag className="h-4 w-4" />
            Cart
            {count > 0 && (
              <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--gold)] px-1.5 text-xs font-semibold text-[oklch(0.25_0.02_60)]">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
