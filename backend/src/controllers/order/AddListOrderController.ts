import { Request, Response } from "express";
import { AddOrderItemService } from "../../services/order/AddOrderItemService";

class AddListOrderController {
  async handle(req: Request, res: Response) {
    const { order_id, product_id, amount } = req.body

    const addListOrderService = new AddOrderItemService()

    const orderItem = await addListOrderService.execute({
      order_id, product_id, amount
    })

    return res.json(orderItem)
  }
}

export { AddListOrderController }