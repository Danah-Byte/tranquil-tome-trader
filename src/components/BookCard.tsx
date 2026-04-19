import { Link } from "@tanstack/react-router";
import type { Book } from "@/data/books";

export function BookCard({ book }: { book: Book }) {
  return (
    <Link
      to="/book/$bookId"
      params={{ bookId: book.id }}
      className="group flex flex-col"
    >
      <div className="overflow-hidden rounded-md bg-secondary/50 shadow-[var(--shadow-book)] transition-transform duration-500 group-hover:-translate-y-1">
        <img
          src={book.cover}
          alt={`Cover of ${book.title}`}
          loading="lazy"
          width={768}
          height={1024}
          className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-serif text-base font-medium leading-tight">{book.title}</h3>
          <p className="truncate text-xs text-muted-foreground">{book.author}</p>
        </div>
        <span className="shrink-0 text-sm font-medium text-primary">${book.price.toFixed(2)}</span>
      </div>
    </Link>
  );
}
