import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ShieldCheck, Lock } from "lucide-react";
import { useI18n } from "@/context/I18nContext";
import { useAuth } from "@/context/AuthContext";

type LoginSearch = { redirect?: string };

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): LoginSearch => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  component: Login,
  head: () => ({ meta: [{ title: "Sign in — Tranquil Pages" }] }),
});

function Login() {
  const { t } = useI18n();
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      setError(false);
      navigate({ to: redirect ?? "/admin" });
    } else {
      setError(true);
    }
  };

  if (isAdmin) {
    return (
      <div className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-4 py-16">
        <div className="w-full rounded-lg border border-border bg-card p-8 text-center shadow-[var(--shadow-soft)]">
          <ShieldCheck className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-4 font-serif text-2xl">{t("auth.welcome")}</h1>
          <Link
            to="/admin"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {t("nav.admin")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-4 py-16">
      <div className="w-full rounded-lg border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-foreground/70">
          <Lock className="h-3 w-3" /> {t("auth.admin.title")}
        </div>
        <h1 className="font-serif text-3xl">{t("auth.admin.title")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("auth.admin.sub")}</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <Input
            label={t("auth.admin.username")}
            value={username}
            onChange={setUsername}
            autoComplete="username"
          />
          <Input
            label={t("auth.admin.password")}
            value={password}
            onChange={setPassword}
            type="password"
            autoComplete="current-password"
          />
          {error && (
            <p className="rounded-md border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              {t("auth.admin.error")}
            </p>
          )}
          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {t("auth.admin.cta")}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">{t("auth.admin.hint")}</p>
      </div>
    </div>
  );
}

function Input({
  label, value, onChange, type = "text", autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-foreground/80">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        autoComplete={autoComplete}
        required
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-primary"
      />
    </label>
  );
}
