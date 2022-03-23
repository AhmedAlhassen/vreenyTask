const ProductController = require("../../app/controllers/api/product-controller");
const { auth } = require("../../app/middleware/auth");
const OrderItemController = require("../../app/controllers/api/orderItems-controller");
module.exports = {
  group: {
    prefix: "/orderItems",
    middleware: [auth],
  },
  routes: [
    {
      method: "get",
      path: "/",
      handler: OrderItemController.index,
    },
    {
      method: "post",
      path: "/",
      handler: OrderItemController.create,
    },
  ],
};
