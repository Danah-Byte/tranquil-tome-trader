import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Sign in — Tranquil Pages" }] }),
});

function Login() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-4 py-16">
      <div className="w-full rounded-lg border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
        <h1 className="font-serif text-3xl">{mode === "signin" ? "Welcome back" : "Create an account"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signin" ? "Sign in to view your orders and wishlists." : "Join us — it takes a moment."}
        </p>

        {submitted ? (
          <div className="mt-6 rounded-md border border-primary/30 bg-primary/5 p-4 text-sm">
            Demo only — authentication will be wired up later. You can keep browsing as a guest.{" "}
            <Link to="/" className="text-primary underline">Return home</Link>.
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <Input label="Full name" name="name" required />
            )}
            <Input label="Email" name="email" type="email" required />
            <Input label="Password" name="password" type="password" required />
            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center rounded-md bg-primary text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
          <button
            onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setSubmitted(false); }}
            className="text-primary underline-offset-4 hover:underline"
          >
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

function Input({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-foreground/80">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-primary"
      />
    </label>
  );
}
