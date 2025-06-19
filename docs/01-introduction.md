# 01 — Introduction to Schema Validation

Schema validation is the practice of checking that runtime data conforms to an expected shape before you use it. In TypeScript, we often rely on compile-time types, but those types disappear at runtime. A string typed as `User` in TS is still just a string when the code executes. Zod bridges this gap by giving you executable schemas that validate data at runtime and infer TypeScript types automatically.

Zod was designed with TypeScript in mind from the ground up. Every schema you define is also a type definition. When you write `z.string()`, you get a runtime validator *and* a TypeScript type. When you write `z.object({ name: z.string() })`, Zod infers the corresponding interface. This means you never have to maintain separate runtime validators and static types — they are one and the same.

## Basic Example

```typescript
import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  email: z.string().email(),
});

type User = z.infer<typeof UserSchema>;
// ^? { id: number; name: string; email: string }

const result = UserSchema.parse({
  id: 1,
  name: "Alice",
  email: "alice@example.com",
});
```

## Parsing Unknown Data

```typescript
function handleRequest(body: unknown) {
  const user = UserSchema.parse(body);
  // After this line, `user` is typed as User
  console.log(user.name.toUpperCase());
}
```

## Common Pitfalls

- **Don't assume `.parse()` always succeeds.** It throws on invalid input. Use `.safeParse()` when you need to handle errors gracefully.
- **Don't import from `zod/lib` directly.** Always import from `"zod"` to avoid bundling issues.
- **Remember that `z.any()` and `z.unknown()` accept everything.** They are useful for generic wrappers but provide no runtime safety on their own.

## Link to Source

See [`src/primitive.ts`](../src/primitive.ts) for all built-in primitive schemas.

## Try It Yourself

1. Define a `ProductSchema` with `id` (number), `title` (string, min 3 chars), and `price` (positive number).
2. Parse an object that meets these requirements.
3. Try parsing an object with a negative price and observe the error.
