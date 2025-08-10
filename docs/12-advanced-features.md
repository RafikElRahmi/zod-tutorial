# 12 — Advanced Features

Zod's advanced features — branded types, readonly schemas, and catch fallbacks — solve problems that go beyond simple validation. They help you write safer, more maintainable code by leveraging the type system and providing graceful error recovery.

Branded types (also called nominal types) let you distinguish values that have the same runtime shape but different semantic meaning. A `UserId` and a `ProductId` may both be UUID strings, but a branded type prevents you from accidentally passing one where the other is expected. Readonly schemas freeze your parsed data at the TypeScript level, preventing accidental mutations. Catch fallbacks let you recover from parse errors with default values.

## Examples

```typescript
import { z } from "zod";

// Branded types
const UserId = z.string().uuid().brand<"UserId">();
const ProductId = z.string().uuid().brand<"ProductId">();

type UserId = z.infer<typeof UserId>;
type ProductId = z.infer<typeof ProductId>;

function getUser(id: UserId) { /* ... */ }
const uid = UserId.parse("550e8400-e29b-41d4-a716-446655440000");
getUser(uid); // ✅ Type-safe
```

## Readonly and Catch

```typescript
const ConfigSchema = z.object({
  host: z.string(),
  port: z.number(),
}).readonly();

const SafeNumber = z.number().catch(0);
const SafeEmail = z.string().email().catch("fallback@example.com");

SafeNumber.parse("oops"); // ✅ 0 (no throw)
```

## Common Pitfalls

- **Brands exist only at compile time.** At runtime, a branded string is just a string.
- **`.readonly()` makes the entire object deeply readonly.** Nested arrays and objects are also frozen in the type system.
- **`.catch()` silently swallows errors.** Use it for non-critical fields where a fallback is acceptable, not for required business logic.
- **Catch factory functions receive the parse context.** Use them to log the bad input for debugging.

## Link to Source

See [`src/advanced.ts`](../src/advanced.ts) for brand, readonly, and catch demonstrations.

## Try It Yourself

1. Create branded types for `Email` and `PhoneNumber` and write a function that only accepts `Email`.
2. Define a readonly configuration schema and try to mutate the result in TypeScript.
3. Build a schema that catches invalid enum values to a default but still throws on missing required fields.
