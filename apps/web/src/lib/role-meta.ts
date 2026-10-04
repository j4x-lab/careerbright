/*
 * Profession metadata: salary bands, demand, difficulty, popularity.
 * Salaries are IDR/month entry-level estimates for Indonesia (Jakarta +
 * secondary cities blended), vintage 2025–2026 — shown as ranges, never as
 * guaranteed outcomes. Source: Jobstreet/Karir aggregator bands + seed PATHS.
 */

export type DemandLevel = "SANGAT_TINGGI" | "TINGGI" | "SEDANG" | "NISE";

export type RoleMeta = {
  roleId: string;
  salaryMin: number;
  salaryMax: number;
  demand: DemandLevel;
  difficulty: 1 | 2 | 3 | 4 | 5;
  popular?: boolean;
  growthNoteId: string;
};

export const ROLE_META: Record<string, RoleMeta> = {
  "social-media-specialist": { roleId: "social-media-specialist", salaryMin: 4500000, salaryMax: 8000000, demand: "SANGAT_TINGGI", difficulty: 2, popular: true, growthNoteId: "Brand lokal + UMKM butuh selalu; AI tools menaikkan ekspektasi output." },
  "hr-business-partner": { roleId: "hr-business-partner", salaryMin: 7000000, salaryMax: 14000000, demand: "TINGGI", difficulty: 4, growthNoteId: "Butuh pengalaman people-management; entry via recruiter/HR generalist." },
  "frontend-developer": { roleId: "frontend-developer", salaryMin: 6000000, salaryMax: 12000000, demand: "SANGAT_TINGGI", difficulty: 3, popular: true, growthNoteId: "React/Next.js + performance audit jadi pembeda." },
  "associate-product-manager": { roleId: "associate-product-manager", salaryMin: 8000000, salaryMax: 15000000, demand: "TINGGI", difficulty: 4, popular: true, growthNoteId: "Jalur MT/founder-associate paling umum; PRD + metrics wajib." },
  "data-analyst": { roleId: "data-analyst", salaryMin: 6000000, salaryMax: 12000000, demand: "SANGAT_TINGGI", difficulty: 3, popular: true, growthNoteId: "SQL + Sheets + dashboard storytelling; portofolio dashboard menang." },
  "ui-ux-designer": { roleId: "ui-ux-designer", salaryMin: 5500000, salaryMax: 11000000, demand: "SANGAT_TINGGI", difficulty: 3, popular: true, growthNoteId: "Figma + riset + handoff dev; portofolio case study wajib." },
  "account-executive": { roleId: "account-executive", salaryMin: 5000000, salaryMax: 12000000, demand: "TINGGI", difficulty: 3, growthNoteId: "Gaji + komisi; pipeline discipline membedakan." },
  "management-trainee": { roleId: "management-trainee", salaryMin: 7000000, salaryMax: 13000000, demand: "TINGGI", difficulty: 4, popular: true, growthNoteId: "FMCG/bank MT paling kompetitif; rotasi + project review." },
  "junior-accountant": { roleId: "junior-accountant", salaryMin: 5000000, salaryMax: 8000000, demand: "TINGGI", difficulty: 3, growthNoteId: "Brevet pajak + e-Faktur menaikkan nilai." },
  "teller-bank": { roleId: "teller-bank", salaryMin: 4500000, salaryMax: 6500000, demand: "SEDANG", difficulty: 2, growthNoteId: "ODP/MT bank jadi jenjang naik." },
  "content-creator-agency": { roleId: "content-creator-agency", salaryMin: 4500000, salaryMax: 9000000, demand: "SANGAT_TINGGI", difficulty: 2, popular: true, growthNoteId: "Short-video + hook rate; niche vertikal menang." },
  "customer-success": { roleId: "customer-success", salaryMin: 5000000, salaryMax: 9000000, demand: "TINGGI", difficulty: 2, growthNoteId: "SaaS + fintech hiring; retention metrics." },
  "backend-developer": { roleId: "backend-developer", salaryMin: 7000000, salaryMax: 14000000, demand: "SANGAT_TINGGI", difficulty: 4, popular: true, growthNoteId: "API + database + observability; Go/Node/Java." },
  "qa-engineer": { roleId: "qa-engineer", salaryMin: 5500000, salaryMax: 10000000, demand: "TINGGI", difficulty: 3, growthNoteId: "Automation (Playwright) > manual." },
  "copywriter": { roleId: "copywriter", salaryMin: 4500000, salaryMax: 9000000, demand: "TINGGI", difficulty: 2, growthNoteId: "Direct-response + SEO; AI-assisted tapi taste menang." },
  "operations-executive": { roleId: "operations-executive", salaryMin: 5000000, salaryMax: 9000000, demand: "TINGGI", difficulty: 3, growthNoteId: "SOP + vendor + SLA; e-commerce/logistik hiring." },
  "devops-engineer": { roleId: "devops-engineer", salaryMin: 8000000, salaryMax: 16000000, demand: "TINGGI", difficulty: 4, growthNoteId: "CI/CD + cloud + IaC; butuh fondasi Linux." },
  "graphic-designer": { roleId: "graphic-designer", salaryMin: 4500000, salaryMax: 8000000, demand: "TINGGI", difficulty: 2, growthNoteId: "Kecepatan + sistem desain; hindari spec work gratis." },
  "seo-specialist": { roleId: "seo-specialist", salaryMin: 5000000, salaryMax: 10000000, demand: "TINGGI", difficulty: 3, growthNoteId: "Technical + content + digital PR." },
  "hr-recruiter": { roleId: "hr-recruiter", salaryMin: 4500000, salaryMax: 8000000, demand: "TINGGI", difficulty: 2, growthNoteId: "Jalur masuk HRBP; sourcing + closing." },
  "credit-analyst": { roleId: "credit-analyst", salaryMin: 6000000, salaryMax: 11000000, demand: "SEDANG", difficulty: 4, growthNoteId: "Analisa laporan keuangan + 5C." },
  "mobile-developer": { roleId: "mobile-developer", salaryMin: 6500000, salaryMax: 13000000, demand: "TINGGI", difficulty: 4, growthNoteId: "Flutter mendominasi UMKM/startup." },
  "network-engineer": { roleId: "network-engineer", salaryMin: 5500000, salaryMax: 10000000, demand: "SEDANG", difficulty: 4, growthNoteId: "Sertifikasi (CCNA/Mikrotik) + troubleshooting." },
  "cybersecurity-analyst": { roleId: "cybersecurity-analyst", salaryMin: 7000000, salaryMax: 15000000, demand: "SANGAT_TINGGI", difficulty: 4, popular: true, growthNoteId: "SOC + SIEM; talent gap besar." },
  "motion-designer": { roleId: "motion-designer", salaryMin: 5500000, salaryMax: 11000000, demand: "TINGGI", difficulty: 3, growthNoteId: "Ads + explainer; render pipeline." },
  "procurement-staff": { roleId: "procurement-staff", salaryMin: 5000000, salaryMax: 9000000, demand: "SEDANG", difficulty: 3, growthNoteId: "Manufaktur/tambang hiring; etika tender." },
  "financial-planner": { roleId: "financial-planner", salaryMin: 5000000, salaryMax: 15000000, demand: "SEDANG", difficulty: 3, growthNoteId: "Fee + komisi; lisensi AAJI/AEI." },
  "retail-store-supervisor": { roleId: "retail-store-supervisor", salaryMin: 4500000, salaryMax: 7000000, demand: "SEDANG", difficulty: 2, growthNoteId: "Operasional toko + target; jenjang ke area manager." },
  "ai-engineer": { roleId: "ai-engineer", salaryMin: 12000000, salaryMax: 25000000, demand: "SANGAT_TINGGI", difficulty: 5, popular: true, growthNoteId: "Python + LLM/RAG + MLOps; portofolio deploy menang." },
  "data-scientist": { roleId: "data-scientist", salaryMin: 9000000, salaryMax: 20000000, demand: "TINGGI", difficulty: 5, growthNoteId: "Statistik + eksperimen; bedakan dengan analyst." },
  "ai-automation-specialist": { roleId: "ai-automation-specialist", salaryMin: 8000000, salaryMax: 16000000, demand: "SANGAT_TINGGI", difficulty: 4, popular: true, growthNoteId: "Workflow (n8n/Zapier) + chatbot + eval." },
  "cloud-solutions-architect": { roleId: "cloud-solutions-architect", salaryMin: 12000000, salaryMax: 25000000, demand: "TINGGI", difficulty: 5, growthNoteId: "Sertifikasi cloud + costing; butuh pengalaman infra." },
  "esg-analyst": { roleId: "esg-analyst", salaryMin: 7000000, salaryMax: 14000000, demand: "TINGGI", difficulty: 4, growthNoteId: "Regulasi keberlanjutan + data emisi." },
  "robotics-engineer": { roleId: "robotics-engineer", salaryMin: 8000000, salaryMax: 16000000, demand: "SEDANG", difficulty: 5, growthNoteId: "ROS + embedded; manufaktur/otomotif." },
  "embedded-iot-engineer": { roleId: "embedded-iot-engineer", salaryMin: 7000000, salaryMax: 14000000, demand: "TINGGI", difficulty: 5, growthNoteId: "Firmware + sensor + connectivity." },
  "data-engineer": { roleId: "data-engineer", salaryMin: 9000000, salaryMax: 18000000, demand: "SANGAT_TINGGI", difficulty: 4, growthNoteId: "Pipeline + warehouse; SQL + Python + orchestration." },
  "game-developer": { roleId: "game-developer", salaryMin: 6000000, salaryMax: 13000000, demand: "SEDANG", difficulty: 4, growthNoteId: "Unity/Unreal + playable demo." },
  "site-reliability-engineer": { roleId: "site-reliability-engineer", salaryMin: 10000000, salaryMax: 20000000, demand: "TINGGI", difficulty: 5, growthNoteId: "SLO + incident response; dari backend/infra." },
  "solutions-architect": { roleId: "solutions-architect", salaryMin: 12000000, salaryMax: 22000000, demand: "TINGGI", difficulty: 5, growthNoteId: "Pre-sales + desain solusi enterprise." },
  "it-business-analyst": { roleId: "it-business-analyst", salaryMin: 7000000, salaryMax: 13000000, demand: "TINGGI", difficulty: 3, growthNoteId: "Bridging bisnis↔dev; dokumentasi + UAT." },
  "management-consultant": { roleId: "management-consultant", salaryMin: 10000000, salaryMax: 20000000, demand: "TINGGI", difficulty: 5, growthNoteId: "Slide + hipotesis + MECE; jam panjang." },
  "corporate-strategy-analyst": { roleId: "corporate-strategy-analyst", salaryMin: 9000000, salaryMax: 18000000, demand: "SEDANG", difficulty: 5, growthNoteId: "Model + board deck; dari analis/consulting." },
  "investment-analyst": { roleId: "investment-analyst", salaryMin: 9000000, salaryMax: 20000000, demand: "SEDANG", difficulty: 5, growthNoteId: "Valuasi + memo investasi." },
  "actuarial-associate": { roleId: "actuarial-associate", salaryMin: 8000000, salaryMax: 16000000, demand: "SEDANG", difficulty: 5, growthNoteId: "Ujian PAI bertahap; asuransi/dapen." },
  "external-auditor": { roleId: "external-auditor", salaryMin: 6000000, salaryMax: 11000000, demand: "TINGGI", difficulty: 4, growthNoteId: "KAP Big Four; busy season berat." },
  "tax-consultant": { roleId: "tax-consultant", salaryMin: 6000000, salaryMax: 12000000, demand: "TINGGI", difficulty: 4, growthNoteId: "Brevet C + sengketa pajak." },
  "treasury-analyst": { roleId: "treasury-analyst", salaryMin: 7000000, salaryMax: 13000000, demand: "SEDANG", difficulty: 4, growthNoteId: "Likuiditas + FX; korporat/bank." },
  "assistant-brand-manager": { roleId: "assistant-brand-manager", salaryMin: 7000000, salaryMax: 13000000, demand: "TINGGI", difficulty: 4, growthNoteId: "FMCG ABM jalur klasik; P&L brand." },
  "pr-specialist": { roleId: "pr-specialist", salaryMin: 5500000, salaryMax: 10000000, demand: "SEDANG", difficulty: 3, growthNoteId: "Media relations + crisis comms." },
  "video-editor": { roleId: "video-editor", salaryMin: 4500000, salaryMax: 9000000, demand: "TINGGI", difficulty: 3, growthNoteId: "Retention editing; niche ads/podcast." },
  "content-strategist": { roleId: "content-strategist", salaryMin: 6000000, salaryMax: 12000000, demand: "TINGGI", difficulty: 3, growthNoteId: "Pilar + distribusi + repurposing." },
  "kol-specialist": { roleId: "kol-specialist", salaryMin: 5500000, salaryMax: 11000000, demand: "TINGGI", difficulty: 3, growthNoteId: "Rate card + kontrak + FTC disclosure." },
  "junior-art-director": { roleId: "junior-art-director", salaryMin: 6000000, salaryMax: 11000000, demand: "SEDANG", difficulty: 4, growthNoteId: "Konsep visual + direct desainer." },
  "ux-researcher": { roleId: "ux-researcher", salaryMin: 7000000, salaryMax: 14000000, demand: "TINGGI", difficulty: 4, growthNoteId: "Riset generatif + evaluatif; insight→desain." },
};

export function getRoleMeta(roleId: string): RoleMeta | null {
  return ROLE_META[roleId] ?? null;
}

export function formatSalaryRange(min: number, max: number): string {
  const short = (n: number) => (n >= 1000000 ? `${Math.round(n / 1000000)}jt` : `${Math.round(n / 1000)}rb`);
  return `Rp${short(min)}–${short(max)}/bln`;
}

export const DEMAND_LABEL: Record<DemandLevel, string> = {
  SANGAT_TINGGI: "Permintaan sangat tinggi",
  TINGGI: "Permintaan tinggi",
  SEDANG: "Permintaan stabil",
  NISE: "Niche",
};

export const DEMAND_DOTS: Record<DemandLevel, number> = {
  SANGAT_TINGGI: 5,
  TINGGI: 4,
  SEDANG: 3,
  NISE: 2,
};
