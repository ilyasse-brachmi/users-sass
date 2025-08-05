import { z } from "zod"

const MAX_AVATAR_BYTES = 2 * 1024 * 1024

export const RegisterFormSchema = z.object({
  firstName: z.string().min(3, { message: "First name should contain at least 3 characters" }),
  lastName: z.string().min(3, { message: "Last name should contain at least 3 characters" }),
  email: z.string().email({ message: "Please enter a valid email" }).trim(),
  avatar: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_AVATAR_BYTES, {
      message: `Avatar must be 2MB or smaller`,
    })
    .refine((file) => {
      if (!file) return true
      return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)
    }, {
      message: "Avatar must be a JPG, PNG or WEBP image",
    }),
})

export type RegisterFormValues = z.infer<typeof RegisterFormSchema>
