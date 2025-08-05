import { z } from "zod"

export const RegisterFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
  first_name: z.string().min(3, { message: "First name should contains at least 3 characters" }),
  last_name: z.string().min(3, { message: "First name should contains at least 3 characters" })
})