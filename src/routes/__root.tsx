import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { CartProvider } from "@/context/CartContext";
import { I18nProvider, useI18n } from "@/context/I18nContext";
import { AuthProvider } from "@/context/AuthContext";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

function NotFoundComponent() {
  const { t } = useI18n();
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-foreground">404</h1>
        <h2 className="mt-4 font-serif text-xl">{t("nf.title")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("nf.sub")}</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {t("nf.cta")}
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "A quiet bookshop online" },
      { name: "description", content: "Curated fiction, science, and history books delivered with care." },
      { property: "og:title", content: "A quiet bookshop online" },
      { property: "og:description", content: "Curated fiction, science, and history books delivered with care." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "A quiet bookshop online" },
      { name: "twitter:description", content: "Curated fiction, science, and history books delivered with care." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/73715c6c-0a8a-4b2e-8c4b-f7023043bf21/id-preview-370f4ca3--a474aca0-0957-4852-a12a-bc60bae377cb.lovable.app-1776640491538.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/73715c6c-0a8a-4b2e-8c4b-f7023043bf21/id-preview-370f4ca3--a474aca0-0957-4852-a12a-bc60bae377cb.lovable.app-1776640491538.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: () => (
    <I18nProvider>
      <NotFoundComponent />
    </I18nProvider>
  ),
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <I18nProvider>
      <AuthProvider>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
              <Outlet />
            </main>
            <SiteFooter />
          </div>
        </CartProvider>
      </AuthProvider>
    </I18nProvider>
  );
}
