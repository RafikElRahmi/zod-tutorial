# Examples

This folder contains real-world Zod usage patterns. Each example is a standalone TypeScript file you can run with `ts-node`.

## Index

| File | Topic | Run Command |
|------|-------|-------------|
| [`01-api-validation.ts`](./01-api-validation.ts) | Validate an Express-like request body with nested objects | `npx ts-node examples/01-api-validation.ts` |
| [`02-form-validation.ts`](./02-form-validation.ts) | Validate a registration form with cross-field rules | `npx ts-node examples/02-form-validation.ts` |
| [`03-config-loading.ts`](./03-config-loading.ts) | Load and validate environment variables with defaults | `npx ts-node examples/03-config-loading.ts` |
| [`04-api-response.ts`](./04-api-response.ts) | Parse and safely validate an external API response | `npx ts-node examples/04-api-response.ts` |

## Patterns Demonstrated

- **Safe parsing** with `.safeParse()` to avoid throwing on invalid input
- **Nested object validation** for request bodies and configuration
- **Cross-field validation** with `.superRefine()`
- **Coercion and preprocessing** for environment variables
- **Union types** for API responses that may return data or errors
- **Default values** and optional/nullable fields

## Running All Examples

```bash
npx ts-node examples/01-api-validation.ts
npx ts-node examples/02-form-validation.ts
npx ts-node examples/03-config-loading.ts
npx ts-node examples/04-api-response.ts
```
