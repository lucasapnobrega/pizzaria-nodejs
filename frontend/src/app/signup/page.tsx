import Image from "next/image";
import logo from '../../../public/logo.svg';
import Link from "next/link";
import SignupForm from "@/components/SignupForm";

export default function Signup() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6">
      <Image 
        src={logo}
        alt="Logo da Pizzaria"
      />

      <div className="flex flex-col justify-center items-center gap-6 w-[90%] lg:w-[25rem]">
        <h1 className="text-white text-2xl font-semibold">Crie seu Cadastro</h1>

        <SignupForm />

        <Link href="/" className="text-white hover:underline">
          Já possui uma conta? Faça login
        </Link>
      </div>
    </div>
  )
}