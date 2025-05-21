import { z } from "zod";
import { stringbool } from "./../node_modules/.pnpm/zod@3.25.7/node_modules/zod/dist/esm/v4/classic/schemas";
import { testValue } from "./utils/testSchema";

const booleanBaseSchema = z.boolean();

// success: returns true
console.log(testValue(booleanBaseSchema, true));

// success: returns false
console.log(testValue(booleanBaseSchema, 5 > 10));

//Fail: Error: Expected boolean, received string
console.log(testValue(booleanBaseSchema, "false"));

// success: returns true
console.log(testValue(booleanBaseSchema, Boolean("false")));

/* ------------------------   zod v4  ------------------------ */

// Fail: Error: Expected string, received boolean
console.log(stringbool().safeParse(true));

// success: returns false
console.log(stringbool().safeParse("false"));

// Fail: Error: Expected string, received boolean
console.log(stringbool().safeParse(Boolean("false")));

// Fail: Error: Expected string, received number
console.log(stringbool().safeParse(0));

// success: returns true
console.log(stringbool().safeParse("1"));
