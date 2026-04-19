import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { books, categories, type Category } from "@/data/books";
import { BookCard } from "@/components/BookCard";
import { useI18n } from "@/context/I18nContext";

type ShopSearch = { q?: string; category?: Category };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): ShopSearch => ({
    q: typeof s.q === "string" ? s.q : undefined,
    category: ["Fiction", "Science", "History"].includes(s.category as string)
      ? (s.category as Category)
      : undefined,
  }),
  component: Shop,
  head: () => ({
    meta: [
      { title: "Shop — Tranquil Pages" },
      { name: "description", content: "Browse our full catalog of fiction, science, and history." },
    ],
  }),
});

function Shop() {
  const { q, category } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { t, lang } = useI18n();

  const filtered = books.filter((b) => {
    const matchesQ =
      !q ||
      `${b.title.en} ${b.title.ar} ${b.author.en} ${b.author.ar}`
        .toLowerCase()
        .includes(q.toLowerCase());
    const matchesCat = !category || b.category === category;
    return matchesQ && matchesCat;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl">{t("shop.title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? t("shop.count.one") : t("shop.count.many")}
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/shop"
            search={{ q, category: undefined }}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              !category ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-secondary"
            }`}
          >
            {t("shop.all")}
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              to="/shop"
              search={{ q, category: c }}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                category === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border hover:bg-secondary"
              }`}
            >
              {t(`cat.${c}` as const)}
            </Link>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const data = new FormData(form);
            const value = (data.get("q") as string) || "";
            navigate({ search: { q: value || undefined, category } });
          }}
          className="flex w-full max-w-xs items-center gap-2 rounded-md border border-border bg-card px-3"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            name="q"
            defaultValue={q ?? ""}
            placeholder={t("shop.search.placeholder")}
            lang={lang}
            className="w-full bg-transparent py-2 text-sm outline-none"
          />
        </form>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card/40 p-16 text-center">
          <p className="font-serif text-xl">{t("shop.empty.title")}</p>
          <p className="mt-2 text-sm text-muted-foreground">{t("shop.empty.sub")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      )}
    </div>
  );
}
