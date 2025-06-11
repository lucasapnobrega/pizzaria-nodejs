import { getAllOrders } from "../actions/orders-actions";
import Orders from "@/components/Orders/Orders";

export default async function Dashboard() {
  const orders = await getAllOrders()

  return (
    <Orders orders={orders} />
  )
}