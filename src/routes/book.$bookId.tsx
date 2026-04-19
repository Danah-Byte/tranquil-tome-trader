import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { books } from "@/data/books";
import { useCart } from "@/context/CartContext";
import { useI18n } from "@/context/I18nContext";

export const Route = createFileRoute("/book/$bookId")({
  loader: ({ params }) => {
    const book = books.find((b) => b.id === params.bookId);
    if (!book) throw notFound();
    return { book };
  },
  component: BookDetail,
  notFoundComponent: () => <BookNotFound />,
});

function BookNotFound() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <p className="font-serif text-2xl">{t("book.notFound")}</p>
      <Link to="/shop" search={{ q: undefined, category: undefined }} className="mt-4 inline-block text-primary underline">
        {t("book.backToShop")}
      </Link>
    </div>
  );
}

function BookDetail() {
  const { book } = Route.useLoaderData();
  const { add } = useCart();
  const { t, lang, dir } = useI18n();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link to="/shop" search={{ q: undefined, category: undefined }} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} /> {t("book.back")}
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-md bg-secondary/40 shadow-[var(--shadow-book)]">
          <img src={book.cover} alt={book.title[lang]} width={768} height={1024} className="aspect-[3/4] w-full object-cover" />
        </div>
        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">{t(`cat.${book.category}` as const)}</p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl">{book.title[lang]}</h1>
          <p className="mt-2 text-muted-foreground">{t("book.by")} {book.author[lang]}</p>
          <p className="mt-6 text-3xl font-medium text-primary">${book.price.toFixed(2)}</p>
          <p className="mt-6 leading-relaxed text-foreground/85">{book.description[lang]}</p>

          <button
            onClick={() => add(book)}
            className="mt-8 inline-flex h-11 w-full max-w-xs items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ShoppingBag className="h-4 w-4" />
            {t("book.add")}
          </button>

          <div className="mt-10 grid gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
            <p>{t("book.perk1")}</p>
            <p>{t("book.perk2")}</p>
            <p>{t("book.perk3")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
