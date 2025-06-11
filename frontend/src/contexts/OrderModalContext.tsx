"use client"

import { finishOrderReq, getDetailOrder } from "@/app/actions/orders-actions";
import { OrderDetail } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react"
import { toast } from "sonner";

type OrderContextType = {
  isOpen: boolean;
  onRequestOpen: (order_id: string) => Promise<void>;
  onRequestClose: () => void;
  order: OrderDetail[] | null;
  finishOrder: (order_id: string) => Promise<void>;
}

type OrderProps = {
  children: ReactNode;
}

export const OrderContext = createContext({} as OrderContextType)

export function OrderProvider({ children }: OrderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [order, setOrder] = useState<OrderDetail[] | null>(null)

  const onRequestOpen = async(order_id: string) => {
    setIsOpen(true)

    const response = await getDetailOrder(order_id)

    if (response) {
      console.log(response)
      setOrder(response)
    }
  }

  const onRequestClose = () => {
    setIsOpen(false)
  }

  const finishOrder = async(order_id: string) => {
    try {
      const response = await finishOrderReq(order_id)

      if (response) {
        toast.success("Pedido finalizado com sucesso!")
        setIsOpen(false)
      }
    } catch (error: any) {
      console.log("Erro ao finalizar o pedido: ", error)
      toast.error(error.message || "Erro ao finalizar o pedido")
    }
  }

  return (
    <OrderContext.Provider value={{ isOpen, onRequestOpen, onRequestClose, order, finishOrder }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrderContext() {
  return useContext(OrderContext)
}