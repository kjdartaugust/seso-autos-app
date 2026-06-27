import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/**
 * When DATABASE_URL is not configured the app runs in "demo mode":
 * read paths fall back to seed data and write paths simply succeed
 * without persisting. This keeps the deployment functional on Vercel
 * before a PlanetScale database is attached.
 */
export const isDbConfigured = Boolean(process.env.DATABASE_URL);
