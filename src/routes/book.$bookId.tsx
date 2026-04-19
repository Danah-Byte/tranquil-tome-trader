import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { books } from "@/data/books";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/book/$bookId")({
  loader: ({ params }) => {
    const book = books.find((b) => b.id === params.bookId);
    if (!book) throw notFound();
    return { book };
  },
  component: BookDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <p className="font-serif text-2xl">This book isn't on our shelves.</p>
      <Link to="/shop" search={{ q: undefined, category: undefined }} className="mt-4 inline-block text-primary underline">
        Back to shop
      </Link>
    </div>
  ),
});

function BookDetail() {
  const { book } = Route.useLoaderData();
  const { add } = useCart();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <Link to="/shop" search={{ q: undefined, category: undefined }} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to catalog
      </Link>

      <div className="mt-8 grid gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-md bg-secondary/40 shadow-[var(--shadow-book)]">
          <img src={book.cover} alt={book.title} width={768} height={1024} className="aspect-[3/4] w-full object-cover" />
        </div>
        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">{book.category}</p>
          <h1 className="mt-2 font-serif text-4xl md:text-5xl">{book.title}</h1>
          <p className="mt-2 text-muted-foreground">by {book.author}</p>
          <p className="mt-6 text-3xl font-medium text-primary">${book.price.toFixed(2)}</p>
          <p className="mt-6 leading-relaxed text-foreground/85">{book.description}</p>

          <button
            onClick={() => add(book)}
            className="mt-8 inline-flex h-11 w-full max-w-xs items-center justify-center gap-2 rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ShoppingBag className="h-4 w-4" />
            Add to cart
          </button>

          <div className="mt-10 grid gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
            <p>✦ Free wrapping on every order</p>
            <p>✦ Ships within 2 business days</p>
            <p>✦ 30-day returns</p>
          </div>
        </div>
      </div>
    </div>
  );
}
