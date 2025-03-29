import { PrismaClient } from "@prisma/client";

export const prismaDefault = new PrismaClient();
await prismaDefault.$connect();
