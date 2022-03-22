"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.User, {
        through: "user_order",
        foreignKey: "orderId",
        otherKey: "userId",
        onDelete: "NO ACTION",
      });
      this.belongsToMany(models.OrderItems, {
        through: "order_order_items",
        foreignKey: "orderId",
        otherKey: "orderItemsId",
        onDelete: "NO ACTION",
      });
    }
  }
  Order.init(
    {
      shippingAddress1: DataTypes.STRING,
      shippingAddress2: DataTypes.STRING,
      city: DataTypes.STRING,
      phone: DataTypes.STRING,
      lat: DataTypes.STRING,
      long: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
      underscored: true,
      tableName: "orders",
    }
  );
  return Order;
};
