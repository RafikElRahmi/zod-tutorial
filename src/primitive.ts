import { z } from "zod";
import { testValue } from "./utils/testSchema";

/**
 * A Zod schema for validating string values.
 * Accepts any valid string.
 */
const stringSchema = z.string();

/**
 * A Zod schema for validating number values.
 * Accepts any valid number.
 */
const numberSchema = z.number();

/**
 * A Zod schema for validating boolean values.
 * Accepts `true` or `false`.
 */
const booleanSchema = z.boolean();

/**
 * A Zod schema for validating date values.
 * Accepts any valid JavaScript `Date` object.
 */
const dateSchema = z.date();

/**
 * A Zod schema for validating bigint values.
 * Accepts any valid `bigint`.
 */
const bigintSchema = z.bigint();

/**
 * A Zod schema for validating symbol values.
 * Accepts any valid `Symbol`.
 */
const symbolSchema = z.symbol();

/**
 * A Zod schema for validating undefined values.
 * Accepts only `undefined`.
 */
const undefinedSchema = z.undefined();

/**
 * A Zod schema for validating null values.
 * Accepts only `null`.
 */
const nullSchema = z.null();

/**
 * A Zod schema for validating any value.
 * Accepts any value without restrictions.
 */
const anySchema = z.any();

/**
 * A Zod schema for validating unknown values.
 * Accepts any value but does not infer a specific type.
 */
const unknownSchema = z.unknown();
/**
 * A Zod schema for validating void values.
 * Accepts `undefined` (commonly used for functions with no return value).
 */

const voidSchema = z.void();

/**
 * A Zod schema for validating never values.
 * Accepts no value (used to represent unreachable code or impossible states).
 */
const neverSchema = z.never();

// Success: returns "Hello"
console.log(testValue(stringSchema, "Hello"));

// Success: returns 123
console.log(testValue(numberSchema, 123));

// Fail: Error: Expected number, received string
console.log(testValue(numberSchema, "123"));

// Success: returns true
console.log(testValue(booleanSchema, true));

// Fail: Error: Expected boolean, received string
console.log(testValue(booleanSchema, "true"));

// Fail: Error: Expected boolean, received number
console.log(testValue(booleanSchema, 1));

// Fail: Error: Expected boolean, received null
console.log(testValue(booleanSchema, null));

// Success: returns the Date object
console.log(testValue(dateSchema, new Date()));

// Fail: Error: Expected date, received string
console.log(testValue(dateSchema, "2023-01-01"));

// Fail: Error: Expected date, received number
console.log(testValue(dateSchema, Date.now()));

// Fail: Error: Expected date, received null
console.log(testValue(dateSchema, null));

// Success: returns BigInt(123)
//@ts-ignore
console.log(testValue(bigintSchema, BigInt("9007199254740991")));

// Fail: Error: Expected bigint, received number
console.log(testValue(bigintSchema, 123));

// Fail: Error: Expected bigint, received string
console.log(testValue(bigintSchema, "123"));

// Success: returns the Symbol
//@ts-ignore
console.log(testValue(symbolSchema, Symbol("test")));

// Fail: Error: Expected symbol, received string
console.log(testValue(symbolSchema, "test"));

// Fail: Error: Expected symbol, received number
console.log(testValue(symbolSchema, 123));

// Success: returns undefined
console.log(testValue(undefinedSchema, undefined));

// Fail: Error: Expected undefined, received null
console.log(testValue(undefinedSchema, null));

// Fail: Error: Expected undefined, received string
console.log(testValue(undefinedSchema, "undefined"));

// Success: returns null
console.log(testValue(nullSchema, null));

// Fail: Error: Expected null, received undefined
console.log(testValue(nullSchema, undefined));

// Fail: Error: Expected null, received string
console.log(testValue(nullSchema, "null"));

// Fail: Error: Expected null, received boolean
console.log(testValue(nullSchema, false));

// Success: returns "Hello"
console.log(testValue(anySchema, "Hello"));

// Success: returns 123
console.log(testValue(anySchema, 123));

// Success: returns true
console.log(testValue(anySchema, true));

// Success: returns null
console.log(testValue(anySchema, null));

// Success: returns undefined
console.log(testValue(anySchema, undefined));

// Success: returns "Hello"
console.log(testValue(unknownSchema, "Hello"));

// Success: returns 123
console.log(testValue(unknownSchema, 123));

// Success: returns true
console.log(testValue(unknownSchema, true));

// Success: returns null
console.log(testValue(unknownSchema, null));

// Success: returns undefined
console.log(testValue(unknownSchema, undefined));

// Success: returns undefined
console.log(testValue(voidSchema, undefined));

// Fail: Error: Expected void, received null
console.log(testValue(voidSchema, null));

// Fail: Error: Expected void, received boolean
console.log(testValue(voidSchema, false));

// Fail: Error: Expected never, received undefined
console.log(testValue(neverSchema, undefined));

// Fail: Error: Expected never, received null
console.log(testValue(neverSchema, null));

// Fail: Error: Expected never, received boolean
console.log(testValue(neverSchema, false));
