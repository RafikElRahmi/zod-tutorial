# 08 — Complex Types

Real-world data is rarely flat. Zod provides powerful tools for modeling unions, intersections, recursive structures, and specialized collections like `Map`, `Set`, and `Record`. These schemas let you express almost any TypeScript type at runtime.

Unions allow a value to match one of several schemas. Intersections require a value to match all of them simultaneously. Recursive schemas — defined with `z.lazy()` — are essential for tree-like data such as file systems or comment threads.

## Examples

```typescript
import { z } from "zod";

const StringOrNumber = z.union([z.string(), z.number()]);
const NamedAndAged = z.intersection(
  z.object({ name: z.string() }),
  z.object({ age: z.number() })
);
```

## Recursive Schema

```typescript
const CategorySchema: z.ZodType<any> = z.lazy(() =>
  z.object({
    name: z.string(),
    children: z.array(CategorySchema),
  })
);

CategorySchema.parse({
  name: "Electronics",
  children: [{ name: "Phones", children: [] }],
}); // ✅
```

## Collections

```typescript
const StringNumberMap = z.map(z.string(), z.number());
const UniqueTags = z.set(z.string());
const RecordSchema = z.record(z.string(), z.number());
```

## Common Pitfalls

- **Discriminated unions need a shared literal key.** Without one, Zod tries every branch and may return confusing errors.
- **`z.lazy()` requires explicit typing.** TypeScript cannot infer recursive types automatically.
- **`z.record(z.string(), z.number())` allows any string key.** For fixed keys, use `z.object()` instead.
- **`z.promise()` validates the promise itself, not the resolved value.** Use `.parseAsync()` or await the promise first.

## Link to Source

See [`src/complex.ts`](../src/complex.ts) for union, intersection, tuple, record, map, set, lazy, and promise demonstrations.

## Try It Yourself

1. Model a file system tree where each node is either a File (with `name` and `size`) or a Directory (with `name` and `children`).
2. Create a schema for a `Map<string, Date>` and validate a real `Map` instance.
3. Write a discriminated union for API responses with `status: "success"` and `status: "error"`.
