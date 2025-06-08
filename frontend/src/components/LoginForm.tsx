"use client"

import { loginSchema, LoginSchemaType } from "@/schemas/auth-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { login } from "@/app/actions/auth-action"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Input from "./Input"

function LoginForm() {
  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema)
  })

  const router = useRouter()

  const onSubmit = async(data: LoginSchemaType) => {
    try {
      const response = await login(data)

      if (!response.token) return

      toast.success("Login realizado com sucesso")
      router.push("/dashboard")
    } catch (error: any) {
      console.log("Erro ao fazer login: ", error)
      toast.error(error.message || "Erro ao fazer login.")
    } 
  }

  return (
    <form 
      className="text-white pb-4 flex flex-col gap-6 w-[90%]"
      onSubmit={handleSubmit(onSubmit)}
    >
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
        Acessar
      </button>
    </form>
  )
}

export default LoginForm