# 13 — Additional Utilities

Beyond primitives and objects, Zod provides a suite of utility schemas for modeling enums, literal values, template literals, and preprocessing. These utilities fill the gaps between TypeScript's type system and runtime validation, letting you express constraints that would otherwise require custom code.

`z.enum()` creates a string enum from an array of literals. `z.nativeEnum()` accepts a TypeScript enum and validates against its values. `z.literal()` enforces an exact value. `z.preprocess()` lets you transform input before it reaches the schema. Together, these utilities cover most edge cases in schema design.

## Examples

```typescript
import { z } from "zod";

const Size = z.enum(["S", "M", "L"]);
const Status = z.nativeEnum({ Active: "ACTIVE", Inactive: "INACTIVE" });
const Hello = z.literal("hello");

Size.parse("M");      // ✅
Hello.parse("hello"); // ✅
Hello.parse("world"); // ❌
```

## Template Literal (Zod 3.23+)

```typescript
const HexColor = z.templateLiteral([z.literal("#"), z.string().regex(/^[0-9A-F]{6}$/)]);
// Note: templateLiteral is experimental in some versions; use refine for stability
```

## Preprocess Utilities

```typescript
const TrimmedString = z.preprocess((val) => {
  if (typeof val === "string") return val.trim();
  return val;
}, z.string());
```

## Common Pitfalls

- **`z.enum()` only works with string arrays.** For numeric or mixed enums, use `z.nativeEnum()` or `z.union([z.literal(...), ...])`.
- **`z.nativeEnum()` accepts both key and value for string enums.** For numeric enums, it accepts the numeric value only.
- **`z.literal()` is strict about types.** `z.literal(1)` rejects `"1"` and `true`.
- **Preprocess must return the raw input if it cannot transform.** Returning `undefined` when the input is a number may cause unexpected failures.

## Link to Source

See [`src/additional.ts`](../src/additional.ts) for enum, nativeEnum, literal, and type inference demonstrations.

## Try It Yourself

1. Define a `z.nativeEnum()` for a TypeScript numeric enum and test it.
2. Create a union of literals for HTTP methods: `"GET" | "POST" | "PUT" | "DELETE"`.
3. Write a preprocess that converts `"null"` strings to actual `null` before validation.
