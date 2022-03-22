"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User);
      this.belongsToMany(models.OrderItems, {
        through: "product_order_items",
        foreignKey: "productId",
        otherKey: "orderItemsId",
        onDelete: "NO ACTION",
      });
    }
  }
  Product.init(
    {
      Name: DataTypes.STRING,
      Description: DataTypes.STRING,
      ImageUrl: DataTypes.STRING,
      Price: DataTypes.DOUBLE,
      Brand: DataTypes.STRING,
      CountInStock: DataTypes.INTEGER,
      isFeatured: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      underscored: true,
    }
  );
  return Product;
};
