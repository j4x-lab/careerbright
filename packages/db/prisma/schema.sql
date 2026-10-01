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
