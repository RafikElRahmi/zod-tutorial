# 04 — Number Validations

Zod's number schema goes far beyond checking if a value is a number. You can enforce ranges, require integers, check divisibility, and validate against Infinity or unsafe values. BigInt schemas support the same range constraints, making Zod one of the few validation libraries with first-class BigInt support.

When working with user input, remember that form fields and JSON payloads often arrive as strings. Use `z.coerce.number()` or preprocessing if you need to accept `"42"` as a valid number.

## Examples

```typescript
import { z } from "zod";

const age = z.number().int().nonnegative().max(150);
const price = z.number().positive().multipleOf(0.01);
const rating = z.number().min(1).max(5);

age.parse(25);      // ✅
price.parse(19.99); // ✅
rating.parse(3);    // ✅
```

## BigInt Constraints

```typescript
const bigValue = z.bigint().positive().multipleOf(1000n);

bigValue.parse(5000n); // ✅
bigValue.parse(500n);  // ❌
```

## Common Pitfalls

- **`z.number()` accepts `NaN` by default.** Use `.finite()` or check explicitly if NaN is a concern.
- **`.positive()` rejects zero.** Use `.nonnegative()` if zero is acceptable.
- **`.step()` is an alias for `.multipleOf()`.** They behave identically.
- **`z.coerce.number()` converts booleans too.** `true` becomes `1`, `false` becomes `0`.

## Link to Source

See [`src/numbers.ts`](../src/numbers.ts) for all number and BigInt validators.

## Try It Yourself

1. Write a schema for a percentage value between 0 and 100 (inclusive) with at most 2 decimal places.
2. Define a schema for an even positive integer.
3. Create a schema that coerces a string to a number and then checks that it is a safe integer.
