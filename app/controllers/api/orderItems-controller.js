const ProductRepository = require("../../repositories/product-repository");
const OrderItemsRepository = require("../../repositories/orderItem-repository");
const OrderItem = require("../../models");
class OrderItemController {
  async index(req, res) {
    const orderItem = await OrderItemsRepository.getAll();
    // const product = await orderItem.map(async (orderItem) => {
    //   const prod = await orderItem.getProducts();
    //   return prod;
    // });
    // console.log("prod", product);
    return res.send(orderItem);
  }
  async create(req, res) {
    // const orderItem = await OrderItemsRepository.create(req.body);
    // console.log("order cont", orderItem.toJSON());
    const product = await ProductRepository.findById(req.body.productId);
    // console.log("order cont", product);
    const orderItem = await product.createOrderItem(req.body);
    const { dataValues } = await orderItem.getProduct();
    const { id, UserId, userId, createdAt, updatedAt, ...productOrder } =
      dataValues;
    // const product = await orderItem.getProducts();
    return res.send({
      ...orderItem.toJSON(),
      productOrder,
    });
  }
}

module.exports = new OrderItemController();
