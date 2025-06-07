import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
}

class SendOrderService {
  async execute({ order_id }: OrderRequest) {
    // Encontrando o pedido e atualizando o "draft" desse pedido para false
    const order = await prismaClient.order.update({
      where: {
        id: order_id
      },
      data: {
        draft: false
      }
    })

    return order
  }
}

export { SendOrderService }