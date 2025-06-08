import Image from "next/image";
import logo from '../../public/logo.svg';
import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-6">
      <Image 
        src={logo}
        alt="Logo da Pizzaria"
      />

      <div className="flex flex-col justify-center items-center gap-6 w-[90%] lg:w-[25rem]">
        <LoginForm />

        <Link href="/signup" className="text-white hover:underline">
          Não possui uma conta? Cadastre-se
        </Link>
      </div>
    </div>
  );
}
