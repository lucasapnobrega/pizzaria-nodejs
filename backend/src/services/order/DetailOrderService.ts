import prismaClient from "../../prisma";

interface DetailRequest {
  order_id: string;
}

class DetailOrderService {
  async execute({ order_id }: DetailRequest) {
    // include = retornando tudo que tem dentro de "product" e "order"
    // orderItem tem relacionamento com product e order (product_id e order_id)
    const orderDetail = await prismaClient.orderItem.findMany({
      where: {
        order_id
      },
      include: {
        product: true,
        order: true
      }
    })

    return orderDetail
  }
 }

export { DetailOrderService }