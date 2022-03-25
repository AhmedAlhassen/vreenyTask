const BaseRepository = require("./base-repository");
const { OrderItems } = require("../models");
const { Product } = require("../models");
const { Op } = require("sequelize");

class OrderItemsRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
  async getAll() {
    return await OrderItems.findAll({ include: Product });
  }
  async findMultiByID(value) {
    console.log(value);
    const orderItems = await OrderItems.findAll({
      where: {
        id: { [Op.or]: value },
      },
      include: Product,
    });
    return orderItems;
  }
}

module.exports = new OrderItemsRepository(OrderItems);
