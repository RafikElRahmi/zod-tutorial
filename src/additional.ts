import { z } from "zod";

const objectSchema = z.object({
    name: z.string(),
    age: z.number(),
});

type ObjectType = z.infer<typeof objectSchema>;

const stringSchema = z.string();
const numberSchema = stringSchema.transform((val) => {
    return parseInt(val, 10);
});

type StringType = z.infer<typeof stringSchema>; // string
type inputType = z.input<typeof numberSchema>; // string
type outputType = z.output<typeof numberSchema>; // number

enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE",
}

const statusSchema = z.nativeEnum(Status);
type StatusType = z.infer<typeof statusSchema>; // Status


const sizes = z.enum(["S", "M", "L"]);
type Size = z.infer<typeof sizes>; // "S" | "M" | "L"


const fnSchema = z.function().args(z.string(), z.number()).returns(z.boolean());
type FnType = z.infer<typeof fnSchema>; // (arg0: string, arg1: number,...args) => boolean

