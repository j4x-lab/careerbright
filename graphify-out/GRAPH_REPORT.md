# Graph Report - careerbright  (2026-10-02)

## Corpus Check
- 71 files · ~27,232 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: .example 1, (none) 1, .css 1)

## Summary
- 669 nodes · 786 edges · 69 communities (51 shown, 18 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9ec7ddbd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- FEATURE.md
- web/package.json
- routers/index.ts
- smoke.ts
- belajar/[slug]/page.tsx
- Career SuperBright — Master Build Plan
- app/page.tsx
- db/package.json
- package.json
- compilerOptions
- tasks
- app/layout.tsx
- dependencies
- OpsShell
- User
- AuthForm
- 51. Suggested Technical Architecture
- Differentiators
- payments/package.json
- ai/package.json
- 11. Learning Experience
- Vision
- 6. Product Pillars
- 34. Pricing Strategy
- 42. Admin Platform
- 45. Key Product Metrics
- 57. Content Partnership Strategy
- v0.2.0 — Midnight Paper Redesign (2026-10-02)
- 18. Certificates
- MVP Features
- 56. Example Indonesian Learning Projects
- 63.25 MVP Kill / Pivot Signals
- 7. Course Categories
- notify/package.json
- ui/package.json
- 26. Course Quality System
- 47. MVP Content
- 60. Business Model
- 63.14 AI Assistant
- 63.4 Learning Engagement
- 16. Career Map
- 43. Analytics
- 4.1 Students
- 63.11 Retention
- 63.19 Technical Performance
- 63.24 MVP Launch Gates
- 14. Indonesian AI Features
- 21. Company Skill Requirements
- 63.2 North Star Metric
- 63.3 Acquisition
- 9. SuperBright Learning Paths
- postcss.config.mjs
- 10. SuperBright "Indonesia Context Layer"
- 1. Executive Summary
- 24. Instructor Platform
- 44. Core Metrics
- 5. Core Product Concept
- 62. Brand
- 63. MVP Success Criteria
- 63. Brand Positioning
- 8. Indonesia-Specific Categories
- SuperBright
- SuperBright
- notify/src/index.ts
- ui/src/index.ts
- kill-dev.sh

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `react` - 14 edges
3. `Career SuperBright — Master Build Plan` - 14 edges
4. `OpsShell()` - 11 edges
5. `51. Suggested Technical Architecture` - 11 edges
6. `User` - 11 edges
7. `Differentiators` - 9 edges
8. `AuthForm()` - 8 edges
9. `scripts` - 8 edges
10. `tasks` - 8 edges

## Surprising Connections (you probably didn't know these)
- `App wiring that agents miss` --references--> `verifyMidtransSignature()`  [INFERRED]
  AGENTS.md → packages/payments/src/server.ts
- `App wiring that agents miss` --references--> `createSnapTransaction()`  [INFERRED]
  AGENTS.md → packages/payments/src/server.ts
- `Database — SQL is source of truth` --references--> `Session`  [INFERRED]
  AGENTS.md → apps/web/src/server/auth.ts
- `App wiring that agents miss` --references--> `formatIDR()`  [INFERRED]
  AGENTS.md → packages/payments/src/index.ts
- `App wiring that agents miss` --references--> `snapJsUrl()`  [INFERRED]
  AGENTS.md → packages/payments/src/index.ts

## Import Cycles
- None detected.

## Communities (69 total, 18 thin omitted)

### Community 0 - "FEATURE.md"
Cohesion: 0.03
Nodes (61): 12. Learning Formats, 13. AI Learning Assistant, 15. Skill Graph, 17. Portfolio, 19. Certificate Verification, 20. Employer Platform, 22. Government Platform, 23. University Integration (+53 more)

### Community 1 - "web/package.json"
Cohesion: 0.06
Nodes (38): devDependencies, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom, typescript, typescript (+30 more)

### Community 2 - "routers/index.ts"
Cohesion: 0.06
Nodes (31): dynamic, GET, POST, runtime, Body, orderNumber(), POST(), dynamic (+23 more)

### Community 3 - "smoke.ts"
Cohesion: 0.07
Nodes (31): AGENTS.md — CareerBright (SuperBright), App wiring that agents miss, Commands (run from repo root), Conventions, Database — SQL is source of truth, NAV, STATS, StudentDashboard() (+23 more)

### Community 4 - "belajar/[slug]/page.tsx"
Cohesion: 0.10
Nodes (24): BelajarPage(), COURSE_META, EXPERIENCE, Badge(), CATEGORIES, KatalogSearch(), KINDS, KatalogPage() (+16 more)

### Community 5 - "Career SuperBright — Master Build Plan"
Cohesion: 0.07
Nodes (26): 0. Decisions Locked, 10. Bilingual + Regional, 11. Roadmap + Build Checklist (20 weeks), 12. Open Questions for Owner, 1. PRD Summary, 2.1 Top 10 Fastest-Growing for Grads, 2.2 Full Path Catalog (MVP = all 7), 2.3 Role Card Data Model (+18 more)

### Community 6 - "app/page.tsx"
Cohesion: 0.13
Nodes (20): PathData, PathPage(), PATHS, PathStage, FE_PATH, GOALS, HIRING, HomePage() (+12 more)

### Community 7 - "db/package.json"
Cohesion: 0.08
Nodes (23): dependencies, pg, @prisma/adapter-pg, @prisma/client, devDependencies, prisma, tsx, @types/pg (+15 more)

### Community 8 - "package.json"
Cohesion: 0.09
Nodes (21): description, devDependencies, turbo, typescript, engines, node, npm, typescript (+13 more)

### Community 9 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 10 - "tasks"
Cohesion: 0.11
Nodes (18): dependsOn, outputs, cache, cache, cache, cache, persistent, $schema (+10 more)

### Community 11 - "app/layout.tsx"
Cohesion: 0.15
Nodes (9): config, nextConfig, withNextIntl, jakarta, metadata, plex, routing, next (+1 more)

### Community 12 - "dependencies"
Cohesion: 0.15
Nodes (13): dependencies, better-auth, @careerbright/db, next, next-intl, react, react-dom, @tanstack/react-query (+5 more)

### Community 13 - "OpsShell"
Cohesion: 0.38
Nodes (7): AdminDashboard(), KPIS, EmployerDashboard(), LspDashboard(), UniversityDashboard(), OpsShell(), StatCard()

### Community 14 - "User"
Cohesion: 0.17
Nodes (12): 55. Example SuperBright User Journey, Step 1, Step 10, Step 2, Step 3, Step 4, Step 5, Step 6 (+4 more)

### Community 15 - "AuthForm"
Cohesion: 0.27
Nodes (5): AuthForm(), sendOtp(), DaftarPage(), MasukPage(), authClient

### Community 16 - "51. Suggested Technical Architecture"
Cohesion: 0.18
Nodes (11): 51. Suggested Technical Architecture, AI, Authentication, Backend, Cache, Database, Frontend, Mobile (+3 more)

### Community 17 - "Differentiators"
Cohesion: 0.20
Nodes (10): 1. Indonesia-first, 2. Contextual learning, 3. Practical projects, 4. Skill-based, 54. SuperBright Differentiation, 5. Career-connected, 6. Government-ready, 7. Company-ready (+2 more)

### Community 18 - "payments/package.json"
Cohesion: 0.20
Nodes (9): exports, ./server, main, name, private, default, types, types (+1 more)

### Community 19 - "ai/package.json"
Cohesion: 0.22
Nodes (8): dependencies, zod, zod, main, name, private, types, version

### Community 20 - "11. Learning Experience"
Cohesion: 0.25
Nodes (8): 11. Learning Experience, 1. Video, 2. Reading, 3. Quiz, 4. Practice, 5. Project, 6. Assessment, 7. Certificate

### Community 21 - "Vision"
Cohesion: 0.25
Nodes (8): 3. Product Vision, Career Skills, Indonesian Context, Life Skills, Practical Skills, Professional Skills, Technical Skills, Vision

### Community 22 - "6. Product Pillars"
Cohesion: 0.25
Nodes (8): 6.1 Learn, 6.2 Practice, 6.3 Build, 6.4 Prove, 6.5 Work, 6.6 Connect, 6.7 Understand Indonesia, 6. Product Pillars

### Community 23 - "34. Pricing Strategy"
Cohesion: 0.29
Nodes (7): 34. Pricing Strategy, Business, Free, Government, Individual Course, SuperBright Plus, University

### Community 24 - "42. Admin Platform"
Cohesion: 0.29
Nodes (7): 42. Admin Platform, Certificates, Courses, Instructors, Payments, Reports, Users

### Community 25 - "45. Key Product Metrics"
Cohesion: 0.29
Nodes (7): 45. Key Product Metrics, Acquisition, Activation, Business, Career, Engagement, Learning

### Community 26 - "57. Content Partnership Strategy"
Cohesion: 0.29
Nodes (7): 57. Content Partnership Strategy, Government institutions, Individual experts, Indonesian companies, Professional organizations, Technology companies, Universities

### Community 27 - "v0.2.0 — Midnight Paper Redesign (2026-10-02)"
Cohesion: 0.33
Nodes (5): Changelog — Career SuperBright, Included, Tag, v0.2.0 — Midnight Paper Redesign (2026-10-02), Verified

### Community 28 - "18. Certificates"
Cohesion: 0.33
Nodes (6): 18. Certificates, Course Certificate, Institution Certificate, Professional Certificate, Project Certificate, Skill Certificate

### Community 29 - "MVP Features"
Cohesion: 0.33
Nodes (6): 46. MVP, Admin, Instructor, Learner, MVP Features, Payment

### Community 30 - "56. Example Indonesian Learning Projects"
Cohesion: 0.33
Nodes (6): 56. Example Indonesian Learning Projects, Business, Data, Government, Marketing, Technology

### Community 31 - "63.25 MVP Kill / Pivot Signals"
Cohesion: 0.33
Nodes (6): 63.25 MVP Kill / Pivot Signals, Problem, Problem, Problem, Problem, Problem

### Community 32 - "7. Course Categories"
Cohesion: 0.33
Nodes (6): 7. Course Categories, Business, Career, Creative, Professional Skills, Technology

### Community 33 - "notify/package.json"
Cohesion: 0.33
Nodes (5): main, name, private, types, version

### Community 34 - "ui/package.json"
Cohesion: 0.33
Nodes (5): main, name, private, types, version

### Community 35 - "26. Course Quality System"
Cohesion: 0.40
Nodes (5): 26. Course Quality System, Community, Expert, Partner Verified, SuperBright Verified

### Community 36 - "47. MVP Content"
Cohesion: 0.40
Nodes (5): 47. MVP Content, Business, Career, Indonesia, Technology

### Community 37 - "60. Business Model"
Cohesion: 0.40
Nodes (5): 60. Business Model, B2B, B2C, B2E / Education, B2G

### Community 38 - "63.14 AI Assistant"
Cohesion: 0.40
Nodes (5): 63.14 AI Assistant, Adoption, AI Safety / Quality, Helpfulness, Repeat Usage

### Community 39 - "63.4 Learning Engagement"
Cohesion: 0.40
Nodes (5): 63.4 Learning Engagement, First Lesson, First Week Engagement, Learning Sessions, Weekly Active Learners

### Community 40 - "16. Career Map"
Cohesion: 0.50
Nodes (4): 16. Career Map, Career Preparation, Recommended Projects, Required Skills

### Community 41 - "43. Analytics"
Cohesion: 0.50
Nodes (4): 43. Analytics, Business Analytics, Learner Analytics, Learning Analytics

### Community 42 - "4.1 Students"
Cohesion: 0.50
Nodes (4): 4.1 Students, 4. Target Users, Examples, Needs

### Community 43 - "63.11 Retention"
Cohesion: 0.50
Nodes (4): 63.11 Retention, Day 30, Day 7, Day 90

### Community 44 - "63.19 Technical Performance"
Cohesion: 0.50
Nodes (4): 63.19 Technical Performance, Page Performance, Video, Website

### Community 45 - "63.24 MVP Launch Gates"
Cohesion: 0.50
Nodes (4): 63.24 MVP Launch Gates, Gate A — Product Value, Gate B — Retention, Gate C — Commercial Signal

### Community 46 - "14. Indonesian AI Features"
Cohesion: 0.67
Nodes (3): 14. Indonesian AI Features, Interview Simulator, Workplace Simulator

### Community 47 - "21. Company Skill Requirements"
Cohesion: 0.67
Nodes (3): 21. Company Skill Requirements, Required Skills, Role

### Community 48 - "63.2 North Star Metric"
Cohesion: 0.67
Nodes (3): 63.2 North Star Metric, MVP Target, Successful Learners

### Community 49 - "63.3 Acquisition"
Cohesion: 0.67
Nodes (3): 63.3 Acquisition, Activation, Registration

### Community 50 - "9. SuperBright Learning Paths"
Cohesion: 0.67
Nodes (3): 9. SuperBright Learning Paths, Become a Frontend Developer, Become an Indonesian UMKM Digital Entrepreneur

## Knowledge Gaps
- **428 isolated node(s):** `config`, `withNextIntl`, `nextConfig`, `name`, `version` (+423 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 457 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `web/package.json` to `smoke.ts`, `belajar/[slug]/page.tsx`, `app/page.tsx`, `app/layout.tsx`, `OpsShell`, `AuthForm`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `better-auth` connect `routers/index.ts` to `web/package.json`, `AuthForm`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `web/package.json`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `config`, `withNextIntl`, `nextConfig` to the rest of the system?**
  _428 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `FEATURE.md` be split into smaller, more focused modules?**
  _Cohesion score 0.03225806451612903 - nodes in this community are weakly interconnected._
- **Should `web/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.05550416281221091 - nodes in this community are weakly interconnected._
- **Should `routers/index.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06376811594202898 - nodes in this community are weakly interconnected._