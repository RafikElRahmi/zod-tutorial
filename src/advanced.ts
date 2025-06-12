import { z } from "zod";
import { testValue } from "./utils/testSchema";

/**
 * z.brand creates a "branded" (nominal) type.
 * Structurally identical values are rejected at the TypeScript level unless
 * they passed through the branded schema's parse. Has no runtime effect —
 * the brand exists only in the type system.
 */
const UserId = z.string().uuid().brand<"UserId">();
const ProductId = z.string().uuid().brand<"ProductId">();

type UserId = z.infer<typeof UserId>;
type ProductId = z.infer<typeof ProductId>;

// TypeScript would reject: const bad: UserId = ProductId.parse("..."); — different brands
function getUserById(id: UserId) {
    return `Fetching user ${id}`;
}

/**
 * z.readonly makes the parsed value deeply readonly at the TypeScript level.
 * Prevents accidental mutation of validated data.
 */
const configSchema = z.object({
    host: z.string(),
    port: z.number(),
    flags: z.array(z.string()),
}).readonly();

type Config = z.infer<typeof configSchema>;
// TypeScript: config.host = "x" → error; config.flags.push("x") → error

/**
 * z.catch provides a fallback value when parsing fails, instead of throwing.
 * Different from .default(): default fills in missing values, catch handles errors.
 */
const catchSchema = z.number().catch(0);

/**
 * catch with a factory function — called each time a failure occurs.
 */
const catchWithFactorySchema = z.string().email().catch((ctx) => {
    console.log(`  [catch] invalid input was: ${ctx.input}, using fallback`);
    return "fallback@example.com";
});

/**
 * Practical use of catch: parse unknown API data safely without try/catch.
 */
const safeApiResponseSchema = z.object({
    id: z.number(),
    status: z.enum(["active", "inactive"]).catch("inactive"),
    score: z.number().min(0).max(100).catch(0),
});

// --- brand ---

const userId = UserId.parse("550e8400-e29b-41d4-a716-446655440000");
console.log(`UserId: ${userId}`);
// TypeScript-only: getUserById(userId) compiles; getUserById(productId) would not
console.log(getUserById(userId));

// Fail: not a UUID
console.log(testValue(UserId, "not-a-uuid"));

// Fail: valid UUID but wrong brand — TypeScript catches this, not runtime
const productId = ProductId.parse("550e8400-e29b-41d4-a716-446655440001");
console.log(`ProductId: ${productId}`);

// --- readonly ---

// Success: returns deeply readonly config object
console.log(
    testValue(configSchema, { host: "localhost", port: 3000, flags: ["debug"] })
);

// Fail: Error: Expected number, received string
console.log(
    testValue(configSchema, { host: "localhost", port: "3000", flags: [] })
);

// --- catch ---

// Success: returns 42
console.log(testValue(catchSchema, 42));

// Success: returns fallback 0 instead of throwing
console.log(testValue(catchSchema, "not-a-number"));

// Success: returns fallback 0 for null
console.log(testValue(catchSchema, null));

// Success: returns "user@example.com"
console.log(testValue(catchWithFactorySchema, "user@example.com"));

// Success: returns "fallback@example.com" (catch triggered, logs the bad input)
console.log(testValue(catchWithFactorySchema, "not-an-email"));

// Success: returns "fallback@example.com" (catch triggered)
console.log(testValue(catchWithFactorySchema, 999));

// Success: valid API response parsed normally
console.log(
    testValue(safeApiResponseSchema, { id: 1, status: "active", score: 85 })
);

// Success: invalid status and score use their catch fallbacks — no throw
console.log(
    testValue(safeApiResponseSchema, { id: 2, status: "unknown", score: 999 })
);

// Fail: id is required and has no catch
console.log(
    testValue(safeApiResponseSchema, { status: "active", score: 50 })
);
