# 09 — Custom Validations

Zod's built-in validators cover most common cases, but real applications often need domain-specific rules. Zod provides three powerful hooks for custom logic: `.refine()` for synchronous checks, `.superRefine()` for multi-error validation with context, and `.transform()` for mutating values during parsing.

These methods are composable: you can chain them in any order, and they integrate seamlessly with TypeScript inference. Use `.refine()` for simple one-off checks, `.superRefine()` when you need to report multiple issues or control the error path, and `.transform()` when you need to normalize or compute values.

## Examples

```typescript
import { z } from "zod";

const password = z.string().refine((val) => /[A-Z]/.test(val), {
  message: "Password must contain an uppercase letter",
});
```

## superRefine for Cross-Field Validation

```typescript
const RegistrationSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords must match",
        path: ["confirmPassword"],
      });
    }
  });
```

## Transform with Context

```typescript
const UppercaseString = z.string().transform((val, ctx) => {
  if (val.length < 3) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Too short",
    });
    return z.NEVER;
  }
  return val.toUpperCase();
});
```

## Common Pitfalls

- **`.refine()` cannot access the Zod parse context.** Use `.superRefine()` if you need `ctx.addIssue()`.
- **Returning `z.NEVER` from `.transform()` signals an error.** Always return it after adding an issue.
- **Async refine requires `.parseAsync()` or `.safeParseAsync()`.** Using `.parse()` on an async refine throws.

## Link to Source

See [`src/customized.ts`](../src/customized.ts) for refine, superRefine, transform, and coerce demonstrations.

## Try It Yourself

1. Write a `.refine()` that validates a string is a valid hex color.
2. Use `.superRefine()` to ensure an object's `startDate` is before its `endDate`.
3. Create a `.transform()` that parses a comma-separated string into an array of trimmed strings.
