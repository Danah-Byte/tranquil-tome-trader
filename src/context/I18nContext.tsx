import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Lang = "en" | "ar";

type Dict = Record<string, { en: string; ar: string }>;

const dict: Dict = {
  // Header
  "nav.home": { en: "Home", ar: "الرئيسية" },
  "nav.shop": { en: "Shop", ar: "المتجر" },
  "nav.admin": { en: "Admin", ar: "الإدارة" },
  "nav.signin": { en: "Sign in", ar: "تسجيل الدخول" },
  "nav.cart": { en: "Cart", ar: "السلة" },
  "brand": { en: "Tranquil Pages", ar: "صفحات هادئة" },

  // Home
  "home.eyebrow": { en: "A quiet bookshop", ar: "مكتبة هادئة" },
  "home.title": { en: "Stories worth slowing down for.", ar: "قصص تستحق أن تُقرأ على مهل." },
  "home.subtitle": {
    en: "Hand-picked fiction, science, and history — wrapped, signed, and posted from a small shop in Riyadh.",
    ar: "روايات وعلوم وتاريخ مختارة بعناية — تُغلَّف وتُوقَّع وتُرسَل من مكتبة صغيرة في الرياض.",
  },
  "home.search.placeholder": { en: "Search titles or authors…", ar: "ابحث عن عنوان أو مؤلف…" },
  "home.search.button": { en: "Search", ar: "بحث" },
  "home.categories.title": { en: "Browse by category", ar: "تصفّح حسب التصنيف" },
  "home.viewAll": { en: "View all", ar: "عرض الكل" },
  "home.category.label": { en: "Category", ar: "تصنيف" },
  "home.explore": { en: "Explore", ar: "استكشف" },
  "home.featured.title": { en: "From the shelf", ar: "من الرفوف" },

  // Categories
  "cat.Fiction": { en: "Fiction", ar: "روايات" },
  "cat.Science": { en: "Science", ar: "علوم" },
  "cat.History": { en: "History", ar: "تاريخ" },
  "cat.Fiction.blurb": { en: "Stories that linger long after the last page.", ar: "حكايات تبقى معك بعد الصفحة الأخيرة." },
  "cat.Science.blurb": { en: "Curiosity, carefully measured.", ar: "فضول مُقاس بعناية." },
  "cat.History.blurb": { en: "The past, gently retold.", ar: "الماضي يُروى برفق." },

  // Shop
  "shop.title": { en: "The Catalog", ar: "الفهرس" },
  "shop.count.one": { en: "book found", ar: "كتاب" },
  "shop.count.many": { en: "books found", ar: "كتب" },
  "shop.all": { en: "All", ar: "الكل" },
  "shop.empty.title": { en: "No books match your search", ar: "لا توجد كتب مطابقة للبحث" },
  "shop.empty.sub": { en: "Try a different keyword or clear filters.", ar: "جرّب كلمة مختلفة أو امسح المرشحات." },
  "shop.search.placeholder": { en: "Search…", ar: "بحث…" },

  // Book detail
  "book.back": { en: "Back to catalog", ar: "العودة إلى الفهرس" },
  "book.by": { en: "by", ar: "بقلم" },
  "book.add": { en: "Add to cart", ar: "أضف إلى السلة" },
  "book.perk1": { en: "✦ Free wrapping on every order", ar: "✦ تغليف مجاني لكل طلب" },
  "book.perk2": { en: "✦ Ships within 2 business days", ar: "✦ يُشحن خلال يومَي عمل" },
  "book.perk3": { en: "✦ 30-day returns", ar: "✦ إرجاع خلال 30 يومًا" },
  "book.notFound": { en: "This book isn't on our shelves.", ar: "هذا الكتاب ليس على رفوفنا." },
  "book.backToShop": { en: "Back to shop", ar: "العودة إلى المتجر" },

  // Cart
  "cart.empty.title": { en: "Your cart is quiet.", ar: "سلتك هادئة." },
  "cart.empty.sub": { en: "Add a few books to fill these shelves.", ar: "أضف بعض الكتب لتملأ هذه الرفوف." },
  "cart.empty.cta": { en: "Browse the shop", ar: "تصفّح المتجر" },
  "cart.title": { en: "Your cart", ar: "سلتك" },
  "cart.summary": { en: "Order summary", ar: "ملخّص الطلب" },
  "cart.subtotal": { en: "Subtotal", ar: "المجموع الفرعي" },
  "cart.shipping": { en: "Shipping", ar: "الشحن" },
  "cart.free": { en: "Free", ar: "مجاني" },
  "cart.total": { en: "Total", ar: "الإجمالي" },
  "cart.checkout": { en: "Proceed to checkout", ar: "إتمام الشراء" },
  "cart.secure": { en: "Secure checkout · Mada · Apple Pay", ar: "دفع آمن · مدى · Apple Pay" },
  "cart.remove": { en: "Remove", ar: "إزالة" },

  // Checkout
  "checkout.title": { en: "Checkout", ar: "إتمام الشراء" },
  "checkout.shipping.title": { en: "Shipping details", ar: "بيانات الشحن" },
  "checkout.field.name": { en: "Full name", ar: "الاسم الكامل" },
  "checkout.field.email": { en: "Email", ar: "البريد الإلكتروني" },
  "checkout.field.address": { en: "Address", ar: "العنوان" },
  "checkout.field.city": { en: "City", ar: "المدينة" },
  "checkout.field.zip": { en: "Postal code", ar: "الرمز البريدي" },
  "checkout.payment.title": { en: "Payment method", ar: "طريقة الدفع" },
  "checkout.payment.demo": { en: "Demo only — no real payment is processed.", ar: "عرض توضيحي — لا تتم معالجة أي دفع." },
  "checkout.pay.mada": { en: "Mada", ar: "مدى" },
  "checkout.pay.apple": { en: "Apple Pay", ar: "Apple Pay" },
  "checkout.pay.card": { en: "Credit card", ar: "بطاقة ائتمان" },
  "checkout.card.number": { en: "Card number", ar: "رقم البطاقة" },
  "checkout.order": { en: "Order", ar: "الطلب" },
  "checkout.pay": { en: "Pay", ar: "ادفع" },
  "checkout.thanks.title": { en: "Thank you for your order", ar: "شكرًا على طلبك" },
  "checkout.thanks.sub": {
    en: "A confirmation has been sent to your email. Your books will be wrapped and posted within 2 business days.",
    ar: "تم إرسال تأكيد إلى بريدك. سيتم تغليف كتبك وشحنها خلال يومَي عمل.",
  },
  "checkout.thanks.cta": { en: "Back to home", ar: "العودة إلى الرئيسية" },
  "checkout.empty": { en: "Your cart is empty.", ar: "سلتك فارغة." },
  "checkout.continue": { en: "Continue shopping", ar: "متابعة التسوق" },

  // Auth
  "auth.welcome": { en: "Welcome back", ar: "مرحبًا بعودتك" },
  "auth.create": { en: "Create an account", ar: "إنشاء حساب" },
  "auth.signin.sub": { en: "Sign in to view your orders and wishlists.", ar: "سجّل الدخول لعرض طلباتك وقوائم رغباتك." },
  "auth.signup.sub": { en: "Join us — it takes a moment.", ar: "انضم إلينا — لا يستغرق سوى لحظات." },
  "auth.field.name": { en: "Full name", ar: "الاسم الكامل" },
  "auth.field.email": { en: "Email", ar: "البريد الإلكتروني" },
  "auth.field.password": { en: "Password", ar: "كلمة المرور" },
  "auth.signin.cta": { en: "Sign in", ar: "تسجيل الدخول" },
  "auth.signup.cta": { en: "Create account", ar: "إنشاء حساب" },
  "auth.demo": {
    en: "Demo only — authentication will be wired up later. You can keep browsing as a guest.",
    ar: "عرض توضيحي — سيتم ربط المصادقة لاحقًا. يمكنك المتابعة كزائر.",
  },
  "auth.return": { en: "Return home", ar: "العودة إلى الرئيسية" },
  "auth.toggle.toSignup": { en: "New here?", ar: "جديد هنا؟" },
  "auth.toggle.toSignin": { en: "Already have an account?", ar: "لديك حساب بالفعل؟" },

  // Admin
  "admin.eyebrow": { en: "Internal", ar: "داخلي" },
  "admin.title": { en: "Shop admin", ar: "إدارة المتجر" },
  "admin.sub": { en: "Manage inventory and recent orders.", ar: "إدارة المخزون والطلبات الأخيرة." },
  "admin.tab.books": { en: "Books", ar: "الكتب" },
  "admin.tab.orders": { en: "Orders", ar: "الطلبات" },
  "admin.titles": { en: "titles in stock", ar: "عنوان متوفر" },
  "admin.new": { en: "New book", ar: "كتاب جديد" },
  "admin.col.title": { en: "Title", ar: "العنوان" },
  "admin.col.category": { en: "Category", ar: "التصنيف" },
  "admin.col.price": { en: "Price", ar: "السعر" },
  "admin.col.actions": { en: "Actions", ar: "إجراءات" },
  "admin.edit": { en: "Edit", ar: "تعديل" },
  "admin.delete": { en: "Delete", ar: "حذف" },
  "admin.order": { en: "Order", ar: "طلب" },
  "admin.customer": { en: "Customer", ar: "العميل" },
  "admin.date": { en: "Date", ar: "التاريخ" },
  "admin.total": { en: "Total", ar: "الإجمالي" },
  "admin.status": { en: "Status", ar: "الحالة" },
  "admin.status.delivered": { en: "Delivered", ar: "تم التسليم" },
  "admin.status.shipped": { en: "Shipped", ar: "تم الشحن" },
  "admin.status.processing": { en: "Processing", ar: "قيد المعالجة" },
  "admin.form.editBook": { en: "Edit book", ar: "تعديل الكتاب" },
  "admin.form.newBook": { en: "New book", ar: "كتاب جديد" },
  "admin.form.titleEn": { en: "Title (English)", ar: "العنوان (إنجليزي)" },
  "admin.form.titleAr": { en: "Title (Arabic)", ar: "العنوان (عربي)" },
  "admin.form.authorEn": { en: "Author (English)", ar: "المؤلف (إنجليزي)" },
  "admin.form.authorAr": { en: "Author (Arabic)", ar: "المؤلف (عربي)" },
  "admin.form.descEn": { en: "Description (English)", ar: "الوصف (إنجليزي)" },
  "admin.form.descAr": { en: "Description (Arabic)", ar: "الوصف (عربي)" },
  "admin.form.cancel": { en: "Cancel", ar: "إلغاء" },
  "admin.form.save": { en: "Save", ar: "حفظ" },

  // Footer
  "footer.tagline": {
    en: "A small bookshop devoted to slow reading and beautiful editions.",
    ar: "مكتبة صغيرة مكرَّسة للقراءة المتأنية والطبعات الجميلة.",
  },
  "footer.visit": { en: "Visit", ar: "زرنا" },
  "footer.contact": { en: "Contact", ar: "تواصل" },
  "footer.address": { en: "Skaka , KSA", ar: "سكاكا، المملكة العربية السعودية" },
  "footer.rights": { en: "All rights reserved.", ar: "جميع الحقوق محفوظة." },

  // 404
  "nf.title": { en: "Page not found", ar: "الصفحة غير موجودة" },
  "nf.sub": { en: "The page you're looking for doesn't exist or has been moved.", ar: "الصفحة التي تبحث عنها غير موجودة أو تم نقلها." },
  "nf.cta": { en: "Return home", ar: "العودة إلى الرئيسية" },
};

type Ctx = {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dict) => string;
};

const I18nCtx = createContext<Ctx | null>(null);
const KEY = "tranquil_lang_v1";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Lang | null;
      if (saved === "en" || saved === "ar") setLangState(saved);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang: (l) => {
        setLangState(l);
        try {
          localStorage.setItem(KEY, l);
        } catch {
          // ignore
        }
      },
      t: (key) => dict[key]?.[lang] ?? String(key),
    }),
    [lang],
  );

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
