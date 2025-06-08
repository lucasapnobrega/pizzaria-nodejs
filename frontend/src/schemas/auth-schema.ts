import { z } from "zod"

export const signupSchema = z.object({
  name: z.string().min(4, { message: "Insira um nome com no mínimo 4 caracteres" }),
  email: z.string().email("Insira um e-mail válido"),
  password: z.string().min(8, { message: "Insira uma senha com no mínimo 8 caracteres" })
})

export type SignUpSchemaType = z.infer<typeof signupSchema>

export const loginSchema = z.object({
  email: z.string().email("Insira um e-mail válido"),
  password: z.string().min(1, { message: "Insira a senha" })
})

export type LoginSchemaType = z.infer<typeof loginSchema>