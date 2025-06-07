import prismaClient from "../../prisma";

interface RemoveItemRequest {
  item_id: string;
}

class RemoveOrderItemService {
  async execute({ item_id }: RemoveItemRequest) {
    const orderItem = await prismaClient.orderItem.delete({
      where: {
        id: item_id
      }
    })

    return orderItem
  }
}

export { RemoveOrderItemService }