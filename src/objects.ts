import { z } from "zod";
import { testValue } from "./utils/testSchema";

const standardObjectSchema = z.object({
    name: z.string(),
    age: z.number(),
});
const strictObjectSchema = z.strictObject({
    name: z.string(),
    age: z.number(),
});
// const looseObjectSchema = z.looseObject({ name: z.string(), age: z.number() }); =>v4
const extendedObjectSchema = standardObjectSchema.extend({
    email: z.string().email(),
});
const emailShape = extendedObjectSchema.shape.email;

const pickedObjectSchema = standardObjectSchema.pick({
    name: true,
});

const omittedObjectSchema = standardObjectSchema.omit({
    age: true,
});

const partialObjectSchema = standardObjectSchema.partial();

const requiredObjectSchema = partialObjectSchema.required();

const keyofObjectSchema = standardObjectSchema.keyof();

const catchAllObjectSchema = standardObjectSchema.catchall(z.string());

// success: return { name: 'John', age: 30 }
console.log(testValue(standardObjectSchema, { name: "John", age: 30 }));

// success: return { name: 'John', age: 30 }
console.log(testValue(strictObjectSchema, { name: "John", age: 30 }));

// success: return { name: 'John', age: 30 }
// console.log(testValue(looseObjectSchema, { name: "John", age: 30 })); => v4

//Fail: Error: age is required
console.log(testValue(standardObjectSchema, { name: "John" }));

//Fail: Error: age is required
console.log(testValue(strictObjectSchema, { name: "John" }));

//Success: return { name: 'John', age: 30 ,email : 'email@gmail.com'}
console.log(
    testValue(standardObjectSchema, {
        name: "John",
        age: 30,
        email: "email@gmail.com",
    })
);

//Fail: Error: email is not allowed
console.log(
    testValue(strictObjectSchema, {
        name: "John",
        age: 30,
        email: "email@gmail.com",
    })
);

//Success: return { name: 'John', age: 30 ,email : 'email@gmail.com'}
console.log(
    testValue(extendedObjectSchema, {
        name: "John",
        age: 30,
        email: "email@gmail.com",
    })
);

//Fail: Error: email is required
console.log(
    testValue(extendedObjectSchema, {
        name: "John",
        age: 30,
    })
);

//Success: return "email@gmail.com"
console.log(testValue(emailShape, "email@gmail.com"));

//Fail: Error: Invalid email format
console.log(testValue(emailShape, "email"));

//Success: return { name: 'John' }
console.log(testValue(pickedObjectSchema, { name: "John" }));

//Fail: Error: name is required
console.log(testValue(pickedObjectSchema, { age: 30 }));

//Success: return { name: "John", age: 30 }
console.log(testValue(pickedObjectSchema, { name: "John", age: 30 }));

//Success: return { name: 'John' }
console.log(testValue(omittedObjectSchema, { name: "John" }));

//Fail: Error: name is required
console.log(testValue(omittedObjectSchema, { age: 30 }));

//Success: return { name: "John", age: 30 }
console.log(testValue(omittedObjectSchema, { name: "John", age: 30 }));

//Success: return { name: 'John' }
console.log(testValue(partialObjectSchema, { name: "John" }));

//Success: return { age: 30 }
console.log(testValue(partialObjectSchema, { age: 30 }));

//Success: return { name: 'John', age: 30 }
console.log(testValue(partialObjectSchema, { name: "John", age: 30 }));

//Success: return { email: 'John' }
console.log(testValue(partialObjectSchema, { email: "John" }));

//Fail: Error: age is required
console.log(testValue(requiredObjectSchema, { name: "John" }));

//Fail: Error: name is required
console.log(testValue(requiredObjectSchema, { age: 30 }));

//Success: return { name: 'John', age: 30 }
console.log(testValue(requiredObjectSchema, { name: "John", age: 30 }));

//Success: return name
console.log(testValue(keyofObjectSchema, "name"));

//Fail: Error: Invalid value
console.log(testValue(keyofObjectSchema, "email"));

//Success: return { name: 'John', age: 30 }
console.log(
    testValue(catchAllObjectSchema, { name: "John", age: 30, email: "email" })
);

//Fail: Error: Invalid extra value => should be string
console.log(
    testValue(catchAllObjectSchema, { name: "John", age: 30, email: 30 })
);