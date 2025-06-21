# 02 — Primitive Schemas

Zod provides a schema for every JavaScript primitive type. These are the building blocks of every complex schema you will write. Understanding how each primitive behaves — especially the subtle differences between `any`, `unknown`, `void`, and `never` — will save you from confusion later.

Primitive schemas are strict by default. `z.string()` rejects numbers, `z.number()` rejects strings, and `z.boolean()` rejects truthy/falsy values like `"true"` or `0`. This strictness is intentional: Zod errs on the side of safety.

## Examples

```typescript
import { z } from "zod";

const stringSchema = z.string();
const numberSchema = z.number();
const booleanSchema = z.boolean();
const dateSchema = z.date();
const bigintSchema = z.bigint();

stringSchema.parse("hello");   // ✅
numberSchema.parse(42);        // ✅
booleanSchema.parse(true);     // ✅
dateSchema.parse(new Date());  // ✅
bigintSchema.parse(9007199254740991n); // ✅
```

## Special Primitives

```typescript
const anySchema = z.any();           // Accepts anything
const unknownSchema = z.unknown();   // Accepts anything, no inference
const voidSchema = z.void();         // Accepts undefined
const neverSchema = z.never();       // Accepts nothing

anySchema.parse(null);        // ✅
unknownSchema.parse(null);    // ✅ (but you can't do much with it)
voidSchema.parse(undefined);  // ✅
neverSchema.parse("x");       // ❌ Always throws
```

## Common Pitfalls

- **`z.date()` only accepts `Date` objects.** Strings like `"2023-01-01"` must be coerced or preprocessed.
- **`z.void()` is not the same as `z.undefined()`.** While both accept `undefined`, `void` is semantically for function returns.
- **`z.never()` is for impossible states, not for banning fields.** Use `z.never()` in union exhaustiveness checks.

## Link to Source

See [`src/primitive.ts`](../src/primitive.ts) for exhaustive primitive demonstrations.

## Try It Yourself

1. Create a schema that accepts either a `Date` object or `null`.
2. Write a schema that accepts `undefined` but rejects `null`.
3. Experiment with `z.never()` inside a discriminated union to model an exhaustive switch.
