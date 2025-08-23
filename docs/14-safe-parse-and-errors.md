# 14 — Safe Parse and Errors

By default, `schema.parse()` throws a `ZodError` when validation fails. This is fine for controlled environments, but in production code — especially when handling user input or external APIs — you often need to handle errors gracefully. Zod provides `.safeParse()` and `.safeParseAsync()` for this purpose. They return a discriminated union (`{ success: true; data: T } | { success: false; error: ZodError }`) that you can inspect without try/catch blocks.

When validation fails, Zod collects every issue into a `ZodError` object. You can format these issues for display using `.format()` (nested object format) or `.flatten()` (flat field-to-messages map). Understanding how to extract and present these errors is critical for building user-friendly forms and APIs.

## Examples

```typescript
import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(1),
  age: z.number().min(0),
});

const result = UserSchema.safeParse({ name: "", age: -1 });

if (!result.success) {
  console.log(result.error.issues);
  // Array of ZodIssue objects
}
```

## Formatting Errors

```typescript
const result = UserSchema.safeParse({ name: "", age: -1 });

if (!result.success) {
  const formatted = result.error.format();
  // { name: { _errors: ["String must contain at least 1 character(s)"] }, ... }

  const flat = result.error.flatten();
  // { formErrors: [], fieldErrors: { name: [...], age: [...] } }
}
```

## Async Safe Parse

```typescript
const AsyncSchema = z.string().refine(async (val) => val.length > 3);

const result = await AsyncSchema.safeParseAsync("hi");
if (!result.success) {
  console.log(result.error.message);
}
```

## Common Pitfalls

- **`.safeParse()` does not throw.** Always check `result.success` before accessing `result.data`.
- **`ZodError` extends `Error`.** You can catch it with `instanceof z.ZodError` when using `.parse()`.
- **`.flatten()` loses nested path information.** Use `.issues` or `.format()` when you need to display nested errors.
- **`.safeParseAsync()` requires `await`.** Forgetting to await returns a `Promise<Result>`, not the result itself.

## Link to Source

See [`src/safe-parse.ts`](../src/safe-parse.ts) for safeParse, safeParseAsync, and error formatting demonstrations.

## Try It Yourself

1. Parse an invalid object with `.safeParse()` and print each issue's `path` and `message`.
2. Use `.flatten()` to build a `Record<string, string[]>` suitable for a form UI.
3. Write an async schema and handle errors with `.safeParseAsync()`.
