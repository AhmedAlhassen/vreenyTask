"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      OrderItemsId: {
        type: Sequelize.INTEGER,
      },
      ShippingAddress1: {
        type: Sequelize.STRING,
      },
      ShippingAddress2: {
        type: Sequelize.STRING,
      },
      City: {
        type: Sequelize.STRING,
      },
      Phone: {
        type: Sequelize.STRING,
      },
      Lat: {
        type: Sequelize.STRING,
      },
      Long: {
        type: Sequelize.STRING,
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
