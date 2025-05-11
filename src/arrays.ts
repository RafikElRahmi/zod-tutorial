import { z } from "zod";
import { testValue } from "./utils/testSchema";



const arrayBaseSchema = z.array(z.string()).nonempty("Array cannot be empty");
const minArraySchema = arrayBaseSchema.min(2, "Array must have at least 2 elements");
const maxArraySchema = arrayBaseSchema.max(5, "Array must have at most 5 elements");
const lengthArraySchema = arrayBaseSchema.length(3, "Array must have exactly 3 elements");
const fixedArraySchema = z.tuple([z.string(), z.number(), z.string()]);
const baseEnumSchema = z.enum(["red", "green", "blue"]);
const excludedEnumSchema = baseEnumSchema.exclude(["red"]);
const extractedEnumSchema = baseEnumSchema.extract(["blue", "green"]);

//Success: return ["a", "b", "c"]
console.log(testValue(arrayBaseSchema, ["a", "b", "c"]));

//Fail: Error : "Array cannot be empty"
console.log(testValue(arrayBaseSchema, []));

//Fail: Error :  array must contain only strings
console.log(testValue(arrayBaseSchema, ["a", 1, "c"]));

//Success: return ["a", "b"]
console.log(testValue(minArraySchema, ["a", "b"]));

//Fail: Error : "Array must have at least 2 elements"
console.log(testValue(minArraySchema, ["a"]));

//Success: return ["a", "b", "c", "d", "e"]
console.log(testValue(maxArraySchema, ["a", "b", "c", "d", "e"]));

//Fail: Error : "Array must have at most 5 elements"
console.log(testValue(maxArraySchema, ["a", "b", "c", "d", "e", "f"]));

//Success: return ["a", "b", "c"]
console.log(testValue(lengthArraySchema, ["a", "b", "c"]));

//Fail: Error : "Array must have exactly 3 elements"
console.log(testValue(lengthArraySchema, ["a", "b"]));

//Success: return ["a", 1, "b"]
console.log(testValue(fixedArraySchema, ["a", 1, "b"]));

//Fail: Error : "Expected number, received string"
console.log(testValue(fixedArraySchema, ["a", "b", "c"]));

//Success: return "red"
console.log(testValue(baseEnumSchema, "red"));

//Fail: Error : "Expected enum value, received string"
console.log(testValue(baseEnumSchema, "yellow"));

//Success: return "green"
console.log(testValue(excludedEnumSchema, "green"));

//Fail: Error : "Expected enum value, received string"
console.log(testValue(excludedEnumSchema, "red"));

//Success: return "green"
console.log(testValue(extractedEnumSchema, "green"));

//Fail: Error : "Expected enum value, received string"
console.log(testValue(extractedEnumSchema, "red"));