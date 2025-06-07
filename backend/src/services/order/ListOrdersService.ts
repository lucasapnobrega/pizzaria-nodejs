import prismaClient from "../../prisma"

class ListOrdersService {
  async execute() {
    // Retornando apenas os pedidos que saíram do "rascunho"
    // Ordenando os pedidos de forma decrescente
    const orders = await prismaClient.order.findMany({
      where: {
        draft: false,
        status: false
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return orders
  }
}

export { ListOrdersService }