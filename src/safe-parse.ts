import { z } from "zod";
import { testValue } from "./utils/testSchema";

/**
 * Demonstrates safeParse, safeParseAsync, and error formatting utilities.
 * safeParse returns { success: true, data: T } | { success: false, error: ZodError }
 * instead of throwing on invalid input.
 */

const UserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.number().int().nonnegative("Age must be non-negative"),
  email: z.string().email("Invalid email"),
});

// --- safeParse ---

const validUser = { name: "Alice", age: 30, email: "alice@example.com" };
const invalidUser = { name: "", age: -5, email: "not-an-email" };

const validResult = UserSchema.safeParse(validUser);
if (validResult.success) {
  console.log("✅ safeParse success:", validResult.data);
} else {
  console.error("❌ safeParse failed (should not happen):", validResult.error);
}

const invalidResult = UserSchema.safeParse(invalidUser);
if (!invalidResult.success) {
  console.log("\n❌ safeParse failure detected");
  console.log("Raw issues:", invalidResult.error.issues);
}

// --- error formatting ---

if (!invalidResult.success) {
  console.log("\n--- format() ---");
  const formatted = invalidResult.error.format();
  console.log(JSON.stringify(formatted, null, 2));

  console.log("\n--- flatten() ---");
  const flat = invalidResult.error.flatten();
  console.log("Form errors:", flat.formErrors);
  console.log("Field errors:", flat.fieldErrors);
}

// --- safeParseAsync ---

const AsyncSchema = z.string().refine(
  async (val) => {
    await new Promise((resolve) => setTimeout(resolve, 50));
    return val.length > 3;
  },
  { message: "String must be longer than 3 characters" }
);

async function runAsync() {
  const asyncValid = await AsyncSchema.safeParseAsync("hello");
  if (asyncValid.success) {
    console.log("\n✅ safeParseAsync success:", asyncValid.data);
  }

  const asyncInvalid = await AsyncSchema.safeParseAsync("hi");
  if (!asyncInvalid.success) {
    console.log("\n❌ safeParseAsync failure:");
    console.log("Message:", asyncInvalid.error.message);
    console.log("Issues:", asyncInvalid.error.issues);
  }
}

runAsync();

// --- Practical safeParse pattern ---

function parseRequestBody(body: unknown) {
  const result = UserSchema.safeParse(body);
  if (!result.success) {
    return {
      ok: false as const,
      errors: result.error.flatten().fieldErrors,
    };
  }
  return { ok: true as const, data: result.data };
}

console.log("\n--- Practical pattern ---");
console.log(parseRequestBody({ name: "Bob", age: 25, email: "bob@example.com" }));
console.log(parseRequestBody({ name: "", age: -1, email: "bad" }));

// --- Catch-all error demonstration ---

const LooseSchema = z.object({
  id: z.number(),
  name: z.string(),
}).catchall(z.unknown());

const looseResult = LooseSchema.safeParse({ id: 1, name: "Test", extra: true });
if (looseResult.success) {
  console.log("\n✅ catchall success:", looseResult.data);
}
