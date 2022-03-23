const ProductRepository = require("../../repositories/product-repository");
const UserRepository = require("../../repositories/user-repository");
class ProductController {
  async index(req, res) {
    const products = await ProductRepository.getAll();
    return res.send(products);
  }
  async create(req, res) {
    console.log(req.user);
    const user = req.user;
    const product = await user.createProduct(req.body);
    return res.send(product.toJSON());
  }
}

module.exports = new ProductController();
