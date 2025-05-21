import { z } from "zod";
import { testValue } from "./utils/testSchema";
import { ColorsEnum } from "./utils/enum";

/**
 * A Zod schema for validating objects with a specific structure.
 * validates onbject implementation
 */
const objectSchema = z.object({
    name: z.string(),
    details: z.object({
        age: z.number(),
        email: z.string().email(),
    }),
});

/**
 * A Zod schema for validating array values.
 * validate array implementation
 */
const arraySchema = z.array(z.string());

/**
 * A Zod schema for validating tuples.
 * Validates an array with a fixed number of elements with specific schemas.
 */
const tupleSchema = z.tuple([z.string(), z.number()]);

/**
 * A Zod schema for validating enums.
 * validate value if it is one of the specified array values.
 */
const enumSchema = z.enum(["red", "green", "blue"]);

/**
 * A Zod schema for validating enums.
 * validate value if it is one of the specified enum values.
 */
const nativeEnumSchema = z.nativeEnum(ColorsEnum);

/**
 * A Zod schema for validating literal values.
 * Validates that the value is the same.
 */
const literalSchema = z.literal("hello");

/**
 * A Zod schema for validating unions.
 * validates that the value is one or both of the specified schemas.
 */
const unionSchema = z.union([
    z.object({ name: z.string() }),
    z.object({ age: z.number() }),
]);

/**
 * A Zod schema for validating intersections.
 * validates that the value is both of the specified schemas.
 */
const intersectionSchema = z.intersection(
    z.object({ name: z.string() }),
    z.object({ age: z.number() })
);

/**
 * A Zod schema for validating discriminated unions.
 * validates that the value is one of the specified schemas with a common property.
 */
const discriminatedUnionSchema = z.discriminatedUnion("type", [
    z.object({ type: z.literal("cat"), meow: z.boolean() }),
    z.object({ type: z.literal("dog"), bark: z.boolean() }),
]);

/**
 * A Zod schema for validating records.
 * Validates the keys and values of an object.
 */
const recordSchema = z.record(z.string(), z.number());

/**
 * A Zod schema for validating lazy schemas.
 * validates a schema that references itself.
 */
const lazySchema = z.lazy(() =>
    z.object({
        name: z.string(),
        children: z.array(lazySchema),
    })
);

/**
 * A Zod schema for validating promises.
 * validtes a  promise return value.
 */
const promiseSchema = z.promise(z.string());

/**
 * A Zod schema for validating sets.
 * validates a Set of schema values.
 */
const setSchema = z.set(z.string());

/**
 * A Zod schema for validating maps.
 * validates a Map of schema keys & values.
 */
const mapSchema = z.map(z.string(), z.number());

/**
 * A Zod schema for validating functions.
 * validates a function with a specific signature.
 */
const functionSchema = z.function(z.tuple([z.string()]));

/**
 * A Zod schema for validating instances of a specific class.
 * validates instance if created from a specific class.
 */
const instanceSchema = z.instanceof(Date);

/* Success: returns {
        name: "John Doe",
        details: {
            age: 30,
            email : "email@email.com"
        }
    }
    */
console.log(
    testValue(objectSchema, {
        name: "John Doe",
        details: {
            age: 30,
            email: "email@email.com",
        },
    })
);

// Success: returns ["apple", "banana"]
console.log(testValue(arraySchema, ["apple", "banana"]));

// Success: returns ["apple", 42]
console.log(testValue(tupleSchema, ["apple", 42]));

// Fail: Error: Expected string, received number
console.log(testValue(tupleSchema, [42, "apple"]));

// Success: returns "red"
console.log(testValue(enumSchema, "red"));

// Success: returns "green"
console.log(testValue(enumSchema, ColorsEnum.GREEN));

// Fail: Error: Expected enum, received string
console.log(testValue(enumSchema, "yellow"));

// Success: returns "red"
console.log(testValue(nativeEnumSchema, ColorsEnum.RED));

// Success: returns "green"
console.log(testValue(nativeEnumSchema, "green"));

// Fail: Error: Expected enum, received string
console.log(testValue(nativeEnumSchema, "yellow"));

// Success: returns "hello"
console.log(testValue(literalSchema, "hello"));

// Fail: Error: Expected literal, received string
console.log(testValue(literalSchema, "world"));

// Success: returns { name: "hello" }
console.log(testValue(unionSchema, { name: "hello" }));

// Success: returns  { age: 42 }
console.log(testValue(unionSchema, { age: 42 }));

// Fail: Error: Expected union, received string
console.log(testValue(unionSchema, "hello"));

// Success: returns { name: "hello", age: 42 }
console.log(testValue(unionSchema, { name: "hello", age: 42 }));

// Fail: Error: Expected intersection, received string
console.log(testValue(intersectionSchema, "hello"));

// Success: returns { name: "hello", age: 42 }
console.log(testValue(intersectionSchema, { name: "hello", age: 42 }));

// Fail: Error: Expected intersection, received object missing required properties
console.log(testValue(intersectionSchema, { name: "hello" }));

// Fail: Error: Expected intersection, received object missing required properties
console.log(testValue(intersectionSchema, { age: 42 }));

// Success: returns { type: "cat", meow: true }
console.log(
    testValue(discriminatedUnionSchema, { type: "cat", meow: true })
);

// Success: returns { type: "dog", bark: true }
console.log(
    testValue(discriminatedUnionSchema, { type: "dog", bark: true })
);

// Fail: Error: Expected discriminated union, received object missing required properties
console.log(
    testValue(discriminatedUnionSchema, { type: "cat", bark: true })
);

// Success: returns { key1: 1, key2: 2 }
console.log(
    testValue(recordSchema, { key1: 1, key2: 2 })
);

// Fail: Error: Expected record, received object missing required properties
console.log(
    testValue(recordSchema, { key1: "1", key2: 2 })
);

// Success: returns { name: "John Doe", children: [] }
console.log(
    testValue(lazySchema, { name: "John Doe", children: [] })
);

// Success: returns { name: "John Doe", children: [{ name: "Child", children: [] }] }
console.log(
    testValue(lazySchema, {
        name: "John Doe",
        children: [{ name: "Child", children: [] }],
    })
);

// Fail: Error: Expected lazy schema, received object missing required properties
console.log(
    testValue(lazySchema, { name: "John Doe", children: "not an array" })
);

// Success: returns "Hello"
//@ts-ignore
console.log(testValue(promiseSchema, Promise.resolve("Hello")));

// Fail: Error: Expected promise, received string
console.log(testValue(promiseSchema, "Hello"));

// Success: returns Set { "apple", "banana" }
//@ts-ignore
console.log(testValue(setSchema, new Set(["apple", "banana"])));

// Fail: Error: Expected set, received array
console.log(testValue(setSchema, ["apple", "banana"]));

// Success: returns Map { "apple" => 1, "banana" => 2 }
//@ts-ignore
console.log(testValue(mapSchema, new Map([["apple", 1], ["banana", 2]])));

// Fail: Error: Expected map, received object
console.log(
    testValue(mapSchema, { apple: 1, banana: 2 })
);

// Success: returns function
console.log(testValue(functionSchema, (name: string) => name.length));

// Fail: Error: Expected function, received string
console.log(testValue(functionSchema, "Hello"));

// Success: returns Date object
console.log(testValue(instanceSchema, new Date()));

// Fail: Error: Expected Date, received string
console.log(testValue(instanceSchema, "2023-01-01"));