import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { PrismaClient } from "@/app/generated/prisma/client";
import { nextCookies } from "better-auth/next-js";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql", // or "mysql", "postgresql", ...etc
  }),
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
