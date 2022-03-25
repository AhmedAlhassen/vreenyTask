const BaseRepository = require("./base-repository");
const { Order } = require("../models");
const OrderItemsRepository = require("./orderItem-repository");

class OrderRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
  async addOrderItems(orderItems, order) {
    console.log(orderItems);
    const orderedItems = await OrderItemsRepository.findMultiByID(orderItems);
    const addedOrderItems = await order.addOrderItems(orderedItems);
    return addedOrderItems;
  }
}

module.exports = new OrderRepository(Order);
