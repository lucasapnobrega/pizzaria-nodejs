"use client"

import { useOrderContext } from "@/contexts/OrderModalContext";
import { convertToBRL } from "@/lib/convertToBRL";
import { X } from "lucide-react";

export default function ModalOrder() {
  const { onRequestClose, order, finishOrder } = useOrderContext()

  const handleFinishOrder = async() => {
    if (!order) return

    await finishOrder(order[0].order.id)
  }

  const totalOrderValue = order?.reduce((acc, item) => {
    return (+item.product.price * item.amount) + acc
  }, 0)

  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-[#0000009a] z-50 overflow-auto flex justify-center items-center px-4">
      <div className="bg-dark2 m-auto p-4 rounded-lg w-full max-w-[600px] relative text-white">
        <button type="button" onClick={() => onRequestClose()}>
          <X size={40} color="#ff3f4b" />
        </button>

        {order ? (
          <div className="">
            <h2 className="text-xl font-bold mb-4">Detalhes do Pedido</h2>
  
            <span className="bg-dark1 px-4 py-2 rounded-lg">
              Mesa <strong>{order[0].order.table}</strong>
            </span>
            
            {order.map(order => {
              const totalPrice = +order.product.price * order.amount

              return (
                <div className="my-4 flex flex-col gap-1" key={order.id}>
                  <span>
                    Qtd: {order.amount} - <strong>{order.product.name}</strong> - {convertToBRL(totalPrice)}
                  </span>
                  <span className="text-lightGray ml-6 text-[0.9rem]">
                    {order.product.description}
                  </span>
                </div>
              )
            })}

            <p className="italic text-center bg-dark1 p-2.5 rounded-lg text-[0.95rem]">
              Total do Pedido: <strong>{convertToBRL(totalOrderValue)}</strong>
            </p>
  
            <button 
              type="button" 
              className="bg-green1 p-2 rounded-lg text-black text-[0.92rem] font-medium mt-6 transition-all hover:bg-green-400"
              onClick={handleFinishOrder}
            >
              Concluir Pedido
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-[1.1rem] font-semibold">Carregando o pedido...</p>
          </div>
        )}
      </div>
    </dialog>
  )
}