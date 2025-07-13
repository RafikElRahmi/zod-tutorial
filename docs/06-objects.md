# 06 — Object Schemas

Objects are the backbone of most data structures. Zod's `z.object()` creates a schema that validates the shape of an object, ensuring required keys exist and their values match the specified schemas. By default, Zod strips unknown keys (pass-through), but you can make it strict with `z.strictObject()` or allow extra keys with `.passthrough()`.

Zod provides a rich set of utilities for manipulating object schemas: extending, picking, omitting, partializing, and requiring fields. These are invaluable when you need variants of the same base shape — for example, a create DTO vs an update DTO.

## Examples

```typescript
import { z } from "zod";

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});

// Extend an object
const AdminSchema = UserSchema.extend({
  role: z.literal("admin"),
});

// Make all fields optional
const PartialUserSchema = UserSchema.partial();

// Pick only specific fields
const UserNameSchema = UserSchema.pick({ name: true });
```

## Strict and Catchall

```typescript
const StrictUserSchema = z.strictObject({
  name: z.string(),
});

StrictUserSchema.parse({ name: "Alice", extra: 1 }); // ❌

const LooseUserSchema = z.object({ name: z.string() }).catchall(z.number());
LooseUserSchema.parse({ name: "Alice", age: 30 }); // ✅
```

## Common Pitfalls

- **`.extend()` overwrites keys with the same name.** The new definition wins.
- **`.pick()` and `.omit()` return new schemas.** They do not mutate the original.
- **`.partial()` makes all keys optional, including nested ones only at the top level.** For deep partials, write a helper or use recursion.
- **`.keyof()` creates a string enum schema, not a TypeScript `keyof` type.** Use `z.infer<typeof schema.keyof()>`, not `keyof typeof schema`.

## Link to Source

See [`src/objects.ts`](../src/objects.ts) for object demonstrations.

## Try It Yourself

1. Define a `CreateUserSchema` with `name`, `email`, and `password`. Derive an `UpdateUserSchema` where all fields are optional.
2. Create a strict object schema and test it with extra properties.
3. Use `.shape` to extract a single field schema and validate it independently.
