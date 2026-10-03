import { prisma } from "./index.ts";

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

const MILESTONES: Record<string, { titleId: string; skkni: string }[]> = {
  "ai-engineer": [
    { titleId: "Python & Matematika ML", skkni: "J.620100.001.01" },
    { titleId: "Data Pipeline & Feature Engineering", skkni: "J.620100.003.01" },
    { titleId: "Training & Evaluasi Model", skkni: "SKKNI-2020-299-U3" },
    { titleId: "Capstone: Deploy Model + MLOps", skkni: "Portofolio + Asesmen AI" },
  ],
  "soc-analyst": [
    { titleId: "Dasar Jaringan & Linux", skkni: "J.620100.001.01" },
    { titleId: "SIEM & Deteksi Insiden", skkni: "SKKNI-CYB-U2" },
    { titleId: "Respons Insiden & Forensik Dasar", skkni: "SKKNI-CYB-U3" },
    { titleId: "Capstone: Simulasi SOC Shift", skkni: "Simulasi + Asesmen AI" },
  ],
  "ehs-specialist": [
    { titleId: "Dasar K3 & Regulasi", skkni: "SKKNI-K3-U1" },
    { titleId: "HIRADC & Investigasi Insiden", skkni: "SKKNI-K3-U2" },
    { titleId: "Manajemen Lingkungan & Limbah", skkni: "SKKNI-K3-U3" },
    { titleId: "Capstone: Audit K3 Mock Site", skkni: "Portofolio + Asesmen AI" },
  ],
  "junior-accountant": [
    { titleId: "Akuntansi Keuangan Dasar", skkni: "M.691090.001.01" },
    { titleId: "PPh, PPN & e-Faktur", skkni: "M.691090.005.01" },
    { titleId: "Pelaporan PSAK/IFRS + Excel/PowerBI", skkni: "M.691090.007.01" },
    { titleId: "Capstone: SPT Klien Mock", skkni: "Portofolio + Asesmen AI" },
  ],
  "it-project-manager": [
    { titleId: "Agile/Scrum & Jira", skkni: "SKKNI-PM-U1" },
    { titleId: "Budgeting, Risiko & Stakeholder", skkni: "SKKNI-PM-U2" },
    { titleId: "Delivery & Retrospektif", skkni: "SKKNI-PM-U3" },
    { titleId: "Capstone: Rencana Proyek Digital", skkni: "Simulasi + Asesmen AI" },
  ],
  "mining-coordinator": [
    { titleId: "Operasi Tambang & Shift Planning", skkni: "SKKNI-TAMBANG-U1" },
    { titleId: "K3 Tambang & Pelaporan", skkni: "SKKNI-K3-U1" },
    { titleId: "Koordinasi Alat Berat & Kontraktor", skkni: "SKKNI-TAMBANG-U2" },
    { titleId: "Capstone: Rencana Shift 7 Hari", skkni: "Portofolio + Asesmen AI" },
  ],
  "performance-marketer": [
    { titleId: "Meta/Google/TikTok Ads + GA4", skkni: "M.70MKT00.012.1" },
    { titleId: "Atribusi & Budgeting Iklan", skkni: "M.70MKT00.013.1" },
    { titleId: "Copywriting & Kreatif Iklan", skkni: "M.73ADV00.024.1" },
    { titleId: "Capstone: Kampanye Mock Rp50jt", skkni: "Portofolio + Asesmen AI" },
  ],
  "b2b-sales": [
    { titleId: "Prospecting & Discovery", skkni: "SKKNI-SALES-U1" },
    { titleId: "Negosiasi & Proposal", skkni: "SKKNI-SALES-U2" },
    { titleId: "CRM & Pipeline Management", skkni: "SKKNI-SALES-U3" },
    { titleId: "Capstone: Mock Pitch ke Klien", skkni: "Simulasi + Asesmen AI" },
  ],
};

// Wave release gate: the 25 launched Wave-1 roles, released. New roles ship
// with NO row (locked) until an admin releases them from the dashboard.
// Mirrors seed.sql and DEFAULT_RELEASED_ROLE_IDS in apps/web/src/lib/releases.ts.
const RELEASED_ROLES = [
  "social-media-specialist",
  "hr-business-partner",
  "frontend-developer",
  "associate-product-manager",
  "data-analyst",
  "ui-ux-designer",
  "account-executive",
  "management-trainee",
  "teller-bank",
  "backend-developer",
  "qa-engineer",
  "copywriter",
  "operations-executive",
  "devops-engineer",
  "graphic-designer",
  "seo-specialist",
  "hr-recruiter",
  "credit-analyst",
  "mobile-developer",
  "network-engineer",
  "cybersecurity-analyst",
  "motion-designer",
  "procurement-staff",
  "financial-planner",
  "retail-store-supervisor",
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
    const path = await prisma.learningPath.upsert({
      where: { slug: p.slug },
      update: { ...p, category: p.category as never },
      create: { ...p, category: p.category as never },
    });
    const ms = MILESTONES[p.slug] ?? [];
    for (let i = 0; i < ms.length; i++) {
      await prisma.learningPathMilestone.upsert({
        where: { learningPathId_order: { learningPathId: path.id, order: i + 1 } },
        update: { titleId: ms[i].titleId, skkniUnitCode: ms[i].skkni },
        create: {
          learningPathId: path.id,
          titleId: ms[i].titleId,
          order: i + 1,
          skkniUnitCode: ms[i].skkni,
        },
      });
    }
  }
  console.log(`Seeded ${FRAMEWORKS.length} frameworks, ${PATHS.length} paths + milestones`);
  for (const roleId of RELEASED_ROLES) {
    await prisma.roleRelease.upsert({
      where: { roleId },
      update: { released: true },
      create: { roleId, released: true },
    });
  }
  console.log(`Seeded ${RELEASED_ROLES.length} role releases (Wave 1)`);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
