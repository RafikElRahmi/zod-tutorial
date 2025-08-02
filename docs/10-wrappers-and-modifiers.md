# 10 — Wrappers and Modifiers

Zod schemas can be wrapped and modified to change their nullability, optionality, and default behavior. These wrappers are essential for modeling real-world data where fields may be missing, explicitly null, or have sensible defaults.

The four most common wrappers are `.optional()`, `.nullable()`, `.nullish()`, and `.default()`. They compose naturally: `z.string().optional().nullable()` accepts `string | null | undefined`. Use `.default()` to provide fallback values when a field is missing, and `.catch()` to recover from parse errors rather than missing values.

## Examples

```typescript
import { z } from "zod";

const optionalString = z.string().optional();
const nullableString = z.string().nullable();
const nullishString = z.string().nullish();
const defaultString = z.string().default("anonymous");

optionalString.parse(undefined); // ✅
nullableString.parse(null);      // ✅
nullishString.parse(undefined);  // ✅
defaultString.parse(undefined);  // ✅ "anonymous"
```

## Object-Level Wrappers

```typescript
const UserSchema = z.object({
  name: z.string(),
  nickname: z.string().optional(),
  bio: z.string().nullable(),
  theme: z.string().default("light"),
});

UserSchema.parse({ name: "Alice" });
// ✅ { name: "Alice", theme: "light" }
```

## Common Pitfalls

- **`.optional()` and `.nullable()` are not the same.** Optional means the key can be missing or `undefined`; nullable means the value can be `null`.
- **`.default()` only applies when the input is `undefined`.** It does not apply to `null` or invalid values.
- **`.catch()` runs when parsing fails, not when the value is missing.** Use `.default()` for missing values, `.catch()` for invalid ones.
- **`.brand()` and `.readonly()` are type-system features.** They have no runtime effect.

## Link to Source

See [`src/wrappers.ts`](../src/wrappers.ts) for optional, nullable, nullish, default, and readonly demonstrations.

## Try It Yourself

1. Define a schema where every field is optional except `id`.
2. Create a schema that accepts `string | null | undefined` and normalizes it to a non-null string with a default.
3. Experiment with `.readonly()` on an object and observe TypeScript's error when you try to mutate the result.
