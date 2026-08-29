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
  
  let targetDbPath = rootDbPath;

  if (fs.existsSync(rootDbPath) && fs.statSync(rootDbPath).size > 0) {
    targetDbPath = rootDbPath;
  } else if (fs.existsSync(prismaDbPath) && fs.statSync(prismaDbPath).size > 0) {
    targetDbPath = prismaDbPath;
  }

  const adapter = new PrismaBetterSqlite3({ url: targetDbPath });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
