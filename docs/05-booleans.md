# 05 — Boolean Schemas

Boolean validation in Zod is straightforward but strict. `z.boolean()` accepts only `true` or `false` — not truthy/falsy values like `1`, `0`, `"true"`, or `"false"`. This strictness prevents subtle bugs caused by implicit type coercion.

In Zod v4, a `stringbool` schema is available for cases where you genuinely need to parse string representations of booleans (e.g., query parameters or form data). In Zod v3, you can achieve the same with `.transform()` or `.preprocess()`.

## Examples

```typescript
import { z } from "zod";

const boolSchema = z.boolean();

boolSchema.parse(true);    // ✅
boolSchema.parse(false);   // ✅
boolSchema.parse("true");  // ❌
boolSchema.parse(1);       // ❌
boolSchema.parse(null);    // ❌
```

## Coercing Strings to Booleans

```typescript
const stringBoolSchema = z.preprocess((val) => {
  if (typeof val === "string") {
    if (val === "true" || val === "1") return true;
    if (val === "false" || val === "0") return false;
  }
  return val;
}, z.boolean());

stringBoolSchema.parse("true");  // ✅ true
stringBoolSchema.parse("0");     // ✅ false
```

## Common Pitfalls

- **`Boolean("false")` returns `true`.** The native `Boolean` constructor considers any non-empty string truthy. Do not rely on it for parsing.
- **Form checkboxes may submit `"on"` or nothing.** You may need a custom preprocess rather than a simple boolean schema.
- **JSON does not have a boolean string type.** If your API returns `"true"`, fix the API or use coercion.

## Link to Source

See [`src/booleans.ts`](../src/booleans.ts) for boolean demonstrations.

## Try It Yourself

1. Create a schema that accepts `"yes"` / `"no"` / `"true"` / `"false"` / `"1"` / `"0"` and normalizes them to boolean.
2. Write a schema for an object with an `isActive` field that defaults to `true` when undefined.
3. Define a schema that rejects `null` but accepts `false`.
