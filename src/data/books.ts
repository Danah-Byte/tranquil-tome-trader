import book1 from "@/assets/book-1.jpg";
import book2 from "@/assets/book-2.jpg";
import book3 from "@/assets/book-3.jpg";
import book4 from "@/assets/book-4.jpg";
import book5 from "@/assets/book-5.jpg";
import book6 from "@/assets/book-6.jpg";
import book7 from "@/assets/book-7.jpg";
import book8 from "@/assets/book-8.jpg";
import book9 from "@/assets/book-9.jpg";
import book10 from "@/assets/book-10.jpg";
import type { Lang } from "@/context/I18nContext";

export type Category = "Fiction" | "Science" | "History";

export type Bilingual = { en: string; ar: string };

export type Book = {
  id: string;
  title: Bilingual;
  author: Bilingual;
  description: Bilingual;
  price: number;
  category: Category;
  cover: string;
};

export const books: Book[] = [
  {
    id: "1",
    title: { en: "Season of Migration to the North", ar: "موسم الهجرة إلى الشمال" },
    author: { en: "Tayeb Salih", ar: "الطيّب صالح" },
    description: {
      en: "A landmark of modern Arabic literature — the haunting story of a Sudanese man returning home from years in Europe.",
      ar: "تحفة الأدب العربي الحديث — حكاية موجِعة لرجل سوداني عائد إلى وطنه بعد سنوات في أوروبا.",
    },
    price: 35,
    category: "Fiction",
    cover: book7,
  },
  {
    id: "2",
    title: { en: "The Prophet", ar: "النبي" },
    author: { en: "Khalil Gibran", ar: "جبران خليل جبران" },
    description: {
      en: "Twenty-six prose poems on love, work, joy, and sorrow — a quiet companion for a lifetime.",
      ar: "ست وعشرون قصيدة نثرية عن الحب والعمل والفرح والحزن — رفيق هادئ مدى الحياة.",
    },
    price: 29,
    category: "Fiction",
    cover: book8,
  },
  {
    id: "3",
    title: { en: "The Quiet Garden", ar: "الحديقة الهادئة" },
    author: { en: "Elena Marsh", ar: "إيلينا مارش" },
    description: {
      en: "A tender novel about solitude, memory, and the slow rhythm of a garden tended through four seasons.",
      ar: "رواية رقيقة عن العزلة والذاكرة وإيقاع حديقة تُعتنى بها على مدار الفصول الأربعة.",
    },
    price: 29,
    category: "Fiction",
    cover: book1,
  },
  {
    id: "4",
    title: { en: "Letters to the Sea", ar: "رسائل إلى البحر" },
    author: { en: "Marin Holloway", ar: "مارين هولواي" },
    description: {
      en: "A quiet epistolary novel of a lighthouse keeper writing to the tides about love and loss.",
      ar: "رواية رسائل هادئة لحارس منارة يكتب إلى الأمواج عن الحب والفقد.",
    },
    price: 25,
    category: "Fiction",
    cover: book4,
  },
  {
    id: "5",
    title: { en: "A Brief History of Time", ar: "تاريخ موجز للزمن" },
    author: { en: "Stephen Hawking", ar: "ستيفن هوكينغ" },
    description: {
      en: "A landmark introduction to the universe, from the Big Bang to black holes — written for the curious reader.",
      ar: "مدخل بارز إلى الكون، من الانفجار العظيم إلى الثقوب السوداء — مكتوب للقارئ الفضولي.",
    },
    price: 26.0,
    category: "Science",
    cover: book9,
  },
  {
    id: "6",
    title: { en: "Cosmic Whispers", ar: "همسات كونية" },
    author: { en: "Dr. Idris Khan", ar: "د. إدريس خان" },
    description: {
      en: "An accessible journey through modern cosmology — from the cosmic microwave background to the edge of the observable universe.",
      ar: "رحلة ميسّرة في علم الكونيات الحديث — من إشعاع الخلفية الكونية إلى حافة الكون المرئي.",
    },
    price: 24.0,
    category: "Science",
    cover: book2,
  },
  {
    id: "7",
    title: { en: "The Mind Unfolded", ar: "العقل المنبسط" },
    author: { en: "Prof. Nora Bell", ar: "أ. نورة بل" },
    description: {
      en: "How neuroscience is rewriting our understanding of attention, memory, and what it means to be present.",
      ar: "كيف يعيد علم الأعصاب رسم فهمنا للانتباه والذاكرة ومعنى الحضور.",
    },
    price: 27.5,
    category: "Science",
    cover: book5,
  },
  {
    id: "8",
    title: { en: "The Silk Roads", ar: "طرق الحرير" },
    author: { en: "Peter Frankopan", ar: "بيتر فرانكوبان" },
    description: {
      en: "A new history of the world told through the trade routes that bound east and west together for millennia.",
      ar: "تاريخ جديد للعالم يُروى عبر طرق التجارة التي ربطت الشرق بالغرب لآلاف السنين.",
    },
    price: 28.0,
    category: "History",
    cover: book10,
  },
  {
    id: "9",
    title: { en: "Ancient Echoes", ar: "أصداء قديمة" },
    author: { en: "Yara Al-Sayed", ar: "يارا السيّد" },
    description: {
      en: "A sweeping account of forgotten empires whose ideas still shape the modern world.",
      ar: "سرد واسع لإمبراطوريات منسيّة لا تزال أفكارها تُشكّل العالم الحديث.",
    },
    price: 22.0,
    category: "History",
    cover: book3,
  },
  {
    id: "10",
    title: { en: "Empires of Sand", ar: "ممالك الرمال" },
    author: { en: "Hassan Rahimi", ar: "حسن رحيمي" },
    description: {
      en: "A vivid history of the great desert civilizations and the trade routes that connected them.",
      ar: "تاريخ نابض بالحياة للحضارات الصحراوية الكبرى وطرق التجارة التي جمعت بينها.",
    },
    price: 20.0,
    category: "History",
    cover: book6,
  },
];

export const categories: Category[] = ["Fiction", "Science", "History"];

export function pickLang<T>(b: { en: T; ar: T }, lang: Lang): T {
  return b[lang];
}
