import type { Mcq } from "@/components/assess/mcq-quiz";
import type { CodeTest } from "@/components/assess/code-lab";

export interface DemoLesson {
  slug: string;
  no: number;
  title: string;
  skkni: string;
  body: string[];
  quiz?: Mcq[];
  lab?: { starter: string; tests: CodeTest[] };
}

export interface DemoCourse {
  slug: string;
  title: string;
  path: string;
  lessons: DemoLesson[];
}

export const DEMO_COURSES: Record<string, DemoCourse> = {
  "js-dasar-analis": {
    slug: "js-dasar-analis",
    title: "JavaScript Dasar untuk Analis",
    path: "ai-engineer",
    lessons: [
      {
        slug: "variabel-tipe",
        no: 1,
        title: "Variabel, Tipe Data & Array",
        skkni: "J.620100.001.01",
        body: [
          "Deklarasikan data dengan const (tetap) dan let (berubah). Hindari var di kode modern.",
          "Tipe inti: number, string, boolean, null, undefined, object, array. Cek dengan typeof.",
          "Array adalah senjata analis: map untuk transformasi, filter untuk seleksi, reduce untuk agregasi.",
          "Contoh: const bersih = data.filter((x) => x.nilai != null).map((x) => x.nilai);",
        ],
        quiz: [
          {
            q: "Metode array apa yang tepat untuk menjumlahkan seluruh nilai?",
            options: ["map", "filter", "reduce", "forEach"],
            answer: 2,
            explain: "reduce melipat array menjadi satu nilai — ideal untuk agregasi seperti total dan rata-rata.",
          },
          {
            q: "Apa hasil typeof null di JavaScript?",
            options: ['"null"', '"object"', '"undefined"', '"boolean"'],
            answer: 1,
            explain: "typeof null mengembalikan 'object' — quirk historis JS yang wajib dihafal analis.",
          },
        ],
      },
      {
        slug: "fungsi-total",
        no: 2,
        title: "Lab: Fungsi Total Penjualan",
        skkni: "J.620100.003.01",
        body: [
          "Tulis function solve(input) yang menerima array angka dan mengembalikan totalnya.",
          "Abaikan nilai yang bukan number (null, undefined, string).",
          "Contoh: solve([10, null, 20]) mengembalikan 30.",
        ],
        lab: {
          starter: `function solve(input) {\n  // TODO: jumlahkan hanya number\n  return 0;\n}`,
          tests: [
            { name: "dasar", input: [10, 20, 30], expected: 60 },
            { name: "abaikan null", input: [10, null, 20], expected: 30 },
            { name: "kosong", input: [], expected: 0 },
          ],
        },
      },
    ],
  },
};
