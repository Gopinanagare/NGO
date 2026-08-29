import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";
import fs from "fs";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const rootDbPath = path.join(process.cwd(), "dev.db");
  const prismaDbPath = path.join(process.cwd(), "prisma", "dev.db");
  const tmpDbPath = path.join("/tmp", "dev.db");

  let sourceDbPath = rootDbPath;
  if (fs.existsSync(prismaDbPath) && fs.statSync(prismaDbPath).size > 0) {
    sourceDbPath = prismaDbPath;
  } else if (fs.existsSync(rootDbPath) && fs.statSync(rootDbPath).size > 0) {
    sourceDbPath = rootDbPath;
  }

  let targetDbPath = sourceDbPath;

  // On Vercel serverless environment, copy DB to /tmp for write permission
  if (process.env.VERCEL) {
    try {
      if (fs.existsSync(sourceDbPath)) {
        if (!fs.existsSync(tmpDbPath)) {
          fs.copyFileSync(sourceDbPath, tmpDbPath);
        }
        targetDbPath = tmpDbPath;
      }
    } catch (e) {
      console.error("Vercel DB copy error:", e);
    }
  }

  const adapter = new PrismaBetterSqlite3({ url: targetDbPath });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
