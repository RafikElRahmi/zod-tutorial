import { z } from "zod";
import { testAsyncValue, testValue } from "./utils/testSchema";

/**
 * A Zod schema that uses `.refine` for custom validation.
 * add custom validation to the schema.
 */
const refinedSchema = z.string().refine((val) => val.length > 5, {
    message: "String must be longer than 5 characters",
});

/**
 * A Zod schema that uses `.refine` with an asynchronous function.
 * add async custom validation to the schema.
 */
const asyncRefinedSchema = z.string().refine(
    async (val) => {
        await new Promise((resolve: (value: unknown) => void) => {
            setTimeout(resolve, 1000);
        });
        return val.includes("@");
    },
    {
        message: "String must include '@'",
    }
);

/**
 * A Zod schema that uses `.superRefine` for advanced validation.
 * This method allows you to add multiple issues to the context.
 */
const superRefinedSchema = z
    .object({
        password: z.string(),
        confirmPassword: z.string(),
    })
    .superRefine((data, ctx) => {
        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Passwords do not match",
                path: ["confirmPassword"],
            });
        }
    });

/*   refine doesn't have access to ctx and its only one error check   */
/* superRefine have access to the ctx and validates multiple erros  */

/**
 * A Zod schema that uses `.transform` to modify the input.
 * This method allows you to transform the value .
 */
const transformedSchema = z.string().transform((val, ctx) => {
    if (val.length <= 3) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "String must be longer than 3 characters",
        });
        return z.NEVER;
    }
    return val.toUpperCase();
});

/**
 * A Zod schema that uses `.transform` with an asynchronous function.
 * This method allows you to asynchronously transform the value.
 */
const asyncTransformedSchema = z.string().transform(async (val, ctx) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (!val.startsWith("A")) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "String must start with 'A'",
        });
        return z.NEVER;
    }
    return val.toLowerCase();
});

/**
 * A Zod schema that uses `.default` to set a default value.
 * This method allows you to set a default value for the schema.
 */
const defaultSchema = z.string().default("default value");

/**
 * A Zod schema that uses `.coerce` to coerce input values.
 * This method allows you to transform input values into the desired type.
 */
const coercedSchema = z.coerce.number();

/* Success: returns "vinirious" */
console.log(testValue(refinedSchema, "vinirious"));

// Fail: Error: String must be longer than 5 characters
console.log(testValue(refinedSchema, "vin"));

// Success: returns "vinirious@"
console.log(testAsyncValue(asyncRefinedSchema, "vinirious@"));

// Fail: Error: String must include '@'
console.log(testAsyncValue(asyncRefinedSchema, "vinirious"));

/* Success: returns  {
    password: "vinirious",
    confirmPassword: "vinirious",
} */
console.log(testValue(superRefinedSchema, {
    password: "vinirious",
    confirmPassword: "vinirious",
}));

// Fail: Error: Passwords do not match
console.log(testValue(superRefinedSchema, {
    password: "vinirious",
    confirmPassword: "vinirious@",
}));

/* Success: returns "VINIRIOUS" */
console.log(testValue(transformedSchema, "vinirious"));

// Fail: Error: String must be longer than 3 characters
console.log(testValue(transformedSchema, "vin"));

// Success: returns "Avinirious@"
console.log(testAsyncValue(asyncTransformedSchema, "Avinirious@"));

// Fail: Error: String must start with 'A'
console.log(testAsyncValue(asyncTransformedSchema, "vinirious@"));

/* Success: returns "default value" */
console.log(testValue(defaultSchema, undefined));

// Success: returns "custom value"
console.log(testValue(defaultSchema, "custom value"));

/* Success: returns 42 */
console.log(testValue(coercedSchema, "42"));

// Success: returns 42
console.log(testValue(coercedSchema, 42));

// Fail: Error: Expected number, received nan
console.log(testValue(coercedSchema, "vinirious"));