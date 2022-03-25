const OrderRepository = require("../../repositories/order-repository");
class OrderController {
  async index(req, res) {
    const orders = await OrderRepository.getAll();
    return res.send(orders);
  }
  async create(req, res) {
    console.log("user", req.user);
    console.log("order", req.body);

    const user = req.user;
    const orderItem = req.body.orderItems;
    const { orderItems, ...data } = req.body;
    const order = await user.createOrder(data);
    const orderItemsData = await OrderRepository.addOrderItems(
      orderItem,
      order
    );
    // await order.addOrderItems();
    return res.send({ ...order.toJSON(), orderItemsData });
  }
}

module.exports = new OrderController();
