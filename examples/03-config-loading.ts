import { z } from "zod";

/**
 * Loads and validates environment variables with defaults and coercion.
 * Demonstrates coerce, default, preprocess, and safeParse for config loading.
 */
const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.number().int().positive().default(3000)
  ),
  DATABASE_URL: z.string().min(1),
  LOG_LEVEL: z
    .enum(["debug", "info", "warn", "error"])
    .default("info"),
  ENABLE_METRICS: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return val === "true" || val === "1";
      }
      return val;
    },
    z.boolean().default(false)
  ),
  API_KEY: z.string().min(32).optional(),
});

type Env = z.infer<typeof EnvSchema>;

function loadEnv(): Env {
  const raw = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    LOG_LEVEL: process.env.LOG_LEVEL,
    ENABLE_METRICS: process.env.ENABLE_METRICS,
    API_KEY: process.env.API_KEY,
  };

  const result = EnvSchema.safeParse(raw);

  if (!result.success) {
    console.error("Invalid environment variables:");
    console.error(result.error.format());
    throw new Error("Environment validation failed");
  }

  return result.data;
}

// --- Demo (simulated) ---

process.env.NODE_ENV = "production";
process.env.PORT = "8080";
process.env.DATABASE_URL = "postgres://localhost:5432/mydb";
process.env.LOG_LEVEL = "warn";
process.env.ENABLE_METRICS = "true";

const config = loadEnv();
console.log("Loaded config:", config);
// {
//   NODE_ENV: "production",
//   PORT: 8080,
//   DATABASE_URL: "postgres://localhost:5432/mydb",
//   LOG_LEVEL: "warn",
//   ENABLE_METRICS: true,
//   API_KEY: undefined
// }
