import { prisma } from "./index";

const FRAMEWORKS = [
  { code: "SKKNI-2016-282", name: "Pengembangan Perangkat Lunak — Pemrograman", nameEn: "Software Development — Programming", sector: "ICT", kkniLevel: 6 },
  { code: "SKKNI-2023-102", name: "Komputasi Awan", nameEn: "Cloud Computing", sector: "ICT", kkniLevel: 6 },
  { code: "SKKNI-2020-300", name: "Internet of Things", nameEn: "Internet of Things", sector: "ICT", kkniLevel: 6 },
  { code: "SKKNI-2020-299", name: "Kecerdasan Artifisial", nameEn: "Artificial Intelligence", sector: "ICT", kkniLevel: 6 },
  { code: "SKKNI-2022-124", name: "Pemasaran Digital", nameEn: "Digital Marketing", sector: "Marketing", kkniLevel: 5 },
  { code: "SKKNI-AKUNTANSI", name: "Akuntansi dan Perpajakan", nameEn: "Accounting and Taxation", sector: "Finance", kkniLevel: 6 },
  { code: "SKKNI-K3", name: "Keselamatan dan Kesehatan Kerja", nameEn: "Occupational Safety and Health", sector: "HSE", kkniLevel: 5 },
  { code: "SKKNI-TAMBANG", name: "Koordinator Operasional Tambang", nameEn: "Mining Operations Coordinator", sector: "Mining", kkniLevel: 5 },
  { code: "SKKNI-PM", name: "Manajemen Proyek", nameEn: "Project Management", sector: "Management", kkniLevel: 6 },
];

const PATHS = [
  { slug: "ai-engineer", titleId: "AI Engineer", titleEn: "AI Engineer", category: "TECH", targetRole: "AI Engineer", targetKkniLevel: 6, salaryMin: 12000000, salaryMax: 25000000, estimatedWeeks: 24 },
  { slug: "soc-analyst", titleId: "Analis SOC", titleEn: "SOC Analyst", category: "TECH", targetRole: "SOC Analyst", targetKkniLevel: 6, salaryMin: 8000000, salaryMax: 18000000, estimatedWeeks: 20 },
  { slug: "ehs-specialist", titleId: "Spesialis EHS", titleEn: "EHS Specialist", category: "GREEN", targetRole: "EHS Specialist", targetKkniLevel: 6, salaryMin: 7000000, salaryMax: 15000000, estimatedWeeks: 20, lspCertPrice: 2000000 },
  { slug: "junior-accountant", titleId: "Akuntan Junior (Fokus Pajak)", titleEn: "Junior Accountant (Tax Focus)", category: "FINANCE", targetRole: "Junior Accountant", targetKkniLevel: 6, salaryMin: 6000000, salaryMax: 9000000, estimatedWeeks: 24, lspCertPrice: 1250000 },
  { slug: "it-project-manager", titleId: "IT Project Manager", titleEn: "IT Project Manager", category: "PM", targetRole: "IT Project Manager", targetKkniLevel: 6, salaryMin: 10000000, salaryMax: 25000000, estimatedWeeks: 16, lspCertPrice: 1750000 },
  { slug: "mining-coordinator", titleId: "Koordinator Tambang", titleEn: "Mining Coordinator", category: "MINING", targetRole: "Mining Coordinator", targetKkniLevel: 5, salaryMin: 7000000, salaryMax: 14000000, estimatedWeeks: 16, lspCertPrice: 2500000 },
  { slug: "performance-marketer", titleId: "Performance Marketer", titleEn: "Performance Marketer", category: "MARKETING", targetRole: "Performance Marketer", targetKkniLevel: 5, salaryMin: 6000000, salaryMax: 15000000, estimatedWeeks: 12, lspCertPrice: 1250000 },
  { slug: "b2b-sales", titleId: "B2B Sales", titleEn: "B2B Sales", category: "SALES", targetRole: "B2B Sales Specialist", targetKkniLevel: 5, salaryMin: 7000000, salaryMax: 15000000, estimatedWeeks: 8 },
];

async function main() {
  for (const f of FRAMEWORKS) {
    await prisma.competencyFramework.upsert({
      where: { code: f.code },
      update: f,
      create: f,
    });
  }
  for (const p of PATHS) {
    await prisma.learningPath.upsert({
      where: { slug: p.slug },
      update: { ...p, category: p.category as never },
      create: { ...p, category: p.category as never },
    });
  }
  console.log(`Seeded ${FRAMEWORKS.length} frameworks, ${PATHS.length} paths`);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
