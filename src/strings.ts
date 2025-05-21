import { z } from "zod";
import { testValue } from "./utils/testSchema";


const baseStringSchema = z.string();


const minSchema = baseStringSchema.min(5)

const maxSchema = baseStringSchema.max(10)

const lengthSchema = baseStringSchema.length(5)

const regexSchema = baseStringSchema.regex(/^[a-zA-Z]+$/)

const startWithSchema = baseStringSchema.startsWith("Hello")

const endWithSchema = baseStringSchema.endsWith("World")

const includesSchema = baseStringSchema.includes("Hello")

const trimSchema = baseStringSchema.trim()

const lowercaseSchema = baseStringSchema.toLowerCase()

const uppercaseSchema = baseStringSchema.toUpperCase()

const emailSchema = baseStringSchema.email()

const urlSchema = baseStringSchema.url()

const uuidSchema = baseStringSchema.uuid()

const emojiSchema = baseStringSchema.emoji()

const datetimeSchema = baseStringSchema.datetime()

const dateSchema = baseStringSchema.date()

const timeSchema = baseStringSchema.time()

const base64Schema = baseStringSchema.base64()

const base64urlSchema = baseStringSchema.base64url()

const nanoidSchema = baseStringSchema.nanoid()

const cuidSchema = baseStringSchema.cuid()

const cuid2Schema = baseStringSchema.cuid2()

const ulidSchema = baseStringSchema.ulid()

const ipSchema = baseStringSchema.ip()

const durationSchema = baseStringSchema.duration()

// success: returns "Hello"
console.log(testValue(minSchema, "Hello"));

//Fail: Error: String must contain at least 5 character(s)
console.log(testValue(minSchema, "Hi"));

// success: returns "Hello"
console.log(testValue(maxSchema, "Hello"));

//Fail: Error: String must contain at most 10 character(s)
console.log(testValue(maxSchema, "Hello World"));

// success: returns "Hello"
console.log(testValue(lengthSchema, "Hello"));

//Fail: Error: String must contain exactly 5 character(s)
console.log(testValue(lengthSchema, "Hello World"));

// success: returns "Hello"
console.log(testValue(regexSchema, "Hello"));

//Fail: Error: Invalid input
console.log(testValue(regexSchema, "Hello123"));

// success: returns "Hello World"
console.log(testValue(startWithSchema, "Hello World"));

//Fail: Error: String must start with "Hello"
console.log(testValue(startWithSchema, "World Hello"));

// success: returns "Hello World"
console.log(testValue(endWithSchema, "Hello World"));

//Fail: Error: String must end with "World"
console.log(testValue(endWithSchema, "Hello"));

// success: returns "Hello World"
console.log(testValue(includesSchema, "Hello World"));

//Fail: Error: String must include "Hello"
console.log(testValue(includesSchema, "World"));

// success: returns "Hello"
console.log(testValue(trimSchema, " Hello "));

// success: returns "hello"
console.log(testValue(lowercaseSchema, "Hello"));

// success: returns "HELLO"
console.log(testValue(uppercaseSchema, "Hello"));

// success: return "email@gmail.com"
console.log(testValue(emailSchema, "email@gmail.com"))

//Fail: Error: Invalid email address
console.log(testValue(emailSchema, "email@gmail"))

// success: return "https://example.com"
console.log(testValue(urlSchema, "https://example.com"))

//Fail: Error: Invalid URL
console.log(testValue(urlSchema, "example.com"))

// success: return "550e8400-e29b-41d4-a716-446655440000"
console.log(testValue(uuidSchema, "550e8400-e29b-41d4-a716-446655440000"))

//Fail: Error: Invalid UUID
console.log(testValue(uuidSchema, "550e8400-e29b-41d4-a716-44665544000"))

// success: return "😀"
console.log(testValue(emojiSchema, "😀"))

//Fail: Error: Invalid emoji
console.log(testValue(emojiSchema, "Hello"))

// success: return "2023-10-01T12:00:00Z"
console.log(testValue(datetimeSchema, "2023-10-01T12:00:00Z"))

//Fail: Error: Invalid datetime
console.log(testValue(datetimeSchema, "2023-10-01"))

// success: return "2023-10-01"
console.log(testValue(dateSchema, "2023-10-01"))

//Fail: Error: Invalid date
console.log(testValue(dateSchema, "2023-10-01T12:00:00Z"))

// success: return "12:00:00Z"
console.log(testValue(timeSchema, "12:00:00Z"))

//Fail: Error: Invalid time
console.log(testValue(timeSchema, "2023-10-01"))

// success: return "SGVsbG8gd29ybGQ="
console.log(testValue(base64Schema, "SGVsbG8gd29ybGQ="))

//Fail: Error: Invalid base64
console.log(testValue(base64Schema, "Hello"))

// success: return "SGVsbG8gd29ybGQ="
console.log(testValue(base64urlSchema, "SGVsbG8gd29ybGQ="))

//Fail: Error: Invalid base64url
console.log(testValue(base64urlSchema, "Hello"))

// success: return "9sX2xZ3r"
console.log(testValue(nanoidSchema, "9sX2xZ3r"))

//Fail: Error: Invalid nanoid
console.log(testValue(nanoidSchema, "Hello"))

// success: return "cXy8x2"
console.log(testValue(cuidSchema, "cXy8x2"))

//Fail: Error: Invalid cuid
console.log(testValue(cuidSchema, "Hello"))

// success: return "cXy8x2"
console.log(testValue(cuid2Schema, "cXy8x2"))

//Fail: Error: Invalid cuid2
console.log(testValue(cuid2Schema, "Hello"))

// success: return "01F8MECHZX3TB4J5Z9D5G2Q5W0"
console.log(testValue(ulidSchema, "01F8MECHZX3TB4J5Z9D5G2Q5W0"))

//Fail: Error: Invalid ulid
console.log(testValue(ulidSchema, "Hello"))

// success: return "192.168.1.1"
console.log(testValue(ipSchema, "192.168.1.1"))

//Fail: Error: Invalid IP address
console.log(testValue(ipSchema, "999.999.999.999"))

// success: return "P1Y2M10DT2H30M"
console.log(testValue(durationSchema, "P1Y2M10DT2H30M"))

//Fail: Error: Invalid duration
console.log(testValue(durationSchema, "1 year 2 months"))