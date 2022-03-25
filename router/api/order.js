const OrderController = require("../../app/controllers/api/order-controller");
const { auth } = require("../../app/middleware/auth");
module.exports = {
  group: {
    prefix: "/order",
    middleware: [auth],
  },
  routes: [
    {
      method: "get",
      path: "/",
      handler: OrderController.index,
    },
    {
      method: "post",
      path: "/",
      handler: OrderController.create,
    },
  ],
};
