-- Career SuperBright DDL (mirrors prisma/schema.prisma).
-- Applied manually via psql because Prisma engines cannot load on Android.
-- Enums stored as TEXT (validated app-side by Prisma Client types).

CREATE TABLE IF NOT EXISTS "CompetencyFramework" (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  "nameEn" TEXT,
  sector TEXT NOT NULL,
  "kkniLevel" INTEGER NOT NULL,
  version TEXT NOT NULL DEFAULT '1.0',
  status TEXT NOT NULL DEFAULT 'Active',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "CompetencyUnit" (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  "titleEn" TEXT,
  description TEXT,
  "frameworkId" TEXT NOT NULL REFERENCES "CompetencyFramework"(id),
  level INTEGER NOT NULL DEFAULT 1
);

CREATE TABLE IF NOT EXISTS "LearningPath" (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  "titleId" TEXT NOT NULL,
  "titleEn" TEXT NOT NULL,
  category TEXT NOT NULL,
  "targetRole" TEXT NOT NULL,
  "targetKkniLevel" INTEGER NOT NULL,
  "salaryMin" INTEGER NOT NULL,
  "salaryMax" INTEGER NOT NULL,
  "demandLevel" TEXT NOT NULL DEFAULT 'HIGH',
  "estimatedWeeks" INTEGER NOT NULL,
  price INTEGER NOT NULL DEFAULT 0,
  "lspCertPrice" INTEGER,
  "lspPartnerId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "LearningPathMilestone" (
  id TEXT PRIMARY KEY,
  "learningPathId" TEXT NOT NULL REFERENCES "LearningPath"(id) ON DELETE CASCADE,
  "titleId" TEXT NOT NULL,
  "titleEn" TEXT,
  "order" INTEGER NOT NULL,
  "competencyUnitId" TEXT REFERENCES "CompetencyUnit"(id),
  "skkniUnitCode" TEXT NOT NULL,
  "assessmentId" TEXT,
  "isRequired" BOOLEAN NOT NULL DEFAULT TRUE,
  UNIQUE ("learningPathId", "order")
);

CREATE TABLE IF NOT EXISTS "AppUser" (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  phone TEXT UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'STUDENT',
  "kkniLevel" INTEGER,
  nik TEXT UNIQUE,
  "ktpVerified" BOOLEAN NOT NULL DEFAULT FALSE,
  language TEXT NOT NULL DEFAULT 'id',
  timezone TEXT NOT NULL DEFAULT 'Asia/Jakarta',
  "subscriptionTier" TEXT NOT NULL DEFAULT 'FREE',
  "subscriptionEndsAt" TIMESTAMP(3),
  "campusLicenseId" TEXT REFERENCES "CampusLicense"(id),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "UserLearningPath" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "AppUser"(id) ON DELETE CASCADE,
  "learningPathId" TEXT NOT NULL REFERENCES "LearningPath"(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  "currentMilestone" INTEGER NOT NULL DEFAULT 0,
  progress DOUBLE PRECISION NOT NULL DEFAULT 0,
  "completedAt" TIMESTAMP(3),
  "lspUpgradeStatus" TEXT NOT NULL DEFAULT 'NONE',
  "lspUpgradePaidAt" TIMESTAMP(3),
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE ("userId", "learningPathId")
);

CREATE TABLE IF NOT EXISTS "Assessment" (
  id TEXT PRIMARY KEY,
  "titleId" TEXT NOT NULL,
  "titleEn" TEXT,
  type TEXT NOT NULL,
  "aiConfig" JSONB,
  "timeLimit" INTEGER,
  "maxAttempts" INTEGER NOT NULL DEFAULT 3,
  "passingScore" INTEGER NOT NULL DEFAULT 70,
  "starterCode" TEXT,
  "testCases" JSONB,
  language TEXT,
  "scenarioConfig" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "AssessmentSubmission" (
  id TEXT PRIMARY KEY,
  "assessmentId" TEXT NOT NULL REFERENCES "Assessment"(id) ON DELETE CASCADE,
  "userId" TEXT NOT NULL REFERENCES "AppUser"(id) ON DELETE CASCADE,
  code TEXT,
  output TEXT,
  conversation JSONB,
  status TEXT NOT NULL DEFAULT 'PENDING',
  score DOUBLE PRECISION,
  feedback JSONB,
  confidence DOUBLE PRECISION,
  "gradedBy" TEXT,
  "attemptNumber" INTEGER NOT NULL DEFAULT 1,
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "submittedAt" TIMESTAMP(3)
);
CREATE INDEX IF NOT EXISTS "AssessmentSubmission_userId_assessmentId_idx"
  ON "AssessmentSubmission"("userId", "assessmentId");

CREATE TABLE IF NOT EXISTS "Credential" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "AppUser"(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  "vcJson" JSONB,
  "obJson" JSONB,
  "verificationUrl" TEXT UNIQUE NOT NULL,
  "qrCodeUrl" TEXT,
  "pdfUrl" TEXT,
  "lspId" TEXT,
  "lspCertificateNumber" TEXT UNIQUE,
  "bnspVerified" BOOLEAN NOT NULL DEFAULT FALSE,
  "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "expiresAt" TIMESTAMP(3)
);

CREATE TABLE IF NOT EXISTS "Order" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "AppUser"(id),
  "orderNumber" TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  "totalAmount" INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'IDR',
  "paymentGateway" TEXT NOT NULL DEFAULT 'MIDTRANS',
  "gatewayOrderId" TEXT,
  "gatewayPayload" JSONB,
  type TEXT NOT NULL DEFAULT 'LSP_UPGRADE',
  "missionId" TEXT,
  "campusLicenseId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Course" (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  "titleId" TEXT NOT NULL,
  "titleEn" TEXT,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'DRAFT',
  "instructorId" TEXT REFERENCES "AppUser"(id),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Module" (
  id TEXT PRIMARY KEY,
  "courseId" TEXT NOT NULL REFERENCES "Course"(id) ON DELETE CASCADE,
  "titleId" TEXT NOT NULL,
  "order" INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "Lesson" (
  id TEXT PRIMARY KEY,
  "moduleId" TEXT NOT NULL REFERENCES "Module"(id) ON DELETE CASCADE,
  "titleId" TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'READING',
  "order" INTEGER NOT NULL DEFAULT 0,
  content JSONB
);

CREATE TABLE IF NOT EXISTS "User" (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  "emailVerified" BOOLEAN NOT NULL DEFAULT FALSE,
  name TEXT,
  image TEXT,
  "phoneNumber" TEXT UNIQUE,
  "phoneVerified" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Session" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Account" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "accountId" TEXT NOT NULL,
  "providerId" TEXT NOT NULL,
  "accessToken" TEXT,
  "refreshToken" TEXT,
  "accessTokenExpiresAt" TIMESTAMP(3),
  "refreshTokenExpiresAt" TIMESTAMP(3),
  scope TEXT,
  password TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Verification" (
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,
  value TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────────────────────────────────────
-- Better Auth tables (Kysery adapter — NOT Prisma).
--
-- Better Auth resolves its models to lowercase, unquoted identifiers, which
-- Postgres folds to "user" / "session" / "account" / "verification". The PascalCase
-- User / Session / Account / Verification tables above are the Prisma-shaped
-- equivalents and are retained only because schema.prisma still declares those
-- models; nothing reads them for auth any more.
--
-- Keep this block in sync with `"user".additionalFields` and the phoneNumber
-- plugin in apps/web/src/server/auth.ts. Better Auth validates the shape at
-- runtime and reports SCHEMA_MISMATCH with the exact missing column, so a
-- mismatch here fails loudly rather than silently.
-- ─────────────────────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS "user" (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL UNIQUE,
  "emailVerified" BOOLEAN NOT NULL DEFAULT FALSE,
  image TEXT,
  role TEXT NOT NULL DEFAULT 'STUDENT',
  "phoneNumber" TEXT UNIQUE,
  "phoneNumberVerified" BOOLEAN NOT NULL DEFAULT FALSE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "session" (
  id TEXT PRIMARY KEY,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  token TEXT NOT NULL UNIQUE,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "ipAddress" TEXT,
  "userAgent" TEXT,
  "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "account" (
  id TEXT PRIMARY KEY,
  "accountId" TEXT NOT NULL,
  "providerId" TEXT NOT NULL,
  "userId" TEXT NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  "accessToken" TEXT,
  "refreshToken" TEXT,
  "idToken" TEXT,
  "accessTokenExpiresAt" TIMESTAMP(3),
  "refreshTokenExpiresAt" TIMESTAMP(3),
  scope TEXT,
  password TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "verification" (
  id TEXT PRIMARY KEY,
  identifier TEXT NOT NULL,
  value TEXT NOT NULL,
  "expiresAt" TIMESTAMP(3) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS session_userId_idx ON "session" ("userId");
CREATE INDEX IF NOT EXISTS account_userId_idx ON "account" ("userId");

/* PRD §9 product metrics (discovery tier).
 *
 * roleId / scenarioId reference roles.json / micro_scenarios.json, which live
 * in the repo — not the database — so these are plain TEXT, deliberately not
 * foreign keys. A dangling id means content was removed after the event was
 * logged, and the aggregates below tolerate that.
 *
 * Privacy: no PII. userId is the Better Auth id when signed in, else null;
 * sessionKey is a random client-generated key (localStorage) that lets us
 * group anonymous visits into sessions without fingerprinting.
 */
CREATE TABLE IF NOT EXISTS "MetricEvent" (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "event" TEXT NOT NULL CHECK ("event" IN ('role_view', 'scenario_start', 'scenario_complete')),
  "roleId" TEXT,
  "scenarioId" TEXT,
  "durationMs" INTEGER CHECK ("durationMs" IS NULL OR ("durationMs" >= 0 AND "durationMs" <= 3600000)),
  verdict TEXT CHECK (verdict IS NULL OR verdict IN ('Optimal', 'Risky', 'Fatal')),
  "userId" TEXT,
  "sessionKey" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS metricevent_event_idx ON "MetricEvent" ("event");
CREATE INDEX IF NOT EXISTS metricevent_created_idx ON "MetricEvent" ("createdAt");
CREATE INDEX IF NOT EXISTS metricevent_session_idx ON "MetricEvent" ("sessionKey");

/* Wave release gate: which roles' micro-scenarios are playable.
 * A missing row means LOCKED — newly committed roles/scenarios stay dark
 * until an admin flips them in the dashboard (tRPC admin.setRelease).
 * roleId references roles.json (repo content), deliberately not a FK.
 * Seed rows live in seed.sql (the 25 launched Wave-1 roles, released). */
CREATE TABLE IF NOT EXISTS "RoleRelease" (
  "roleId" TEXT PRIMARY KEY,
  released BOOLEAN NOT NULL DEFAULT FALSE,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Professional Practice Platform (Exec Summary 5-step loop).
-- Enums stored as TEXT, validated app-side.

CREATE TABLE IF NOT EXISTS "Contributor" (
  id TEXT PRIMARY KEY,
  "userId" TEXT UNIQUE NOT NULL REFERENCES "AppUser"(id) ON DELETE CASCADE,
  "displayName" TEXT NOT NULL,
  "bioId" TEXT,
  "bioEn" TEXT,
  expertise JSONB NOT NULL DEFAULT '[]',
  status TEXT NOT NULL DEFAULT 'PENDING',
  "payoutRate" INTEGER NOT NULL DEFAULT 750,
  "totalEarnings" INTEGER NOT NULL DEFAULT 0,
  "bankName" TEXT,
  "bankAccount" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "CampusLicense" (
  id TEXT PRIMARY KEY,
  "universityId" TEXT NOT NULL,
  name TEXT NOT NULL,
  "contactEmail" TEXT NOT NULL,
  seats INTEGER NOT NULL,
  "pricePerSeat" INTEGER NOT NULL,
  "startsAt" TIMESTAMP(3) NOT NULL,
  "endsAt" TIMESTAMP(3) NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  "inviteCode" TEXT UNIQUE NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS campuslicense_university_idx ON "CampusLicense"("universityId", status);

CREATE TABLE IF NOT EXISTS "Mission" (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  "roleId" TEXT NOT NULL,
  "titleId" TEXT NOT NULL,
  "titleEn" TEXT,
  "briefId" TEXT NOT NULL,
  "briefEn" TEXT,
  "deliverableSpec" JSONB NOT NULL,
  rubric JSONB NOT NULL,
  "skkniUnitCode" TEXT NOT NULL,
  "kkniLevel" INTEGER NOT NULL DEFAULT 5,
  difficulty INTEGER NOT NULL DEFAULT 1,
  "estimatedMin" INTEGER NOT NULL DEFAULT 60,
  "maxRevisions" INTEGER NOT NULL DEFAULT 3,
  status TEXT NOT NULL DEFAULT 'DRAFT',
  "authorId" TEXT REFERENCES "Contributor"(id),
  "reviewerId" TEXT,
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS mission_role_status_idx ON "Mission"("roleId", status);
CREATE INDEX IF NOT EXISTS mission_status_pub_idx ON "Mission"(status, "publishedAt");

CREATE TABLE IF NOT EXISTS "MissionAttempt" (
  id TEXT PRIMARY KEY,
  "missionId" TEXT NOT NULL REFERENCES "Mission"(id) ON DELETE CASCADE,
  "userId" TEXT NOT NULL REFERENCES "AppUser"(id) ON DELETE CASCADE,
  "attemptNum" INTEGER NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'IN_PROGRESS',
  score DOUBLE PRECISION,
  confidence DOUBLE PRECISION,
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "submittedAt" TIMESTAMP(3),
  "reviewedAt" TIMESTAMP(3),
  UNIQUE ("missionId", "userId", "attemptNum")
);
CREATE INDEX IF NOT EXISTS missionattempt_user_mission_idx ON "MissionAttempt"("userId", "missionId");
CREATE INDEX IF NOT EXISTS missionattempt_status_idx ON "MissionAttempt"(status, "submittedAt");

CREATE TABLE IF NOT EXISTS "Revision" (
  id TEXT PRIMARY KEY,
  "attemptId" TEXT NOT NULL REFERENCES "MissionAttempt"(id) ON DELETE CASCADE,
  "revisionNum" INTEGER NOT NULL,
  "noteId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE ("attemptId", "revisionNum")
);

CREATE TABLE IF NOT EXISTS "SubmissionArtifact" (
  id TEXT PRIMARY KEY,
  "attemptId" TEXT NOT NULL REFERENCES "MissionAttempt"(id) ON DELETE CASCADE,
  "revisionId" TEXT REFERENCES "Revision"(id) ON DELETE SET NULL,
  mode TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB,
  "order" INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS artifact_attempt_order_idx ON "SubmissionArtifact"("attemptId", "order");

CREATE TABLE IF NOT EXISTS "AIFeedback" (
  id TEXT PRIMARY KEY,
  "attemptId" TEXT UNIQUE NOT NULL REFERENCES "MissionAttempt"(id) ON DELETE CASCADE,
  "criterionScores" JSONB NOT NULL,
  "consensusScore" DOUBLE PRECISION NOT NULL,
  confidence DOUBLE PRECISION NOT NULL,
  "feedbackId" TEXT NOT NULL,
  "feedbackEn" TEXT,
  "reflectionId" TEXT,
  "reflectionEn" TEXT,
  "promptVersion" TEXT NOT NULL DEFAULT 'judge-v1',
  status TEXT NOT NULL DEFAULT 'AI_GENERATED',
  "reviewedBy" TEXT,
  "reviewedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "PortfolioEntry" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL REFERENCES "AppUser"(id) ON DELETE CASCADE,
  "missionId" TEXT NOT NULL REFERENCES "Mission"(id),
  "attemptId" TEXT UNIQUE NOT NULL REFERENCES "MissionAttempt"(id),
  "briefSnapshot" JSONB NOT NULL,
  artifacts JSONB NOT NULL,
  "rubricSnapshot" JSONB NOT NULL,
  "aiFeedback" JSONB,
  revisions JSONB,
  "reflectionId" TEXT,
  "reflectionEn" TEXT,
  "isPublic" BOOLEAN NOT NULL DEFAULT TRUE,
  "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS portfolio_user_pub_idx ON "PortfolioEntry"("userId", "publishedAt");
CREATE INDEX IF NOT EXISTS portfolio_mission_pub_idx ON "PortfolioEntry"("missionId", "publishedAt");

CREATE TABLE IF NOT EXISTS "ContributorPayout" (
  id TEXT PRIMARY KEY,
  "contributorId" TEXT NOT NULL REFERENCES "Contributor"(id) ON DELETE CASCADE,
  "missionId" TEXT NOT NULL REFERENCES "Mission"(id),
  completions INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  method TEXT NOT NULL DEFAULT 'MANUAL',
  reference TEXT,
  "periodStart" TIMESTAMP(3) NOT NULL,
  "periodEnd" TIMESTAMP(3) NOT NULL,
  "paidAt" TIMESTAMP(3),
  status TEXT NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS payout_contrib_status_idx ON "ContributorPayout"("contributorId", status);
