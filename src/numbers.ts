import { z } from "zod";
import { testValue } from "./utils/testSchema";


const numberBaseSchema = z.number();
const bigIntSchema = z.bigint();
 
const gtSchema = numberBaseSchema.gt(5);
const gteSchema = numberBaseSchema.gte(5);
const ltSchema = numberBaseSchema.lt(10);
const lteSchema = numberBaseSchema.lte(10);
const positiveSchema = numberBaseSchema.positive();
const negativeSchema = numberBaseSchema.negative();
const nonpositiveSchema = numberBaseSchema.nonpositive();
const nonnegativeSchema = numberBaseSchema.nonnegative();
const multipleOfSchema = numberBaseSchema.multipleOf(2);
const intSchema = numberBaseSchema.int();

const bigIntGtSchema = bigIntSchema.gt(5n);
const bigIntGteSchema = bigIntSchema.gte(5n); 
const bigIntLtSchema = bigIntSchema.lt(5n);
const bigIntLteSchema = bigIntSchema.lte(5n); 
const bigIntPositiveSchema = bigIntSchema.positive();
const bigIntNonnegativeSchema = bigIntSchema.nonnegative();
const bigIntNegativeSchema = bigIntSchema.negative();
const bigIntNonpositiveSchema = bigIntSchema.nonpositive();
const bigIntMultipleOfSchema = bigIntSchema.multipleOf(5n);

const finiteSchema = numberBaseSchema.finite();
const safeNumberSchema = numberBaseSchema.safe();
const minSchema = numberBaseSchema.min(5);
const maxSchema = numberBaseSchema.max(10);
const stepSchema = numberBaseSchema.step(2);

// success: returns 6
console.log(testValue(gtSchema, 6));

//Fail: Error: Expected number greater than 5, received 5
console.log(testValue(gtSchema, 5));

// success: returns 5
console.log(testValue(gteSchema, 5));

//Fail: Error: Expected number greater than or equal to 5, received 4
console.log(testValue(gteSchema, 4));

// success: returns 9
console.log(testValue(ltSchema, 9));

//Fail: Error: Expected number less than 10, received 10
console.log(testValue(ltSchema, 10));

// success: returns 10
console.log(testValue(lteSchema, 10));

//Fail: Error: Expected number less than or equal to 10, received 11
console.log(testValue(lteSchema, 11));

// success: returns 5
console.log(testValue(positiveSchema, 5));

//Fail: Error: Expected number greater than 0, received 0
console.log(testValue(positiveSchema, 0));

// success: returns -5
console.log(testValue(negativeSchema, -5));

//Fail: Error: Expected number less than 0, received 0
console.log(testValue(negativeSchema, 0));

// success: returns 0
console.log(testValue(nonpositiveSchema, 0));

//Fail: Error: Expected number less than or equal to 0, received 5
console.log(testValue(nonpositiveSchema, 5));

// success: returns 5
console.log(testValue(nonnegativeSchema, 5));

//Fail: Error: Expected number greater than or equal to 0, received -5
console.log(testValue(nonnegativeSchema, -5));

// success: returns 6
console.log(testValue(multipleOfSchema, 6));

//Fail: Error: Expected number to be a multiple of 2, received 5
console.log(testValue(multipleOfSchema, 5));

// success: returns 6
console.log(testValue(intSchema, 6));

//Fail: Error: Expected integer, received 5.5
console.log(testValue(intSchema, 5.5));

// success: returns 6
console.log(testValue(bigIntGtSchema, 6n));

//Fail: Error: Expected bigint greater than 5n, received 5n
console.log(testValue(bigIntGtSchema, 5n));

// success: returns 5
console.log(testValue(bigIntGteSchema, 5n));

//Fail: Error: Expected bigint greater than or equal to 5n, received 4n
console.log(testValue(bigIntGteSchema, 4n));

// success: returns 4
console.log(testValue(bigIntLtSchema, 4n));

//Fail: Error: Expected bigint less than 5n, received 5n
console.log(testValue(bigIntLtSchema, 5n));

// success: returns 5
console.log(testValue(bigIntLteSchema, 5n));

//Fail: Error: Expected bigint less than or equal to 5n, received 6n
console.log(testValue(bigIntLteSchema, 6n));

// success: returns 5
console.log(testValue(bigIntPositiveSchema, 5n));

//Fail: Error: Expected bigint greater than 0n, received 0n
console.log(testValue(bigIntPositiveSchema, 0n));

// success: returns -5
console.log(testValue(bigIntNegativeSchema, -5n));

//Fail: Error: Expected bigint less than 0n, received 0n
console.log(testValue(bigIntNegativeSchema, 0n));

// success: returns 0
console.log(testValue(bigIntNonpositiveSchema, 0n));

//Fail: Error: Expected bigint less than or equal to 0n, received 5n
console.log(testValue(bigIntNonpositiveSchema, 5n));

// success: returns 5
console.log(testValue(bigIntNonnegativeSchema, 5n));

//Fail: Error: Expected bigint greater than or equal to 0n, received -5n
console.log(testValue(bigIntNonnegativeSchema, -5n));

// success: returns 10n
console.log(testValue(bigIntMultipleOfSchema, 10n));

//Fail: Error: Expected bigint to be a multiple of 5n, received 6n
console.log(testValue(bigIntMultipleOfSchema, 6n));

// success: returns 5
console.log(testValue(finiteSchema, 5));

//Fail: Error: Expected finite number, received Infinity
console.log(testValue(finiteSchema, Infinity));

// success: returns 5
console.log(testValue(safeNumberSchema, 5));

//Fail: Error: Expected safe number, received 1.7976931348623157e+308
console.log(testValue(safeNumberSchema, 1.7976931348623157e+308));

// success: returns 5
console.log(testValue(minSchema, 5));

//Fail: Error: Expected number greater than or equal to 5, received 4
console.log(testValue(minSchema, 4));

// success: returns 10
console.log(testValue(maxSchema, 10));

//Fail: Error: Expected number less than or equal to 10, received 11
console.log(testValue(maxSchema, 11));

// success: returns 6
console.log(testValue(stepSchema, 6));