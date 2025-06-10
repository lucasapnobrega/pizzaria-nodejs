import { RefreshCcw } from "lucide-react";

export default function Orders() {
  return (
    <main className="max-w-[720px] my-4 mx-auto px-4 flex flex-col items-center gap-6">
      <div className="flex items-center gap-4">
        <h1 className="text-white font-bold text-2xl">Últimos Pedidos</h1>

        <RefreshCcw size={24} color="#3fffa3" />
      </div>

      <div className="flex flex-col gap-5 w-full">
        <div className="bg-dark1 rounded-lg text-white flex items-center gap-4 cursor-pointer transition-all hover:brightness-125">
          <div className="w-4 bg-green1 h-[50px] rounded-tl-lg rounded-bl-lg" />
          <span className="text-[1.05rem] font-medium">Mesa 15</span>
        </div>

        <div className="bg-dark1 rounded-lg text-white flex items-center gap-4 cursor-pointer transition-all hover:brightness-125">
          <div className="w-4 bg-green1 h-[50px] rounded-tl-lg rounded-bl-lg" />
          <span className="text-[1.05rem] font-medium">Mesa 20</span>
        </div>
      </div>
    </main>
  )
}