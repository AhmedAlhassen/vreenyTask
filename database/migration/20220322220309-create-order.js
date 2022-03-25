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

      shipping_address1: {
        type: Sequelize.STRING,
      },
      shipping_address2: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      lat: {
        type: Sequelize.STRING,
      },
      long: {
        type: Sequelize.STRING,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
