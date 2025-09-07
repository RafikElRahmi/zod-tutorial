import { z } from "zod";

/**
 * Validates a registration form with cross-field confirmation.
 * Demonstrates refine, superRefine, transforms, and safeParse.
 */
const RegistrationSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain an uppercase letter",
      })
      .refine((val) => /\d/.test(val), {
        message: "Password must contain a digit",
      }),
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

type Registration = z.infer<typeof RegistrationSchema>;

function validateRegistration(raw: unknown) {
  const result = RegistrationSchema.safeParse(raw);

  if (!result.success) {
    const flat = result.error.flatten();
    console.error("Field errors:", flat.fieldErrors);
    console.error("Form errors:", flat.formErrors);
    return null;
  }

  console.log("Registration valid:", result.data);
  return result.data;
}

// --- Demo ---

// ✅ Valid registration
validateRegistration({
  name: "Alice",
  email: "alice@example.com",
  password: "Secure123",
  confirmPassword: "Secure123",
});

// ❌ Invalid: passwords don't match, weak password
validateRegistration({
  name: "Bob",
  email: "bob@example.com",
  password: "short",
  confirmPassword: "different",
});
