import { z } from "zod";
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
