import { z } from "zod";

/**
 * Parses and safely validates an external API response.
 * Demonstrates union, nullable, optional, and safeParse for defensive parsing.
 */
const ApiUserSchema = z.object({
  id: z.number().int().positive(),
  username: z.string().min(1),
  email: z.string().email().nullable(),
  avatarUrl: z.string().url().optional(),
  isActive: z.boolean(),
  roles: z.array(z.enum(["user", "admin", "moderator"])),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

const ApiErrorSchema = z.object({
  error: z.literal(true),
  code: z.string(),
  message: z.string(),
});

const ApiResponseSchema = z.union([ApiUserSchema, ApiErrorSchema]);

type ApiUser = z.infer<typeof ApiUserSchema>;
type ApiError = z.infer<typeof ApiErrorSchema>;
type ApiResponse = z.infer<typeof ApiResponseSchema>;

function parseApiResponse(raw: unknown): ApiResponse | null {
  const result = ApiResponseSchema.safeParse(raw);

  if (!result.success) {
    console.error("Unexpected API response shape:");
    console.error(result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`));
    return null;
  }

  if ("error" in result.data) {
    const err: ApiError = result.data;
    console.error(`API error [${err.code}]: ${err.message}`);
    return err;
  }

  const user: ApiUser = result.data;
  console.log("Received user:", user);
  return user;
}

// --- Demo ---

// ✅ Valid user response
parseApiResponse({
  id: 1,
  username: "alice",
  email: "alice@example.com",
  avatarUrl: "https://example.com/avatar.png",
  isActive: true,
  roles: ["user", "admin"],
  metadata: { theme: "dark" },
});

// ✅ Valid error response
parseApiResponse({
  error: true,
  code: "NOT_FOUND",
  message: "User not found",
});

// ❌ Unexpected shape
parseApiResponse({
  id: "not-a-number",
  username: 123,
});
