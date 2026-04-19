import book1 from "@/assets/book-1.jpg";
import book2 from "@/assets/book-2.jpg";
import book3 from "@/assets/book-3.jpg";
import book4 from "@/assets/book-4.jpg";
import book5 from "@/assets/book-5.jpg";
import book6 from "@/assets/book-6.jpg";

export type Category = "Fiction" | "Science" | "History";

export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  category: Category;
  cover: string;
  description: string;
};

export const books: Book[] = [
  {
    id: "1",
    title: "The Quiet Garden",
    author: "Elena Marsh",
    price: 18.5,
    category: "Fiction",
    cover: book1,
    description:
      "A tender novel about solitude, memory, and the slow rhythm of a garden tended through four seasons.",
  },
  {
    id: "2",
    title: "Cosmic Whispers",
    author: "Dr. Idris Khan",
    price: 24.0,
    category: "Science",
    cover: book2,
    description:
      "An accessible journey through modern cosmology — from the cosmic microwave background to the edge of the observable universe.",
  },
  {
    id: "3",
    title: "Ancient Echoes",
    author: "Yara Al-Sayed",
    price: 22.0,
    category: "History",
    cover: book3,
    description:
      "A sweeping account of forgotten empires whose ideas still shape the modern world.",
  },
  {
    id: "4",
    title: "Letters to the Sea",
    author: "Marin Holloway",
    price: 16.0,
    category: "Fiction",
    cover: book4,
    description:
      "A quiet epistolary novel of a lighthouse keeper writing to the tides about love and loss.",
  },
  {
    id: "5",
    title: "The Mind Unfolded",
    author: "Prof. Nora Bell",
    price: 27.5,
    category: "Science",
    cover: book5,
    description:
      "How neuroscience is rewriting our understanding of attention, memory, and what it means to be present.",
  },
  {
    id: "6",
    title: "Empires of Sand",
    author: "Hassan Rahimi",
    price: 20.0,
    category: "History",
    cover: book6,
    description:
      "A vivid history of the great desert civilizations and the trade routes that connected them.",
  },
];

export const categories: { name: Category; blurb: string }[] = [
  { name: "Fiction", blurb: "Stories that linger long after the last page." },
  { name: "Science", blurb: "Curiosity, carefully measured." },
  { name: "History", blurb: "The past, gently retold." },
];
