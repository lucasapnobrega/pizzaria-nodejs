"use client"

import { LogOutIcon } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'
import logo from '../../public/logo.svg'
import Image from 'next/image'

export default function Header() {
  const router = useRouter()

  const handleLogout = async() => {
    deleteCookie("session-token", { path: "/" })

    router.replace("/")
    toast.success("Logout realizado")
  }

  return (
    <header className='h-[5rem] mb-6'>
      <div className='max-w-[1280px] h-[5rem] mx-auto py-4 px-4 xl:px-2 flex justify-between items-center'>
        <Link href={"/dashboard"}>
          <Image 
            src={logo}
            className="w-36 sm:w-40 md:w-44 lg:w-48 xl:w-[190px] h-auto"
            alt="Logo Pizzaria"
          />
        </Link>
        
        <nav className='flex items-center gap-4 text-white text-sm lg:text-base'>
          <Link href={"/dashboard/category"} className='transition-all hover:text-red1'>
            Categoria
          </Link>

          <Link href={"/dashboard/product"} className='transition-all hover:text-red1'>
            Produto
          </Link>

          <button 
            type="button" 
            className='transition-all xl:ml-6'
            onClick={handleLogout}
          >
            <LogOutIcon size={22} color='#fff' />
          </button>
        </nav>
      </div>
    </header>
  )
}