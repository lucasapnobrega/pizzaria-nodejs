"use client"

import { signupSchema, SignUpSchemaType } from "@/schemas/auth-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { signUp } from "@/app/actions/auth-action"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Input from "./Input"

function SignupForm() {
  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(signupSchema)
  })

  const router = useRouter()

  const onSubmit = async(data: SignUpSchemaType) => {
    try {
      const response = await signUp(data)

      if (response) {
        toast.success("Cadastro realizado com sucesso")
        router.push("/")
      }
    } catch (error: any) {
      console.log("Erro ao cadastrar usuário: ", error)
      toast.error(error.message || "Erro ao fazer cadastro.")
    } 
  }

  return (
    <form 
      className="text-white pb-4 flex flex-col gap-6 w-[90%]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input 
        {...register("name")}
        name="name"
        placeholder="Digite seu nome"
        error={errors.name}
      />

      <Input 
        {...register("email")}
        type="email"
        name="email"
        placeholder="Digite seu email"
        error={errors.email}
      />

      <Input 
        {...register("password")}
        type="password"
        name="password"
        placeholder="********"
        error={errors.password}
      />

      <button type="submit" className="p-2 bg-red1 rounded-md transition-all hover:bg-red1Hover">
        Criar
      </button>
    </form>
  )
}

export default SignupForm