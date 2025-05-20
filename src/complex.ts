import { z } from "zod";
import { testValue } from "./utils/testSchema";
import { ColorsEnum } from "./utils/enum";

/**
 * A Zod schema for validating objects with a specific structure.
 * Accepts any valid object.
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
 * Accepts any valid array.
 */
const arraySchema = z.array(z.string());

/**
 * A Zod schema for validating tuples.
 * Accepts a tuple with a string and a number.
 */
const tupleSchema = z.tuple([z.string(), z.number()]);

/**
 * A Zod schema for validating enums.
 * Accepts a specific set of string values.
 */
const enumSchema = z.enum(["red", "green", "blue"]);

/**
 * A Zod schema for validating enums.
 * Accepts a value of specific enum.
 */
const nativeEnumSchema = z.nativeEnum(ColorsEnum);

/**
 * A Zod schema for validating literal values.
 * Accepts a specific string value.
 */
const literalSchema = z.literal("hello");

/**
 * A Zod schema for validating unions.
 * Accepts either a string or a number.
 */
const unionSchema = z.union([
    z.object({ name: z.string() }),
    z.object({ age: z.number() }),
]);

/**
 * A Zod schema for validating intersections.
 * Accepts an object that satisfies both schemas.
 */
const intersectionSchema = z.intersection(
    z.object({ name: z.string() }),
    z.object({ age: z.number() })
);

/**
 * A Zod schema for validating discriminated unions.
 * Accepts either a "cat" or "dog" object.
 */
const discriminatedUnionSchema = z.discriminatedUnion("type", [
    z.object({ type: z.literal("cat"), meow: z.boolean() }),
    z.object({ type: z.literal("dog"), bark: z.boolean() }),
]);

/**
 * A Zod schema for validating records.
 * Accepts an object with string keys and number values.
 */
const recordSchema = z.record(z.string(), z.number());

/**
 * A Zod schema for validating lazy schemas.
 * Accepts a schema that references itself.
 */
const lazySchema = z.lazy(() =>
    z.object({
        name: z.string(),
        children: z.array(lazySchema),
    })
);

/**
 * A Zod schema for validating promises.
 * Accepts a promise that resolves to a string.
 */
const promiseSchema = z.promise(z.string());

/**
 * A Zod schema for validating sets.
 * Accepts a set of strings.
 */
const setSchema = z.set(z.string());

/**
 * A Zod schema for validating maps.
 * Accepts a map with string keys and number values.
 */
const mapSchema = z.map(z.string(), z.number());

/**
 * A Zod schema for validating functions.
 * Accepts a function that takes a string and returns a number.
 */
const functionSchema = z.function(z.tuple([z.string()]));

/**
 * A Zod schema for validating instances of a specific class.
 * Accepts an instance of the `Date` class.
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