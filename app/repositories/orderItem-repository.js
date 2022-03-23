const BaseRepository = require("./base-repository");
const { OrderItems } = require("../models");
const { Product } = require("../models");

class OrderItemsRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
  async getAll() {
    return await OrderItems.findAll({ include: Product });
  }
}

module.exports = new OrderItemsRepository(OrderItems);
