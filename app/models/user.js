"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.RefreshToken, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      this.hasMany(models.Product, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      this.belongsToMany(models.Role, {
        through: "user_roles",
        foreignKey: "userId",
        otherKey: "roleId",
        onDelete: "NO ACTION",
      });
      this.belongsToMany(models.Order, {
        through: "user_order",
        foreignKey: "userId",
        otherKey: "orderId",
        onDelete: "NO ACTION",
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
      tableName: "users",
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      },
    }
  );
  return User;
};
const hashPassword = async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  return user;
};
