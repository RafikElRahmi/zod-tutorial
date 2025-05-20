import { z } from "zod";

export const testValue = (schema: z.ZodSchema, value: any) => {
    try {
        const result = schema.parse(value);
        console.log(`Value: ${value}, Result: ${result}`);
        return true;
    } catch (e) {
        console.error(`Value: ${value}, Error: ${e}`);
        return false;
    }
};
