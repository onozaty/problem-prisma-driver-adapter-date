import { pgPool } from "./pg";
import { prismaAdapter } from "./prisma-datapter";
import { prismaDefault } from "./prisma-default";

test("timestamp with timezone", async () => {
  const createdAt = new Date("2025-01-01T00:00:00Z");
  const email = "user@example.com";
  const created = await prismaDefault.user.create({
    data: {
      email,
      createdAt,
    },
  });

  const defaultResult = await prismaDefault.user.findUnique({
    where: {
      id: created.id,
    },
  });
  console.log("Prisma(default):", defaultResult);
  expect.soft(defaultResult?.createdAt).toEqual(createdAt);

  const adapterResult = await prismaAdapter.user.findUnique({
    where: {
      id: created.id,
    },
  });
  console.log("Prisma(adapter):", adapterResult);
  expect.soft(adapterResult?.createdAt).toEqual(createdAt);

  const pgResult = await pgPool.query('SELECT * FROM "User" WHERE id = $1', [
    created.id,
  ]);
  console.log("pg:", pgResult.rows[0]);
  expect.soft(pgResult.rows[0].createdAt).toEqual(createdAt);
});
