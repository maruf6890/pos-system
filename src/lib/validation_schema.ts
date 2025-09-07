import { z } from "zod";

export const loginSchema = z.object({
  emailOrPhone: z.union([
    z.string().email("Invalid email address"),
    z
      .string()
      .regex(
        /^(?:\+8801[3-9][0-9]{8}|01[3-9][0-9]{8})$/,
        "Invalid Bangladeshi phone number"
      ),
  ]),
  password: z.string().min(6, "Password must be 6+ chars"),
});

export type LoginFormData = z.infer<typeof loginSchema>;