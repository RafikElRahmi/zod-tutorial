import { z } from "zod";
import { testValue } from "./utils/testSchema";

/**
 * A Zod schema that wraps a string as optional.
 * Accepts the inner type OR undefined. Equivalent to z.string().optional().
 */
const optionalSchema = z.optional(z.string());

/**
 * A Zod schema that wraps a string as nullable.
 * Accepts the inner type OR null. Equivalent to z.string().nullable().
 */
const nullableSchema = z.nullable(z.string());

/**
 * A Zod schema that wraps a string as nullish.
 * Accepts the inner type, null, OR undefined. Shorthand for .nullable().optional().
 */
const nullishSchema = z.string().nullish();

/**
 * A Zod object schema demonstrating optional and nullable fields together.
 * Shows real-world usage inside an object.
 */
const userSchema = z.object({
    name: z.string(),
    nickname: z.string().optional(),
    bio: z.string().nullable(),
    tagline: z.string().nullish(),
});

// Success: returns undefined
console.log(testValue(optionalSchema, undefined));

// Success: returns "hello"
console.log(testValue(optionalSchema, "hello"));

// Fail: Error: Expected string, received number
console.log(testValue(optionalSchema, 42));

// Success: returns null
console.log(testValue(nullableSchema, null));

// Success: returns "hello"
console.log(testValue(nullableSchema, "hello"));

// Fail: Error: Expected string, received undefined
console.log(testValue(nullableSchema, undefined));

// Success: returns null
console.log(testValue(nullishSchema, null));

// Success: returns undefined
console.log(testValue(nullishSchema, undefined));

// Success: returns "hello"
console.log(testValue(nullishSchema, "hello"));

// Success: all optional/nullable fields provided
console.log(
    testValue(userSchema, {
        name: "Alice",
        nickname: "ali",
        bio: "Software engineer",
        tagline: "Hello world",
    })
);

// Success: optional field omitted, nullable field set to null
console.log(
    testValue(userSchema, {
        name: "Bob",
        bio: null,
    })
);

// Fail: Error: bio is required (nullable !== optional)
console.log(
    testValue(userSchema, {
        name: "Carol",
    })
);

// Fail: Error: nickname must be string, not number
console.log(
    testValue(userSchema, {
        name: "Dave",
        nickname: 99,
        bio: null,
    })
);
