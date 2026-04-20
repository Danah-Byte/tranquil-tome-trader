import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Trash2, Plus, Package, LogOut, ShieldCheck } from "lucide-react";
import { books as seedBooks, type Book, type Category } from "@/data/books";
import { useI18n } from "@/context/I18nContext";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    // Guard: redirect to /login if not signed in as admin.
    // Reads the same localStorage key the AuthProvider uses.
    if (typeof window !== "undefined") {
      const isAdmin = window.localStorage.getItem("tranquil_admin_v1") === "1";
      if (!isAdmin) {
        throw redirect({ to: "/login", search: { redirect: "/admin" } });
      }
    }
  },
  component: Admin,
  head: () => ({ meta: [{ title: "Admin — Tranquil Pages" }] }),
});

const mockOrders = [
  { id: "ORD-1042", customer: { en: "Sara A.", ar: "سارة ع." }, total: 285, status: "shipped" as const, date: "2026-04-29" },
  { id: "ORD-1041", customer: { en: "Omar K.", ar: "عمر ك." }, total: 110, status: "processing" as const, date: "2026-05-1" },
  { id: "ORD-1040", customer: { en: "Lina H.", ar: "لينا هـ." }, total: 195, status: "delivered" as const, date: "2026-04-9" },
  { id: "ORD-1039", customer: { en: "Yusuf M.", ar: "يوسف م." }, total: 78, status: "delivered" as const, date: "2026-03-27" },
];

function Admin() {
  const { t, lang } = useI18n();
  const { logout } = useAuth();
  const [tab, setTab] = useState<"books" | "orders">("books");
  const [items, setItems] = useState<Book[]>(seedBooks);
  const [editing, setEditing] = useState<Book | null>(null);
  const [creating, setCreating] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <header className="flex flex-col gap-2 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-accent">
            <ShieldCheck className="h-3.5 w-3.5" /> {t("admin.eyebrow")}
          </p>
          <h1 className="mt-1 font-serif text-3xl md:text-4xl">{t("admin.title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("admin.sub")}</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-md border border-border bg-card p-1">
            <TabBtn active={tab === "books"} onClick={() => setTab("books")}>{t("admin.tab.books")}</TabBtn>
            <TabBtn active={tab === "orders"} onClick={() => setTab("orders")}>{t("admin.tab.orders")}</TabBtn>
          </div>
          <button
            onClick={logout}
            className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-card px-3 text-xs font-medium text-foreground/80 transition-colors hover:bg-secondary"
          >
            <LogOut className="h-3.5 w-3.5" /> {t("auth.admin.logout")}
          </button>
        </div>
      </header>

      {tab === "books" ? (
        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{items.length} {t("admin.titles")}</p>
            <button
              onClick={() => { setEditing(null); setCreating(true); }}
              className="inline-flex h-9 items-center gap-1.5 rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" /> {t("admin.new")}
            </button>
          </div>
          <div className="overflow-hidden rounded-lg border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-start text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="p-3 text-start">{t("admin.col.title")}</th>
                  <th className="p-3 text-start">{t("admin.col.category")}</th>
                  <th className="p-3 text-start">{t("admin.col.price")}</th>
                  <th className="p-3 text-end">{t("admin.col.actions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {items.map((b) => (
                  <tr key={b.id}>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img src={b.cover} alt="" width={32} height={42} className="h-10 w-8 rounded-sm object-cover" />
                        <div>
                          <p className="font-medium">{b.title[lang]}</p>
                          <p className="text-xs text-muted-foreground">{b.author[lang]}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{t(`cat.${b.category}` as const)}</td>
                    <td className="p-3">SAR {b.price}</td>
                    <td className="p-3 text-end">
                      <button
                        onClick={() => { setCreating(false); setEditing(b); }}
                        className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs hover:bg-secondary"
                      >
                        <Pencil className="h-3.5 w-3.5" /> {t("admin.edit")}
                      </button>
                      <button
                        onClick={() => setItems((prev) => prev.filter((x) => x.id !== b.id))}
                        className="inline-flex h-8 items-center gap-1 rounded-md px-2 text-xs text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> {t("admin.delete")}
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
              <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="p-3 text-start">{t("admin.order")}</th>
                  <th className="p-3 text-start">{t("admin.customer")}</th>
                  <th className="p-3 text-start">{t("admin.date")}</th>
                  <th className="p-3 text-start">{t("admin.total")}</th>
                  <th className="p-3 text-start">{t("admin.status")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockOrders.map((o) => (
                  <tr key={o.id}>
                    <td className="p-3 font-medium">
                      <span className="inline-flex items-center gap-2"><Package className="h-4 w-4 text-muted-foreground" /> {o.id}</span>
                    </td>
                    <td className="p-3">{o.customer[lang]}</td>
                    <td className="p-3 text-muted-foreground">{o.date}</td>
                    <td className="p-3">SAR {o.total.toFixed(2)}</td>
                    <td className="p-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs ${
                        o.status === "delivered" ? "bg-primary/10 text-primary" :
                        o.status === "shipped" ? "bg-[var(--gold)]/20 text-foreground" :
                        "bg-accent/15 text-accent"
                      }`}>
                        {t(`admin.status.${o.status}` as const)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            <Link to="/" className="underline-offset-4 hover:underline">←</Link> Demo data
          </p>
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
  initial, onSave, onCancel,
}: { initial?: Book; onSave: (b: Book) => void; onCancel: () => void }) {
  const { t } = useI18n();
  const [titleEn, setTitleEn] = useState(initial?.title.en ?? "");
  const [titleAr, setTitleAr] = useState(initial?.title.ar ?? "");
  const [authorEn, setAuthorEn] = useState(initial?.author.en ?? "");
  const [authorAr, setAuthorAr] = useState(initial?.author.ar ?? "");
  const [descEn, setDescEn] = useState(initial?.description.en ?? "");
  const [descAr, setDescAr] = useState(initial?.description.ar ?? "");
  const [price, setPrice] = useState(initial?.price ?? 0);
  const [category, setCategory] = useState<Category>(initial?.category ?? "Religious");

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/30 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-[var(--shadow-book)]">
        <h3 className="font-serif text-xl">{initial ? t("admin.form.editBook") : t("admin.form.newBook")}</h3>
        <div className="mt-4 grid gap-3">
          <Input label={t("admin.form.titleEn")} value={titleEn} onChange={setTitleEn} />
          <Input label={t("admin.form.titleAr")} value={titleAr} onChange={setTitleAr} dir="rtl" />
          <Input label={t("admin.form.authorEn")} value={authorEn} onChange={setAuthorEn} />
          <Input label={t("admin.form.authorAr")} value={authorAr} onChange={setAuthorAr} dir="rtl" />
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm">
              <span className="mb-1 block text-foreground/80">{t("admin.col.price")}</span>
              <input
                type="number"
                step="1"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
              />
            </label>
            <label className="block text-sm">
              <span className="mb-1 block text-foreground/80">{t("admin.col.category")}</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
              >
                <option value="Religious">{t("cat.Religious")}</option>
                <option value="History">{t("cat.History")}</option>
                <option value="Novels">{t("cat.Novels")}</option>
              </select>
            </label>
          </div>
          <Textarea label={t("admin.form.descEn")} value={descEn} onChange={setDescEn} />
          <Textarea label={t("admin.form.descAr")} value={descAr} onChange={setDescAr} dir="rtl" />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onCancel} className="h-9 rounded-md border border-border px-4 text-sm hover:bg-secondary">
            {t("admin.form.cancel")}
          </button>
          <button
            onClick={() =>
              onSave({
                id: initial?.id ?? Math.random().toString(36).slice(2, 9),
                cover: initial?.cover ?? "https://placehold.co/600x800/2d4a3e/f5e9c8?text=Book",
                title: { en: titleEn, ar: titleAr },
                author: { en: authorEn, ar: authorAr },
                description: { en: descEn, ar: descAr },
                price: Number.isFinite(price) ? price : 0,
                category,
              })
            }
            className="h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {t("admin.form.save")}
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, dir }: { label: string; value: string; onChange: (v: string) => void; dir?: "rtl" | "ltr" }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-foreground/80">{label}</span>
      <input
        value={value}
        dir={dir}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}

function Textarea({ label, value, onChange, dir }: { label: string; value: string; onChange: (v: string) => void; dir?: "rtl" | "ltr" }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-foreground/80">{label}</span>
      <textarea
        value={value}
        dir={dir}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
    </label>
  );
}
