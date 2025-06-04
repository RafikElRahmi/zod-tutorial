import { z } from "zod";
import { testValue } from "./utils/testSchema";

/**
 * z.preprocess runs a function on the raw input BEFORE Zod validates it.
 * Useful for normalizing external data (e.g. coercing a string to a number).
 */
const preprocessedSchema = z.preprocess((val) => {
    if (typeof val === "string") return val.trim().toLowerCase();
    return val;
}, z.string().min(3));

/**
 * A more practical preprocess: convert a string date to a Date object.
 */
const preprocessedDateSchema = z.preprocess((val) => {
    if (typeof val === "string") return new Date(val);
    return val;
}, z.date());

/**
 * z.pipe chains two schemas: the output of the first is the input of the second.
 * Unlike preprocess, both schemas participate in type inference.
 * Here: parse as unknown string, then validate it looks like an email.
 */
const pipedEmailSchema = z.string().pipe(z.string().email());

/**
 * A pipe from string → number via coerce, then apply number constraints.
 * The first schema coerces, the second validates the resulting number.
 */
const pipedNumberSchema = z.string().pipe(z.coerce.number().int().positive());

/**
 * Combining preprocess + pipe: strip whitespace, then validate length + format.
 */
const cleanedIdSchema = z.preprocess(
    (val) => (typeof val === "string" ? val.trim() : val),
    z.string().length(8).pipe(z.string().regex(/^[A-Z0-9]{8}$/, "Must be 8 uppercase alphanumeric characters"))
);

// Success: returns "  HELLO  " trimmed and lowercased → "hello"
console.log(testValue(preprocessedSchema, "  HELLO  "));

// Success: returns "abc"
console.log(testValue(preprocessedSchema, "abc"));

// Fail: Error: String must contain at least 3 character(s) — "hi" after trim
console.log(testValue(preprocessedSchema, "  hi  "));

// Fail: Error: Expected string, received number — preprocess passes number through, zod rejects
console.log(testValue(preprocessedSchema, 123));

// Success: returns Date object for "2024-01-15"
console.log(testValue(preprocessedDateSchema, "2024-01-15"));

// Success: returns the Date object directly
console.log(testValue(preprocessedDateSchema, new Date()));

// Fail: Error: Expected date, received invalid date
console.log(testValue(preprocessedDateSchema, "not-a-date"));

// Success: returns "user@example.com"
console.log(testValue(pipedEmailSchema, "user@example.com"));

// Fail: Error: Invalid email — passes string check but fails email check
console.log(testValue(pipedEmailSchema, "not-an-email"));

// Fail: Error: Expected string, received number
console.log(testValue(pipedEmailSchema, 42));

// Success: coerces "7" to 7, passes int + positive checks
console.log(testValue(pipedNumberSchema, "7"));

// Fail: Error: Expected integer — "3.14" coerces to 3.14, fails int check
console.log(testValue(pipedNumberSchema, "3.14"));

// Fail: Error: Expected positive — "-5" coerces to -5
console.log(testValue(pipedNumberSchema, "-5"));

// Success: returns "AB12CD34"
console.log(testValue(cleanedIdSchema, "AB12CD34"));

// Success: trims whitespace then validates
console.log(testValue(cleanedIdSchema, "  AB12CD34  "));

// Fail: Error: Must be 8 uppercase alphanumeric characters
console.log(testValue(cleanedIdSchema, "ab12cd34"));

// Fail: Error: String must be exactly 8 character(s)
console.log(testValue(cleanedIdSchema, "AB12CD"));
