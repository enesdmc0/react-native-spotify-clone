import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters")
})


export const registerEmailSchema = z.object({
    email: z.string().min(1, "Email is required").email("Invalid email")
})

export const registerPasswordSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters")
})

export const registerGenderSchema = z.object({
    gender: z.enum(["male", "female", "non-binary", "not-specified", "other"])
        .default("not-specified"),
})

export const registerBirthdaySchema = z.object({
    birthday: z.string().min(1, "Birthday is required")

})


export const completeRegisterSchema = registerEmailSchema
    .merge(registerPasswordSchema)
    .merge(registerGenderSchema)
    .merge(registerBirthdaySchema);


export type LoginFormData = z.infer<typeof loginSchema>;

export type RegisterEmailFormData = z.infer<typeof registerEmailSchema>;
export type RegisterPasswordFormData = z.infer<typeof registerPasswordSchema>;
export type RegisterGenderFormData = z.infer<typeof registerGenderSchema>;
export type RegisterBirthdayFormData = z.infer<typeof registerBirthdaySchema>;

export type CompleteRegisterFormData = z.infer<typeof completeRegisterSchema>;