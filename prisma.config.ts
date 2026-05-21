// Prisma config for SIGMA — Supabase PostgreSQL
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // Supabase migrations require the Session pooler (direct connection)
    url: process.env["DIRECT_URL"],
  },
});
