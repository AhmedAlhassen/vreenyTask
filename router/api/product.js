const ProductController = require("../../app/controllers/api/product-controller");
const { auth } = require("../../app/middleware/auth");
module.exports = {
  group: {
    prefix: "/product",
    middleware: [auth],
  },
  routes: [
    {
      method: "get",
      path: "/",
      handler: ProductController.index,
    },
  ],
};
