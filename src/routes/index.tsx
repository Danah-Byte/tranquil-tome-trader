import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Search, ArrowRight } from "lucide-react";
import hero from "@/assets/hero-bookstore.jpg";
import { books, categories } from "@/data/books";
import { BookCard } from "@/components/BookCard";
import { useI18n } from "@/context/I18nContext";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const navigate = useNavigate();
  const { t, dir } = useI18n();
  const [q, setQ] = useState("");

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/shop", search: { q: q || undefined, category: undefined } });
  };

  const featured = books.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60">
        <img
          src={hero}
          alt=""
          width={1600}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              dir === "rtl"
                ? "linear-gradient(to left, var(--background), color-mix(in oklch, var(--background) 85%, transparent), color-mix(in oklch, var(--background) 30%, transparent))"
                : "linear-gradient(to right, var(--background), color-mix(in oklch, var(--background) 85%, transparent), color-mix(in oklch, var(--background) 30%, transparent))",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 md:py-28">
          <div className="max-w-xl">
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-accent">{t("home.eyebrow")}</p>
            <h1 className="font-serif text-4xl leading-[1.05] sm:text-5xl md:text-6xl">{t("home.title")}</h1>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">{t("home.subtitle")}</p>

            <form onSubmit={onSearch} className="mt-8 flex max-w-md items-center gap-2 rounded-full border border-border bg-card p-1.5 shadow-[var(--shadow-soft)]">
              <Search className="ms-3 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("home.search.placeholder")}
                className="flex-1 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted-foreground/70"
              />
              <button
                type="submit"
                className="inline-flex h-9 items-center gap-1 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {t("home.search.button")}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-serif text-2xl md:text-3xl">{t("home.categories.title")}</h2>
          <Link to="/shop" search={{ q: undefined, category: undefined }} className="text-sm text-primary underline-offset-4 hover:underline">
            {t("home.viewAll")}
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {categories.map((c) => (
            <Link
              key={c}
              to="/shop"
              search={{ category: c, q: undefined }}
              className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-soft)]"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("home.category.label")}</p>
              <h3 className="mt-2 font-serif text-2xl">{t(`cat.${c}` as const)}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{t(`cat.${c}.blurb` as const)}</p>
              <div className="mt-6 inline-flex items-center gap-1 text-sm text-primary">
                {t("home.explore")}{" "}
                <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${dir === "rtl" ? "rotate-180" : ""}`} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="mb-8 font-serif text-2xl md:text-3xl">{t("home.featured.title")}</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {featured.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </section>
    </>
  );
}
