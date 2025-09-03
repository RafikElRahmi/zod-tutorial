# 15 — Best Practices

Knowing Zod's API is only half the battle. The other half is knowing when and how to apply it. This guide covers practical patterns for error handling, performance, schema organization, and integration with the rest of your application.

A common mistake is using `.parse()` everywhere and wrapping every call in try/catch. This creates noisy code and makes error handling inconsistent. Prefer `.safeParse()` at application boundaries (API handlers, form submissions) and `.parse()` only when you are confident the data is already validated (e.g., inside a function that received data from another Zod-validated source).

## When to Use safeParse

```typescript
// ✅ Good: API handler uses safeParse
app.post("/users", (req, res) => {
  const result = CreateUserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.flatten().fieldErrors });
  }
  const user = result.data;
  // ...
});
```

## Error Handling Patterns

```typescript
function formatZodError(error: z.ZodError) {
  return error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
  }));
}
```

## Performance Tips

- **Reuse schemas.** Do not redefine schemas inside request handlers; define them at module scope.
- **Avoid deep nesting when possible.** Deeply nested objects produce large issue arrays on failure.
- **Use `.pick()` and `.omit()` for DTOs.** Derive variants from a single source of truth instead of duplicating schemas.
- **Prefer `.refine()` over `.transform()` for validation.** Transforms run even when the input is already valid, adding overhead.

## Schema Organization

```typescript
// schemas/user.ts
export const UserSchema = z.object({ /* ... */ });
export const CreateUserSchema = UserSchema.omit({ id: true });
export const UpdateUserSchema = UserSchema.partial().required({ id: true });
```

## Common Pitfalls

- **Don't use `.catch()` on required fields.** It hides data quality issues.
- **Don't parse the same data multiple times.** Parse once at the boundary, then pass the typed result.
- **Don't forget that `.transform()` changes the output type.** The inferred type is the transformed type, not the input type.

## Try It Yourself

1. Refactor a `.parse()`-heavy module to use `.safeParse()` at boundaries.
2. Create a shared `schemas/` directory with base schemas and derived DTOs.
3. Benchmark a large array validation and experiment with `.nonempty()` vs `.min(1)`.
