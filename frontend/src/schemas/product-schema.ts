import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Informe o nome do produto"),
  category_id: z.string().refine(value => value !== "", {
    message: "Selecione a Categoria"
  }),
  price: z.number().min(0, "O preço deve ser maior que zero"),
  description: z.string().min(1, "Informe a descrição do produto")
})

export type ProductSchemaType = z.infer<typeof productSchema>