import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Trash2, Plus, Package } from "lucide-react";
import { books as seedBooks, type Book, type Category } from "@/data/books";

export const Route = createFileRoute("/admin")({
  component: Admin,
  head: () => ({ meta: [{ title: "Admin — Tranquil Pages" }] }),
});

const mockOrders = [
  { id: "ORD-1042", customer: "Sara A.", total: 64.5, status: "Shipped", date: "2025-04-12" },
  { id: "ORD-1041", customer: "Omar K.", total: 22.0, status: "Processing", date: "2025-04-12" },
  { id: "ORD-1040", customer: "Lina H.", total: 41.5, status: "Delivered", date: "2025-04-10" },
  { id: "ORD-1039", customer: "Yusuf M.", total: 18.5, status: "Delivered", date: "2025-04-09" },
];

function Admin() {
  const [tab, setTab] = useState<"books" | "orders">("books");
  const [items, setItems] = useState<Book[]>(seedBooks);
  const [editing, setEditing] = useState<Book | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="flex flex-col gap-2 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-accent">Internal</p>
          <h1 className="mt-1 font-serif text-3xl md:text-4xl">Shop admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage inventory and recent orders.</p>
        </div>
        <div className="inline-flex rounded-md border border-border bg-card p-1">
          <TabBtn active={tab === "books"} onClick={() => setTab("books")}>Books</TabBtn>
          <TabBtn active={tab === "orders"} onClick={() => setTab("orders")}>Orders</TabBtn>
        </div>
      </header>

      {tab === "books" ? (
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{items.length} titles in stock</p>
            <button
              onClick={() => { setEditing(null); setCreating(true); }}
              className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" /> New book
            </button>
          </div>
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((b) => (
                  <tr key={b.id}>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img src={b.cover} alt="" width={32} height={42} className="h-10 w-8 rounded-sm object-cover" />
                        <div>
                          <p className="font-medium">{b.title}</p>
                          <p className="text-xs text-muted-foreground">{b.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{b.category}</td>
                    <td className="p-3">${b.price.toFixed(2)}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => { setCreating(false); setEditing(b); }}
                        className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs hover:bg-secondary"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => setItems((prev) => prev.filter((x) => x.id !== b.id))}
                        className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {(editing || creating) && (
            <BookForm
              initial={editing ?? undefined}
              onCancel={() => { setEditing(null); setCreating(false); }}
              onSave={(b) => {
                setItems((prev) => {
                  const exists = prev.find((x) => x.id === b.id);
                  return exists ? prev.map((x) => (x.id === b.id ? b : x)) : [b, ...prev];
                });
                setEditing(null);
                setCreating(false);
              }}
            />
          )}
        </section>
      ) : (
        <section className="mt-8">
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="p-3">Order</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockOrders.map((o) => (
                  <tr key={o.id}>
                    <td className="p-3 font-medium">
                      <span className="inline-flex items-center gap-2"><Package className="h-4 w-4 text-muted-foreground" /> {o.id}</span>
                    </td>
                    <td className="p-3">{o.customer}</td>
                    <td className="p-3 text-muted-foreground">{o.date}</td>
                    <td className="p-3">${o.total.toFixed(2)}</td>
                    <td className="p-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs ${
                        o.status === "Delivered" ? "bg-primary/10 text-primary" :
                        o.status === "Shipped" ? "bg-[var(--gold)]/20 text-foreground" :
                        "bg-accent/15 text-accent"
                      }`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded px-3 py-1.5 text-sm transition-colors ${
        active ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function BookForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Book;
  onSave: (b: Book) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [price, setPrice] = useState(initial?.price ?? 0);
  const [category, setCategory] = useState<Category>(initial?.category ?? "Fiction");
  const [description, setDescription] = useState(initial?.description ?? "");

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/30 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-book)]">
        <h3 className="font-serif text-xl">{initial ? "Edit book" : "New book"}</h3>
        <div className="mt-4 grid gap-3">
          <Input label="Title" value={title} onChange={setTitle} />
          <Input label="Author" value={author} onChange={setAuthor} />
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm">
              <span className="mb-1 block text-foreground/80">Price</span>
              <input
                type="number"
                step="0.5"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-foreground/80">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
              >
                <option>Fiction</option>
                <option>Science</option>
                <option>History</option>
              </select>
            </label>
          </div>
          <label className="block text-sm">
            <span className="mb-1 block text-foreground/80">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onCancel} className="h-9 rounded-md border border-border px-4 text-sm hover:bg-secondary">
            Cancel
          </button>
          <button
            onClick={() =>
              onSave({
                id: initial?.id ?? Math.random().toString(36).slice(2, 9),
                cover: initial?.cover ?? "https://placehold.co/600x800/2d4a3e/f5e9c8?text=Book",
                title,
                author,
                price: Number.isFinite(price) ? price : 0,
                category,
                description,
              })
            }
            className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-foreground/80">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
