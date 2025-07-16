# 07 — Array Schemas

Arrays in Zod are defined with `z.array(elementSchema)`. You can chain validators to enforce minimum and maximum lengths, require non-empty arrays, or check that every element matches a specific schema. Arrays are homogeneous by default — all elements must conform to the same schema — but you can use tuples for fixed-length, heterogeneous arrays.

When validating arrays from external sources, remember that empty arrays are valid by default. If your business logic requires at least one element, use `.nonempty()` or `.min(1)`.

## Examples

```typescript
import { z } from "zod";

const tags = z.array(z.string()).min(1).max(10);
const coordinates = z.tuple([z.number(), z.number()]);

 tags.parse(["typescript", "zod"]); // ✅
 coordinates.parse([10.5, 20.3]);   // ✅
```

## Length Constraints

```typescript
const exactlyThree = z.array(z.string()).length(3);
const nonemptyNumbers = z.array(z.number()).nonempty();

exactlyThree.parse(["a", "b", "c"]); // ✅
exactlyThree.parse(["a", "b"]);      // ❌
nonemptyNumbers.parse([]);           // ❌
```

## Common Pitfalls

- **`.nonempty()` returns a tuple-like type.** The inferred type is `[T, ...T[]]` rather than `T[]`.
- **`.element` extracts the inner schema.** Use it when you need to validate a single item against the array's element type.
- **Tuples are fixed-length.** `z.tuple([z.string(), z.number()])` rejects `["a", 1, 2]` unless you add `.rest()`.

## Link to Source

See [`src/arrays.ts`](../src/arrays.ts) for array demonstrations.

## Try It Yourself

1. Define a schema for a non-empty array of unique email strings.
2. Create a tuple schema for `[string, number, boolean]` and test it.
3. Write a schema for an array of objects where each object has `id` (number) and `name` (string, min 1).
