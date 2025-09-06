import { z } from "zod";

/**
 * Validates an Express-like request body for creating a user.
 * Demonstrates nested objects, arrays, email validation, and optional fields.
 */
const CreateUserBodySchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  age: z.number().int().min(0).max(150).optional(),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    zip: z.string().regex(/^\d{5}(-\d{4})?$/),
    country: z.string().default("USA"),
  }),
  tags: z.array(z.string().min(1)).max(10).default([]),
});

type CreateUserBody = z.infer<typeof CreateUserBodySchema>;

// Simulated request handler
function handleCreateUser(rawBody: unknown) {
  const result = CreateUserBodySchema.safeParse(rawBody);

  if (!result.success) {
    console.error("Validation failed:");
    console.error(result.error.flatten().fieldErrors);
    return null;
  }

  const user: CreateUserBody = result.data;
  console.log("Created user:", user);
  return user;
}

// --- Demo ---

// ✅ Valid request
handleCreateUser({
  name: "Alice Johnson",
  email: "alice@example.com",
  age: 30,
  address: {
    street: "123 Maple St",
    city: "Springfield",
    zip: "62701",
  },
  tags: ["admin", "beta-tester"],
});

// ❌ Invalid request
handleCreateUser({
  name: "",
  email: "not-an-email",
  address: {
    street: "",
    city: "",
    zip: "invalid",
  },
  tags: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"],
});
