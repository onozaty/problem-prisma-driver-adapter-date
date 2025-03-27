import { prisma } from "./prisma";

test("create and find", async () => {
  const createdAt = new Date("2025-01-01T00:00:00Z");
  const email = "user@example.com";

  const created = await prisma.user.create({
    data: {
      email,
      createdAt,
    },
  });

  console.log("Created user:", created);
  expect(created).not.toBeNull();
  expect(created.createdAt).toEqual(createdAt);

  const found = await prisma.user.findUnique({
    where: {
      id: created.id,
    },
  });
  console.log("Found user:", found);
  expect(created).toEqual(found);
});
