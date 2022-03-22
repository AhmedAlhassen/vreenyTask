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
    }
  }
  Order.init(
    {
      orderItemsId: DataTypes.INTEGER,
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
