import "dotenv/config";
import { Pool } from "pg";

const connectionString = `${process.env.DATABASE_URL}`;

export const pgPool = new Pool({ connectionString });
