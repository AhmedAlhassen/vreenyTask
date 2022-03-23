"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product);
      this.belongsToMany(models.Order, {
        through: "order_order_items",
        foreignKey: "orderItemsId",
        otherKey: "orderId",
        onDelete: "NO ACTION",
      });
    }
  }
  OrderItems.init(
    {
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderItems",
      underscored: true,
      tableName: "order_items",
    }
  );
  return OrderItems;
};
