const BaseRepository = require("./base-repository");
const { Product } = require("../models");

class ProductRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
}

module.exports = new ProductRepository(Product);
