"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerCategory } from "@/app/actions/category-actions"
import { toast } from "sonner"
import Input from "./Input"

const categorySchema = z.object({
  name: z.string().min(1, { message: "Informe a Categoria" })
})

export type CategorySchemaType = z.infer<typeof categorySchema>

export default function CategoryForm() {
  const { 
    register, 
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema)
  })

  const onSubmit = async(data: CategorySchemaType) => {
    try {
      const response = await registerCategory(data)

      if (response) {
        toast.success("Categoria cadastrada com sucesso")
        reset()
      }
    } catch (error: any) {
      console.log("Erro ao cadastrar categoria: ", error)
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input 
        {...register("name")}
        name="name"
        placeholder="Nome da Categoria, ex: pizzas"
        error={errors.name}
      />

      <button 
        type="submit" 
        className="bg-green1 py-1.5 rounded-lg font-semibold transition-all hover:bg-green-400"
      >
        Cadastrar
      </button>
    </form>
  )
}