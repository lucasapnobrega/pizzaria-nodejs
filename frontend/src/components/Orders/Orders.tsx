"use client"

import { Order } from "@/types";
import { RefreshCcw } from "lucide-react";
import { useOrderContext } from "@/contexts/OrderModalContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ModalOrder from "./ModalOrder";

interface Props {
  orders: Order[];
}

export default function Orders({ orders }: Props) {
  const { isOpen, onRequestOpen } = useOrderContext()
  const router = useRouter()

  const handleClick = async(order_id: string) => {
    await onRequestOpen(order_id)
  }

  const refreshOrders = () => {
    router.refresh()
    toast.success("Pedidos atualizados com sucesso!")
  }

  return (
    <>
      <main className="max-w-[720px] my-4 mx-auto px-4 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <h1 className="text-white font-bold text-2xl">Últimos Pedidos</h1>

          <button type="button" onClick={refreshOrders} title="Atualizar os Pedidos">
            <RefreshCcw size={24} color="#3fffa3" />
          </button>
        </div>

        <div className="flex flex-col gap-5 w-full">
          {orders.length > 0 ? orders.map(order => (
            <div 
              className="bg-dark1 rounded-lg text-white flex items-center gap-4 cursor-pointer transition-all hover:brightness-125" 
              key={order.id}
              onClick={() => handleClick(order.id)}
            >
              <div className="w-4 bg-green1 h-[50px] rounded-tl-lg rounded-bl-lg" />
              <span className="text-[1.05rem] font-medium">
                Mesa {order.table}
              </span>
            </div>
          )) : (
            <div className="text-center text-lightGray font-medium text-xl mt-6 italic">
              Nenhum pedido em aberto foi encontrado!
            </div>
          )}
        </div>
      </main>
      
      {isOpen && <ModalOrder />}
    </>
  )
}