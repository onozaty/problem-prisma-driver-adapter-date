## Title

`@db.Timestamptz()` not handled correctly with `driverAdapters` when PostgreSQL timezone is not UTC.

## Bug description

I followed the official Prisma documentation below to enable driverAdapters and use node-postgres:

- https://www.prisma.io/docs/orm/overview/databases/postgresql#using-the-node-postgres-driver

When using a Date field with `@db.Timestamptz()` in the Prisma schema, we noticed that values are not retrieved correctly if the PostgreSQL database is configured with a timezone other than `UTC` (e.g., `Asia/Tokyo`).

- This issue does not occur when not using driverAdapters.
- This issue also does not occur when querying directly with node-postgres without PrismaClient.

## Reproduction

Here is a reproduction project:

- https://github.com/onozaty/problem-prisma-driver-adapter-date

You can reproduce the issue by following these steps:

- Open the project in a DevContainer or GitHub Codespaces.
    - The timezone for both PostgreSQL and the execution environment is `Asia/Tokyo`.
- Run `pnpm test`.
    - Only the case using driverAdapters results in incorrect datetime values.

## Expected vs. Actual Behavior

The correct datetime, adjusted for the configured timezone, should be returned.

