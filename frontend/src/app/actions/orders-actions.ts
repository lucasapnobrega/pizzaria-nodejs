"use server"

import { Order, OrderDetail } from "@/types"
import { apiFetch } from "./fetch-utils"

export async function getAllOrders(): Promise<Order[]> {
  return await apiFetch({
    url: "http://localhost:3333/orders",
    revalidateTagNext: "get-orders"
  })
}

export async function getDetailOrder(order_id: string): Promise<OrderDetail[]> {
  return await apiFetch({
    url: `http://localhost:3333/order/detail?order_id=${order_id}`
  })
}

export async function finishOrderReq(order_id: string) {
  return await apiFetch({
    method: "PUT",
    url: `http://localhost:3333/order/finish`,
    body: { order_id: order_id },
    revalidate: "get-orders"
  })
}