import { useI18n } from "@/context/I18nContext";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <h3 className="font-serif text-lg">{t("brand")}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t("footer.tagline")}</p>
        </div>
        <div className="text-sm">
          <h4 className="mb-2 font-medium">{t("footer.visit")}</h4>
          <p className="whitespace-pre-line text-muted-foreground">{t("footer.address")}</p>
        </div>
        <div className="text-sm">
          <h4 className="mb-2 font-medium">{t("footer.contact")}</h4>
          <p className="text-muted-foreground">hello@tranquilpages.shop</p>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {t("brand")}. {t("footer.rights")}
      </div>
    </footer>
  );
}
