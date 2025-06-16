# Zod Tutorial

A hands-on tutorial for learning [Zod](https://zod.dev) — TypeScript-first schema validation with static type inference.

## What is Zod and Why It Matters

Zod is a TypeScript-first schema declaration and validation library. It lets you build schemas that validate data at runtime **and** automatically infer static TypeScript types. This eliminates an entire class of bugs where your runtime data does not match your compile-time assumptions.

Unlike manual type guards or interfaces, Zod schemas are executable. You can parse unknown inputs, coerce values, add custom validations, and generate detailed error messages — all while staying completely type-safe.

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- Basic TypeScript knowledge
- `pnpm` installed globally (`npm install -g pnpm`)

## Installation

```bash
pnpm install
```

This installs `zod`, `typescript`, and `ts-node`.

## Quick Start

```typescript
import { z } from "zod";

const emailSchema = z.string().email();

emailSchema.parse("user@example.com"); // ✅ "user@example.com"
emailSchema.parse("not-an-email");     // ❌ Throws ZodError
```

## Learning Path

The tutorial is organized into 13 progressive topics. Work through them in order:

| # | Topic | Source File | Run Command |
|---|-------|-------------|-------------|
| 1 | Primitives | `src/primitive.ts` | `pnpm test:primitive` |
| 2 | Strings | `src/strings.ts` | `pnpm test:strings` |
| 3 | Numbers | `src/numbers.ts` | `pnpm test:numbers` |
| 4 | Booleans | `src/booleans.ts` | `pnpm test:booleans` |
| 5 | Objects | `src/objects.ts` | `pnpm test:objects` |
| 6 | Arrays | `src/arrays.ts` | `pnpm test:arrays` |
| 7 | Complex Types | `src/complex.ts` | `pnpm test:complex` |
| 8 | Custom Validations | `src/customized.ts` | `pnpm test:customized` |
| 9 | Wrappers & Modifiers | `src/wrappers.ts` | `pnpm test:wrappers` |
| 10 | Pipelines | `src/pipeline.ts` | `pnpm test:pipeline` |
| 11 | Advanced Features | `src/advanced.ts` | `pnpm test:advanced` |
| 12 | Additional Utilities | `src/additional.ts` | `pnpm test:additional` |
| 13 | Safe Parse & Errors | `src/safe-parse.ts` | `pnpm test:safe-parse` |

## Running Tests

Run an individual topic:

```bash
pnpm test:primitive
pnpm test:strings
# ... etc
```

Run all topics (summary):

```bash
pnpm test
```

## Project Structure

```
zod-tutorial/
├── src/               # Topic source files
│   ├── utils/         # testValue helper and shared enums
│   ├── primitive.ts
│   ├── strings.ts
│   ├── numbers.ts
│   ├── booleans.ts
│   ├── objects.ts
│   ├── arrays.ts
│   ├── complex.ts
│   ├── customized.ts
│   ├── wrappers.ts
│   ├── pipeline.ts
│   ├── advanced.ts
│   ├── additional.ts
│   └── safe-parse.ts
├── docs/              # Conceptual guides for each topic
├── examples/          # Real-world usage examples
├── package.json
└── tsconfig.json
```

## Zod vs Other Libraries

| Feature | Zod | Yup | Joi | Valibot |
|---------|-----|-----|-----|---------|
| TypeScript-first | ✅ Native | ⚠️ Add-on | ⚠️ Add-on | ✅ Native |
| Bundle size | ~12 KB | ~18 KB | ~45 KB | < 1 KB (modular) |
| Static type inference | ✅ | ⚠️ Limited | ⚠️ Limited | ✅ |
| Tree-shakeable | ⚠️ Partial | ❌ | ❌ | ✅ |
| Native ESM | ✅ | ✅ | ❌ | ✅ |
| No dependencies | ✅ | ❌ | ❌ | ✅ |
| Coercion built-in | ✅ | ❌ | ✅ | ✅ |
| Branded types | ✅ | ❌ | ❌ | ❌ |
| `.pipe()` chaining | ✅ | ❌ | ❌ | ✅ |

## Next Steps

1. Read `docs/01-introduction.md` for conceptual background.
2. Work through each `src/` file, running the commands above.
3. Check `examples/` for real-world patterns.
4. Experiment with the "Try It Yourself" challenges at the end of each doc.

Happy validating!
