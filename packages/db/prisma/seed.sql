-- Career SuperBright seed (mirrors packages/db/src/seed.ts).
-- Applied via psql because Prisma runtime engines cannot load on Android.
-- IDs are stable/semantic so re-runs are idempotent via ON CONFLICT DO NOTHING.

INSERT INTO "CompetencyFramework" (id, code, name, "nameEn", sector, "kkniLevel") VALUES
  ('fw-ict-prog', 'SKKNI-2016-282', 'Pengembangan Perangkat Lunak — Pemrograman', 'Software Development — Programming', 'ICT', 6),
  ('fw-cloud', 'SKKNI-2023-102', 'Komputasi Awan', 'Cloud Computing', 'ICT', 6),
  ('fw-iot', 'SKKNI-2020-300', 'Internet of Things', 'Internet of Things', 'ICT', 6),
  ('fw-ai', 'SKKNI-2020-299', 'Kecerdasan Artifisial', 'Artificial Intelligence', 'ICT', 6),
  ('fw-mkt', 'SKKNI-2022-124', 'Pemasaran Digital', 'Digital Marketing', 'Marketing', 5),
  ('fw-acc', 'SKKNI-AKUNTANSI', 'Akuntansi dan Perpajakan', 'Accounting and Taxation', 'Finance', 6),
  ('fw-k3', 'SKKNI-K3', 'Keselamatan dan Kesehatan Kerja', 'Occupational Safety and Health', 'HSE', 5),
  ('fw-mine', 'SKKNI-TAMBANG', 'Koordinator Operasional Tambang', 'Mining Operations Coordinator', 'Mining', 5),
  ('fw-pm', 'SKKNI-PM', 'Manajemen Proyek', 'Project Management', 'Management', 6)
ON CONFLICT (code) DO NOTHING;

INSERT INTO "LearningPath" (id, slug, "titleId", "titleEn", category, "targetRole", "targetKkniLevel", "salaryMin", "salaryMax", "estimatedWeeks", "lspCertPrice") VALUES
  ('lp-ai-engineer', 'ai-engineer', 'AI Engineer', 'AI Engineer', 'TECH', 'AI Engineer', 6, 12000000, 25000000, 24, NULL),
  ('lp-soc-analyst', 'soc-analyst', 'Analis SOC', 'SOC Analyst', 'TECH', 'SOC Analyst', 6, 8000000, 18000000, 20, NULL),
  ('lp-ehs-specialist', 'ehs-specialist', 'Spesialis EHS', 'EHS Specialist', 'GREEN', 'EHS Specialist', 6, 7000000, 15000000, 20, 2000000),
  ('lp-junior-accountant', 'junior-accountant', 'Akuntan Junior (Fokus Pajak)', 'Junior Accountant (Tax Focus)', 'FINANCE', 'Junior Accountant', 6, 6000000, 9000000, 24, 1250000),
  ('lp-it-project-manager', 'it-project-manager', 'IT Project Manager', 'IT Project Manager', 'PM', 'IT Project Manager', 6, 10000000, 25000000, 16, 1750000),
  ('lp-mining-coordinator', 'mining-coordinator', 'Koordinator Tambang', 'Mining Coordinator', 'MINING', 'Mining Coordinator', 5, 7000000, 14000000, 16, 2500000),
  ('lp-performance-marketer', 'performance-marketer', 'Performance Marketer', 'Performance Marketer', 'MARKETING', 'Performance Marketer', 5, 6000000, 15000000, 12, 1250000),
  ('lp-b2b-sales', 'b2b-sales', 'B2B Sales', 'B2B Sales', 'SALES', 'B2B Sales Specialist', 5, 7000000, 15000000, 8, NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO "LearningPathMilestone" (id, "learningPathId", "titleId", "order", "skkniUnitCode") VALUES
  ('ms-ai-1', 'lp-ai-engineer', 'Python & Matematika ML', 1, 'J.620100.001.01'),
  ('ms-ai-2', 'lp-ai-engineer', 'Data Pipeline & Feature Engineering', 2, 'J.620100.003.01'),
  ('ms-ai-3', 'lp-ai-engineer', 'Training & Evaluasi Model', 3, 'SKKNI-2020-299-U3'),
  ('ms-ai-4', 'lp-ai-engineer', 'Capstone: Deploy Model + MLOps', 4, 'Portofolio + Asesmen AI'),
  ('ms-soc-1', 'lp-soc-analyst', 'Dasar Jaringan & Linux', 1, 'J.620100.001.01'),
  ('ms-soc-2', 'lp-soc-analyst', 'SIEM & Deteksi Insiden', 2, 'SKKNI-CYB-U2'),
  ('ms-soc-3', 'lp-soc-analyst', 'Respons Insiden & Forensik Dasar', 3, 'SKKNI-CYB-U3'),
  ('ms-soc-4', 'lp-soc-analyst', 'Capstone: Simulasi SOC Shift', 4, 'Simulasi + Asesmen AI'),
  ('ms-ehs-1', 'lp-ehs-specialist', 'Dasar K3 & Regulasi', 1, 'SKKNI-K3-U1'),
  ('ms-ehs-2', 'lp-ehs-specialist', 'HIRADC & Investigasi Insiden', 2, 'SKKNI-K3-U2'),
  ('ms-ehs-3', 'lp-ehs-specialist', 'Manajemen Lingkungan & Limbah', 3, 'SKKNI-K3-U3'),
  ('ms-ehs-4', 'lp-ehs-specialist', 'Capstone: Audit K3 Mock Site', 4, 'Portofolio + Asesmen AI'),
  ('ms-acc-1', 'lp-junior-accountant', 'Akuntansi Keuangan Dasar', 1, 'M.691090.001.01'),
  ('ms-acc-2', 'lp-junior-accountant', 'PPh, PPN & e-Faktur', 2, 'M.691090.005.01'),
  ('ms-acc-3', 'lp-junior-accountant', 'Pelaporan PSAK/IFRS + Excel/PowerBI', 3, 'M.691090.007.01'),
  ('ms-acc-4', 'lp-junior-accountant', 'Capstone: SPT Klien Mock', 4, 'Portofolio + Asesmen AI'),
  ('ms-pm-1', 'lp-it-project-manager', 'Agile/Scrum & Jira', 1, 'SKKNI-PM-U1'),
  ('ms-pm-2', 'lp-it-project-manager', 'Budgeting, Risiko & Stakeholder', 2, 'SKKNI-PM-U2'),
  ('ms-pm-3', 'lp-it-project-manager', 'Delivery & Retrospektif', 3, 'SKKNI-PM-U3'),
  ('ms-pm-4', 'lp-it-project-manager', 'Capstone: Rencana Proyek Digital', 4, 'Simulasi + Asesmen AI'),
  ('ms-mine-1', 'lp-mining-coordinator', 'Operasi Tambang & Shift Planning', 1, 'SKKNI-TAMBANG-U1'),
  ('ms-mine-2', 'lp-mining-coordinator', 'K3 Tambang & Pelaporan', 2, 'SKKNI-K3-U1'),
  ('ms-mine-3', 'lp-mining-coordinator', 'Koordinasi Alat Berat & Kontraktor', 3, 'SKKNI-TAMBANG-U2'),
  ('ms-mine-4', 'lp-mining-coordinator', 'Capstone: Rencana Shift 7 Hari', 4, 'Portofolio + Asesmen AI'),
  ('ms-mkt-1', 'lp-performance-marketer', 'Meta/Google/TikTok Ads + GA4', 1, 'M.70MKT00.012.1'),
  ('ms-mkt-2', 'lp-performance-marketer', 'Atribusi & Budgeting Iklan', 2, 'M.70MKT00.013.1'),
  ('ms-mkt-3', 'lp-performance-marketer', 'Copywriting & Kreatif Iklan', 3, 'M.73ADV00.024.1'),
  ('ms-mkt-4', 'lp-performance-marketer', 'Capstone: Kampanye Mock Rp50jt', 4, 'Portofolio + Asesmen AI'),
  ('ms-sales-1', 'lp-b2b-sales', 'Prospecting & Discovery', 1, 'SKKNI-SALES-U1'),
  ('ms-sales-2', 'lp-b2b-sales', 'Negosiasi & Proposal', 2, 'SKKNI-SALES-U2'),
  ('ms-sales-3', 'lp-b2b-sales', 'CRM & Pipeline Management', 3, 'SKKNI-SALES-U3'),
  ('ms-sales-4', 'lp-b2b-sales', 'Capstone: Mock Pitch ke Klien', 4, 'Simulasi + Asesmen AI')
ON CONFLICT (id) DO NOTHING;
