# 11 — Pipelines

Pipelines allow you to chain multiple schemas so that the output of one becomes the input of the next. This is useful when you need to validate in stages — for example, first ensuring a value is a string, then ensuring it looks like an email. Zod provides two pipeline mechanisms: `z.preprocess()` for transforming raw input before validation, and `.pipe()` for chaining fully-typed schemas.

Preprocessing is ideal for normalizing messy external data: trimming whitespace, coercing types, or parsing dates from strings. `.pipe()` is ideal when you want each stage to contribute to type inference — the final inferred type is the output type of the last schema in the pipe.

## Examples

```typescript
import { z } from "zod";

// Preprocess: normalize before validation
const CleanString = z.preprocess((val) => {
  if (typeof val === "string") return val.trim().toLowerCase();
  return val;
}, z.string().min(3));

CleanString.parse("  HELLO  "); // ✅ "hello"
```

## Pipe: Chained Validation

```typescript
const StringThenEmail = z.string().pipe(z.string().email());
const StringThenNumber = z.string().pipe(z.coerce.number().int().positive());

StringThenEmail.parse("user@example.com"); // ✅
StringThenNumber.parse("42");              // ✅ 42
```

## Preprocess + Pipe

```typescript
const CleanId = z.preprocess(
  (val) => (typeof val === "string" ? val.trim() : val),
  z.string().length(8).pipe(
    z.string().regex(/^[A-Z0-9]{8}$/)
  )
);

CleanId.parse("  AB12CD34  "); // ✅ "AB12CD34"
```

## Common Pitfalls

- **Preprocess functions run before type checks.** If your preprocess returns a number but the schema expects a string, Zod will throw.
- **`.pipe()` requires compatible input/output types.** The output of the left schema must be assignable to the input of the right schema.
- **Preprocess does not participate in type inference for the input type.** Use `z.input<typeof schema>` to see the raw accepted type.

## Link to Source

See [`src/pipeline.ts`](../src/pipeline.ts) for preprocess and pipe demonstrations.

## Try It Yourself

1. Create a preprocess that converts `"true"` / `"false"` strings to booleans before validation.
2. Pipe a string schema into a number schema via `z.coerce.number()` and add a `.min(0)` constraint.
3. Write a pipeline that trims a string, checks it is a valid ISO date, then parses it to a `Date` object.
