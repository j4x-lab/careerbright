Product Requirements Document (PRD): Career SuperBright
Model: Discovery-First Career Simulator
Target Market: Indonesia (S1/D3 Fresh Graduates)
Production Year: 2026
1. Product Vision & Executive Summary
Career SuperBright is an Interactive Role Discovery & Career Simulator platform. Indonesian college students often know job titles (e.g., "Product Manager", "HR Business Partner", "Data Analyst") but have zero visibility into the actual day-to-day work, tools, and workplace politics.
Instead of heavy coding tests or long essays, Career SuperBright allows students to rapidly explore 50+ roles through "Day in the Life" timelines, view real-world artifacts, and play 3-minute interactive "Micro-Scenarios" to experience the pressure and decisions of the job firsthand.
2. Core Problem & Market Reality
 * The Title Illusion: Students pick careers based on prestige or salary (e.g., "I want to be a UI/UX Designer") without knowing what the job actually entails (e.g., arguing with frontend developers over padding, managing stakeholder feedback).
 * High Friction in Existing Solutions: Legacy platforms require users to commit 40 hours to a course just to see what a job looks like.
 * The Solution: A high-breadth, low-friction discovery engine. Students can explore 10 different careers in an hour before deciding which one to pursue seriously.
3. The 3-Tier Product Architecture
The platform is built on a progressive engagement funnel:
Tier 1: Role Discovery (Breadth - 50+ Roles)
 * What it is: High-fidelity profile pages for dozens of roles across Tech, FMCG, Agency, and Corporate Banking.
 * Key Features:
   * "Day in the Life" timeline (e.g., 09:00 Standup, 13:00 Client Sync).
   * Myth vs. Reality breakdown.
   * Tool stack (e.g., Jira, Figma, Excel, SAP).
   * Real Anonymized Deliverables (e.g., "See a real Social Media Content Calendar").
Tier 2: Micro-Scenarios (Interactive - 30+ Roles)
 * What it is: 3-minute, multiple-choice decision simulators.
 * Key Features:
   * Chat/Email simulation providing context (e.g., "Client demands a revision at 5 PM on Friday").
   * Multiple-choice decision paths with immediate trade-off analysis.
   * "Practitioner Insight" debrief explaining how a real Indonesian professional handles it.
Tier 3: Deep Workplace Tasks (Depth - Roadmap Phase 2)
 * Excluded from MVP. Deep artifact generation (writing PRDs, submitting code) reserved for users who subscribe to master a specific track.
4. UI/UX Specifications for Coding Agent
Agent Instruction: Build the Next.js prototype focusing on the following core screens.
4.1 Landing Page (/)
 * Hero Section: Headline: "Eksplorasi Karir Impianmu. Simulasikan Kerjanya." Search bar directly in the hero: Cari role (ex: Data Analyst, Social Media, HR...)
 * Role Categories (Grid/Cards): Tech & Product, Creative & Marketing, Business & Operations, Finance & Banking.
 * Value Prop 3-Steps: 1. Kenali Pekerjaannya (Discover) -> 2. Simulasikan Tantangannya (Simulate) -> 3. Temukan Karir Tepatmu (Decide).
4.2 Role Catalog / Directory (/roles)
 * Filters: Sidebar filters for Industry, Major (Jurusan), and Work Style (Introvert/Extrovert friendly, Client-facing vs. Internal).
 * Listings: Minimalist cards showing Role Title, Industry, average starting salary range, and a 1-sentence "Real Job Description".
4.3 Role Detail Page (/role/[id])
Layout: 2-Column or wide center-column with sticky navigation tabs.
 * Hero Profile: Job title, tags, and "The Reality" summary.
 * Tab 1: Snapshot & Timeline:
   * "Myth vs Reality" UI component (Left/Right comparison).
   * Vertical timeline component showing a typical 9-to-5 schedule.
 * Tab 2: Tools & Deliverables: Grid of icons (Jira, Meta Ads, etc.) and a blurred/watermarked preview of a real deliverable (e.g., "View Example PRD").
 * Tab 3: Micro-Scenarios: A list of playable 3-minute challenges. CTA: "Play Scenario: The Angry Client."
4.4 Micro-Scenario Player (/scenario/[id])
Layout: Immersive modal or full-screen view.
 * Context Panel: Simulates an inbox or Slack thread.
 * Decision Panel: 4 clear buttons (Options A, B, C, D).
 * Result Overlay: Shows immediately after clicking. Indicates if the choice was Optimal, Risky, or Poor. Displays the "SME Debrief" explaining the real-world trade-offs in Indonesian corporate culture.
5. Mock JSON Data Architecture
Agent Instruction: Use the following JSON schemas to seed the prototype. This allows immediate UI rendering without a backend.
5.1 roles.json (Tier 1 Data)
[
  {
    "id": "social-media-specialist",
    "category": "Creative & Marketing",
    "title": "Social Media Specialist",
    "shortDescription": "Bukan cuma main TikTok, tapi mengelola budget, krisis PR, dan kalender konten.",
    "tools": ["Meta Ads Manager", "Figma", "Sprout Social", "CapCut"],
    "mythVsReality": {
      "myth": "Kerjanya jalan-jalan, bikin konten estetik, dan scrolling medsos seharian.",
      "reality": "90% waktunya habis untuk menganalisa data engagement, revisi caption dari klien, dan pusing mengejar metrics."
    },
    "timeline": [
      { "time": "09:00 WIB", "event": "Cek daily metrics (Engagement, CTR) dari campaign kemarin." },
      { "time": "10:30 WIB", "event": "Sync dengan tim design untuk revisi aset visual." },
      { "time": "14:00 WIB", "event": "Drafting kalender konten bulan depan untuk approval Manager." },
      { "time": "16:30 WIB", "event": "Community management: Balas komen dan komplain customer di Instagram." }
    ]
  },
  {
    "id": "hr-business-partner",
    "category": "Business & Operations",
    "title": "HR Business Partner (HRBP)",
    "shortDescription": "Jembatan antara manajemen perusahaan dan kebutuhan karyawan. Fokus pada strategi, bukan cuma absen.",
    "tools": ["Workday", "Excel", "Lattice"],
    "mythVsReality": {
      "myth": "HR itu cuma urus gaji, cuti, dan kasih SP.",
      "reality": "HRBP harus ngerti target bisnis perusahaan dan bantu Manager tim lain mengatur strategi hiring & firing."
    },
    "timeline": [
      { "time": "09:00 WIB", "event": "Review data turnover karyawan divisi Tech." },
      { "time": "11:00 WIB", "event": "1-on-1 dengan Engineering Manager bahas karyawan underperform." },
      { "time": "14:00 WIB", "event": "Meeting komite performance appraisal." }
    ]
  }
]

5.2 micro_scenarios.json (Tier 2 Data)
[
  {
    "id": "sosmed-crisis-1",
    "roleId": "social-media-specialist",
    "title": "Krisis PR: Salah Upload di Akun Brand",
    "context": {
      "message": "Kamu tidak sengaja membalas komentar hater menggunakan akun official brand (seharusnya pakai akun pribadi). Komentar tersebut sudah di-screenshot oleh netizen dan mulai viral di Twitter.",
      "sender": "Simulated Reality",
      "time": "19:30 WIB"
    },
    "options": [
      {
        "id": "A",
        "text": "Langsung hapus komentar, pura-pura tidak tahu, dan matikan notifikasi HP.",
        "type": "Fatal"
      },
      {
        "id": "B",
        "text": "Screenshot buktinya, laporkan ke Manager/PR, lalu siapkan draft permintaan maaf resmi.",
        "type": "Optimal"
      },
      {
        "id": "C",
        "text": "Balas lagi menggunakan akun official, ajak berdebat netizen untuk membela diri.",
        "type": "Fatal"
      },
      {
        "id": "D",
        "text": "Langsung post permintaan maaf di timeline tanpa lapor atasan agar cepat selesai.",
        "type": "Risky"
      }
    ],
    "feedback": {
      "Optimal": "Tepat. Di agensi atau korporat, SOP krisis mengharuskan kamu eskalasi ke atasan atau tim PR sebelum mengambil tindakan publik. Transparansi internal adalah kunci.",
      "Fatal": "Jejak digital itu abadi. Menghapus tanpa mitigasi internal akan membuat brand terlihat pengecut saat screenshotnya viral, dan kamu bisa langsung di-SP.",
      "PractitionerQuote": "Di industri agensi Jakarta, kalau ada blunder digital, hukum pertamanya: Jangan pernah ambil keputusan publik sendirian. Langsung telpon atasan, sediakan kronologi, dan tunggu arahan komunikasi resmi."
    }
  }
]

6. Technical & AI Architecture
 * Frontend: Next.js (App Router), Tailwind CSS, Shadcn/UI for rapid component scaffolding.
 * Database (Post-MVP): PostgreSQL to store user exploration history and scenario completions.
 * The Scalability Engine (AI Content Generator): To generate 50+ roles without hiring 50 writers, the backend will utilize the Gemini API. An internal Admin Dashboard will allow staff to input a job title (e.g., "Account Executive"), and Gemini will generate the JSON schema (Timeline, Myth/Reality, Micro-scenarios) for human review and publication.
7. MVP Key Success Metrics
 * Exploration Breadth: Average number of unique Role Pages visited per session (Target: >4 roles).
 * Scenario Play Rate: % of users who complete at least one Micro-Scenario after viewing a role page (Target: >50%).
 * Completion Velocity: Time taken to complete a Micro-Scenario (Target: <3 minutes, ensuring low friction).

