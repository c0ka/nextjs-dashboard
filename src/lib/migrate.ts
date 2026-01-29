import postgres from "postgres";
import fs from "fs";
import path from "path";

// Manual env parsing if needed
function loadEnv() {
  const envPath = path.join(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, "utf-8");
    envFile.split("\n").forEach((line) => {
      const [key, ...value] = line.split("=");
      if (key && value) {
        process.env[key.trim()] = value
          .join("=")
          .trim()
          .replace(/^"(.*)"$/, "$1");
      }
    });
  }
}

loadEnv();

if (!process.env.POSTGRES_URL) {
  console.error("POSTGRES_URL is missing from .env");
  process.exit(1);
}

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function migrate() {
  try {
    console.log("Running migration...");
    const migrationSql = fs.readFileSync(
      path.join(process.cwd(), "src/lib/news_migration.sql"),
      "utf-8",
    );

    // Split by semicolon to run parts individually if needed,
    // but unsafe() should handle it.
    // Note: multi-statement strings might need careful handling with some drivers.
    await sql.unsafe(migrationSql);

    console.log("Migration successful");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await sql.end();
  }
}

migrate();
