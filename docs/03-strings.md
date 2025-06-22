# 03 — String Validations

Strings are the most common data type in web applications, and Zod provides an extensive collection of built-in validators for them. You can enforce length constraints, validate formats (email, URL, UUID), transform casing, and even check against custom regular expressions. All string methods are chainable, so you can compose complex constraints naturally.

Keep in mind that `.trim()`, `.toLowerCase()`, and `.toUpperCase()` are **transforms** — they mutate the output value, not just validate it. If you chain `.trim()` before `.min(5)`, the min check runs on the trimmed result.

## Examples

```typescript
import { z } from "zod";

const username = z.string().min(3).max(20).trim();
const email = z.string().email();
const url = z.string().url();
const uuid = z.string().uuid();

username.parse("  alice  "); // ✅ "alice"
email.parse("alice@example.com"); // ✅
url.parse("https://example.com"); // ✅
uuid.parse("550e8400-e29b-41d4-a716-446655440000"); // ✅
```

## Regex and Content Checks

```typescript
const slug = z.string().regex(/^[a-z0-9-]+$/, {
  message: "Slug must be lowercase alphanumeric with hyphens",
});

const greeting = z.string().startsWith("Hello").endsWith("!");

slug.parse("hello-world"); // ✅
slug.parse("Hello World"); // ❌
greeting.parse("Hello world!"); // ✅
```

## Common Pitfalls

- **`.email()` uses a broad regex.** It catches obvious mistakes but is not RFC 5322 compliant. For stricter checks, use `.refine()` with a library like `validator`.
- **Transforms run before subsequent validations.** `z.string().trim().min(5)` trims first, then checks length.
- **`.datetime()` expects ISO 8601 format.** `"2023-10-01"` fails; use `.date()` for date-only strings.

## Link to Source

See [`src/strings.ts`](../src/strings.ts) for all string validators.

## Try It Yourself

1. Define a schema for a hex color code (starts with `#`, followed by 6 hex digits).
2. Create a schema for a password that is 8–64 characters and contains at least one uppercase letter and one digit.
3. Write a schema that trims and lowercases an email before validating it.
