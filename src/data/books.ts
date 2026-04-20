import r1 from "@/assets/book-r1.webp";
import r2 from "@/assets/book-r2.webp";
import r3 from "@/assets/book-r3.webp";
import r4 from "@/assets/book-r4.webp";
import r5 from "@/assets/book-r5.webp";
import h1 from "@/assets/book-h1-new.jpg";
import h2 from "@/assets/book-h2-new.jpg";
import h3 from "@/assets/book-h3-new.webp";
import h4 from "@/assets/book-h4-new.webp";
import h5 from "@/assets/book-h5-new.webp";
import h6 from "@/assets/book-h6-new.webp";
import h7 from "@/assets/book-h7-new.webp";
import h8 from "@/assets/book-h8-new.jpg";
import n1 from "@/assets/book-n1.webp";
import n2 from "@/assets/book-n2.webp";
import n3 from "@/assets/book-n3.webp";
import n4 from "@/assets/book-n4-new.webp";
import n5 from "@/assets/book-n5.webp";
import n6 from "@/assets/book-n6-new.webp";
import n7 from "@/assets/book-n7-new.webp";
import n8 from "@/assets/book-n8-new.webp";
import n9 from "@/assets/book-n9-new.webp";
import n10 from "@/assets/book-n10-new.webp";
import n11 from "@/assets/book-n11-new.webp";
import n12 from "@/assets/book-n12-new.webp";
import type { Lang } from "@/context/I18nContext";

export type Category = "Religious" | "History" | "Novels";

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
  // ── Religious (Tafsir, Seerah, Fiqh) ──────────────────────────────
  {
    id: "1",
    title: { en: "Tafsir Ibn Kathir (Abridged)", ar: "تفسير ابن كثير (مختصر)" },
    author: { en: "Ibn Kathir", ar: "ابن كثير" },
    description: {
      en: "A foundational classical exegesis of the Qur'an — verse by verse, drawing on hadith, the companions, and early scholars.",
      ar: "تفسير كلاسيكي تأسيسي للقرآن الكريم — آية آية، يستند إلى الحديث وأقوال الصحابة والسلف.",
    },
    price: 95,
    category: "Religious",
    cover: r1,
  },
  {
    id: "2",
    title: { en: "Ar-Raheeq Al-Makhtum (The Sealed Nectar)", ar: "الرحيق المختوم" },
    author: { en: "Safi-ur-Rahman al-Mubarakpuri", ar: "صفي الرحمن المباركفوري" },
    description: {
      en: "An award-winning biography of the Prophet ﷺ — the definitive modern Seerah for the general reader.",
      ar: "سيرة نبوية حائزة على جائزة — المرجع الحديث الأشهر في السيرة للقارئ العام.",
    },
    price: 65,
    category: "Religious",
    cover: r2,
  },
  {
    id: "3",
    title: { en: "Fiqh As-Sunnah", ar: "فقه السنة" },
    author: { en: "Sayyid Sabiq", ar: "السيد سابق" },
    description: {
      en: "A clear, evidence-based presentation of Islamic jurisprudence — purification, prayer, zakah, fasting, and beyond.",
      ar: "عرض واضح ومُسنَد لأحكام الفقه الإسلامي — الطهارة والصلاة والزكاة والصيام وما بعدها.",
    },
    price: 78,
    category: "Religious",
    cover: r3,
  },
  {
    id: "4",
    title: { en: "Riyad as-Salihin (Gardens of the Righteous)", ar: "رياض الصالحين" },
    author: { en: "Imam An-Nawawi", ar: "الإمام النووي" },
    description: {
      en: "A timeless collection of authentic hadith on character, worship, and daily Muslim life.",
      ar: "مجموعة خالدة من الأحاديث الصحيحة في الأخلاق والعبادة وحياة المسلم اليومية.",
    },
    price: 55,
    category: "Religious",
    cover: r4,
  },
  {
    id: "5",
    title: { en: "In the Shade of the Qur'an", ar: "في ظلال القرآن" },
    author: { en: "Sayyid Qutb", ar: "سيد قطب" },
    description: {
      en: "A literary, reflective tafsir that walks through the Qur'an as a living guide for the soul and society.",
      ar: "تفسير أدبي تأمّلي يسير مع القرآن بوصفه هاديًا حيًّا للروح والمجتمع.",
    },
    price: 110,
    category: "Religious",
    cover: r5,
  },

  // ── History (Andalus, Abbasid, Ancient Egypt) ─────────────────────
  {
    id: "6",
    title: { en: "Andalusia: History of the Lost Paradise", ar: "الأندلس" },
    author: { en: "Raghib al-Sirjani", ar: "راغب السرجاني" },
    description: {
      en: "Eight centuries of Muslim Spain — from the conquest to the fall of Granada — told with rigour and feeling.",
      ar: "ثمانية قرون من الأندلس الإسلامية — من الفتح إلى سقوط غرناطة — بسرد دقيق وعاطفة صادقة.",
    },
    price: 72,
    category: "History",
    cover: h1,
  },
  {
    id: "7",
    title: { en: "The Abbasid Caliphate", ar: "الدولة العباسية" },
    author: { en: "Muhammad Suhail Taqush", ar: "محمد الخضري" },
    description: {
      en: "The rise, golden age, and decline of the Abbasid state — politics, society, and the great translation movement.",
      ar: "نشأة الدولة العباسية وعصرها الذهبي وأفولها — السياسة والمجتمع وحركة الترجمة الكبرى.",
    },
    price: 68,
    category: "History",
    cover: h2,
  },
  {
    id: "8",
    title: { en: "Cordoba: Capital of the World", ar: "قرطبة: عاصمة العالم" },
    author: { en: "Hassan Al-Wazzan", ar: "حسن الوزّان" },
    description: {
      en: "A vivid portrait of 10th-century Cordoba — libraries, mosques, scholars, and the streets of a great Andalusian city.",
      ar: "صورة نابضة لقرطبة في القرن العاشر — المكتبات والمساجد والعلماء وأزقّة المدينة الأندلسية الكبرى.",
    },
    price: 60,
    category: "History",
    cover: h3,
  },
  {
    id: "9",
    title: { en: "Harun al-Rashid", ar: "هارون الرشيد" },
    author: { en: "Shawqi Abu Khalil", ar: "أحمد امين" },
    description: {
      en: "A biography of the most famous Abbasid caliph — diplomat, patron of scholars, and figure of legend.",
      ar: "سيرة أشهر الخلفاء العباسيين — الدبلوماسي وراعي العلماء وصاحب الحكايات الخالدة.",
    },
    price: 48,
    category: "History",
    cover: h4,
  },
  {
    id: "10",
    title: { en: "Pharaonic Egypt", ar: "تاريخ مصر" },
    author: { en: "Selim Hassan", ar: "جمال هدية" },
    description: {
      en: "From the Old Kingdom to the New — gods, dynasties, and daily life along the Nile, by Egypt's pioneering Egyptologist.",
      ar: "من الدولة القديمة إلى الحديثة — الآلهة والأسر والحياة اليومية على ضفاف النيل، بقلم رائد علم المصريات.",
    },
    price: 85,
    category: "History",
    cover: h5,
  },
  {
    id: "11",
    title: { en: "Tutankhamun", ar: "توت عنخ آمون" },
    author: { en: "Zahi Hawass", ar: "زاهي حواس" },
    description: {
      en: "The boy king's life, death, and the discovery of his tomb — a hundred years on.",
      ar: "حياة الملك الصبي وموته واكتشاف مقبرته — بعد مئة عام على الكشف.",
    },
    price: 70,
    category: "History",
    cover: h6,
  },
  {
    id: "12",
    title: { en: "Cleopatra: The Last Queen", ar: "الحضارة المصرية" },
    author: { en: "Hussein Fawzi", ar: "خزعل الماجدي" },
    description: {
      en: "A nuanced portrait of Egypt's most famous queen, beyond the Roman myth.",
      ar: "صورة دقيقة لأشهر ملكات مصر، بعيدًا عن الأسطورة الرومانية.",
    },
    price: 52,
    category: "History",
    cover: h7,
  },
  {
    id: "13",
    title: { en: "Saladin Al-Ayyubi", ar: "صلاح الدين الأيوبي" },
    author: { en: "Abdullah Allan", ar: "علي محمد الصلابي" },
    description: {
      en: "The unifier of the Muslim east, the liberator of Jerusalem — a leader of faith, strategy, and mercy.",
      ar: "موحّد المشرق الإسلامي ومحرّر القدس — قائد جمع الإيمان والاستراتيجية والرحمة.",
    },
    price: 64,
    category: "History",
    cover: h8,
  },

  // ── Novels (Fantasy & Sci-Fi only) ────────────────────────────────
  {
    id: "14",
    title: { en: "Sword of the Desert", ar: "الصحراء" },
    author: { en: "Yara Al-Sayed", ar: "جهاد الرجبي" },
    description: {
      en: "A young Bedouin girl uncovers a sword that whispers to the wind — and to the empires that hunt for it.",
      ar: "فتاة بدوية تكتشف سيفًا يهمس للريح — وللإمبراطوريات التي تطارده.",
    },
    price: 45,
    category: "Novels",
    cover: n1,
  },
  {
    id: "15",
    title: { en: "City of Mars", ar: "مدينة المريخ" },
    author: { en: "Idris Khan", ar: "إدريس خان" },
    description: {
      en: "On the first Arab Martian colony, a domed city begins to dream — and someone is listening.",
      ar: "على أول مستعمرة عربية في المريخ، تبدأ مدينة مقبّبة في الحلم — وهناك من يُصغي.",
    },
    price: 49,
    category: "Novels",
    cover: n2,
  },
  {
    id: "16",
    title: { en: "Jinn of the Sands", ar: "الرمز المفقود" },
    author: { en: "Hassan Rahimi", ar: "دان براون" },
    description: {
      en: "A caravan vanishes in the Empty Quarter. A scholar of the unseen sets out to find what took it.",
      ar: "قافلة تختفي في الربع الخالي، فيخرج عالم بالغيب باحثًا عمّا ابتلعها.",
    },
    price: 42,
    category: "Novels",
    cover: n3,
  },
  {
    id: "17",
    title: { en: "The Last of the Algorithmists", ar: "آخر الخوارزميين" },
    author: { en: "Marin Holloway", ar: "مارين هولواي" },
    description: {
      en: "In a Riyadh of 2087, a renegade engineer hides the last unmonitored algorithm in the world.",
      ar: "في رياض عام 2087، يُخفي مهندس متمرّد آخر خوارزمية غير مراقَبة في العالم.",
    },
    price: 47,
    category: "Novels",
    cover: n4,
  },
  {
    id: "18",
    title: { en: "Dragon of the Peninsula", ar: "تراب الماس" },
    author: { en: "Tariq Al-Ahmar", ar: "أحمد مراد" },
    description: {
      en: "An epic of dragons, towers, and a forgotten kingdom buried beneath the sands of Arabia.",
      ar: "ملحمة عن التنانين والأبراج ومملكة منسيّة مدفونة تحت رمال الجزيرة.",
    },
    price: 55,
    category: "Novels",
    cover: n5,
  },
  {
    id: "19",
    title: { en: "Stars of Najd", ar: "نجوم نجد" },
    author: { en: "Nora Bell", ar: "نورة بل" },
    description: {
      en: "An astronaut from Najd is the first to cross the heliopause — and the first to hear what's on the other side.",
      ar: "رائدة فضاء من نجد هي أول من يعبر حدود الشمس — وأول من يسمع ما خلفها.",
    },
    price: 46,
    category: "Novels",
    cover: n6,
  },
  {
    id: "20",
    title: { en: "To Calm My Heart", ar: "ليطمئن قلبي" },
    author: { en: "Adham Sharqawi", ar: "ادهم شرقاوي" },
    description: {
      en: "In the city of a thousand lanterns, a journey to find peace of mind and soul.",
      ar: "في مدينة الألف فانوس، رحلة للبحث عن طمأنينة القلب والروح.",
    },
    price: 50,
    category: "Novels",
    cover: n7,
  },
  {
    id: "21",
    title: { en: "And Then There Were None", ar: "وأختفى كل شي" },
    author: { en: "Agatha Christie", ar: "اجاثا كريستي" },
    description: {
      en: "Ten strangers are invited to an isolated island, where they are killed one by one.",
      ar: "عشرة غرباء يُدعون إلى جزيرة معزولة، حيث يُقتلون واحدًا تلو الآخر.",
    },
    price: 44,
    category: "Novels",
    cover: n8,
  },
  {
    id: "22",
    title: { en: "Eyes of a Blue Bird", ar: "عينا طائر ازرق" },
    author: { en: "Abdulrazzaq Saleh", ar: "عبدالرزاق صالح" },
    description: {
      en: "A story of mystery and wonder set in the heart of the desert.",
      ar: "قصة من الغموض والعجائب تدور أحداثها في قلب الصحراء.",
    },
    price: 53,
    category: "Novels",
    cover: n9,
  },
  {
    id: "23",
    title: { en: "Star Desert", ar: "صحراء النجوم" },
    author: { en: "Omar Khalifa", ar: "عمر خليفة" },
    description: {
      en: "A street racer in a cyberpunk Riyadh is hired for one last run — across the dunes, into the data storms.",
      ar: "متسابق شوارع في رياض السايبربانك يُستأجر لسباق أخير — عبر الكثبان وإلى عواصف البيانات.",
    },
    price: 48,
    category: "Novels",
    cover: n10,
  },
  {
    id: "24",
    title: { en: "Kingdom of Glass", ar: "مملكة الزجاج" },
    author: { en: "Reem Al-Ansari", ar: "ريم الأنصاري" },
    description: {
      en: "A floating city of crystal hides a queen, a curse, and a war that began before the first sunrise.",
      ar: "مدينة طافية من البلّور تُخفي ملكة ولعنة وحربًا بدأت قبل أول شروق.",
    },
    price: 51,
    category: "Novels",
    cover: n11,
  },
  {
    id: "25",
    title: { en: "Ibn Sina 2099", ar: "ابن سينا 2099" },
    author: { en: "Yousef Al-Mansour", ar: "يوسف المنصور" },
    description: {
      en: "A bio-engineer downloads the consciousness of Ibn Sina to cure a plague — and inherits more than knowledge.",
      ar: "مهندسة حيوية تُنزّل وعي ابن سينا لعلاج وباء — فترث أكثر من المعرفة.",
    },
    price: 49,
    category: "Novels",
    cover: n12,
  },
];

export const categories: Category[] = ["Religious", "History", "Novels"];

export function pickLang<T>(b: { en: T; ar: T }, lang: Lang): T {
  return b[lang];
}

export function formatPrice(price: number): string {
  return `SAR ${price}`;
}
