import prismaClient from "../../prisma";

interface OrderRequest {
  order_id: string;
}

class FinishOrderService {
  async execute({ order_id }: OrderRequest) {
    // Modificando status de false para true, ou seja, concluído
    const order = await prismaClient.order.update({
      where: {
        id: order_id
      },
      data: {
        status: true
      }
    })

    return order
  }
}

export { FinishOrderService }