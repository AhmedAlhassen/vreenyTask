const { body } = require("express-validator");
const { User } = require("../../models");
const { Role } = require("../../models");
const { Op } = require("sequelize");
module.exports = (() => {
  return [
    body("firstName").notEmpty().withMessage("First name cannot be empty!"),

    body("lastName").notEmpty().withMessage("Last name cannot be empty!"),

    body("email")
      .isEmail()
      .withMessage("Email needs to be a valid address!")
      .custom(async (value) => {
        const user = await User.findOne({ where: { email: value } });
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      }),

    body("password")
      .notEmpty()
      .withMessage("Password cannot be empty!")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      ),
    body("roles").custom(async (value, { req }) => {
      if (value) {
        const rolesDb = await Role.findAll({
          where: {
            name: {
              [Op.or]: value,
            },
          },
          // raw: true,
        });
        if (!rolesDb) {
          return Promise.reject("No Roles In The System");
        }
        req.body.role = rolesDb;
        const roles = rolesDb.map((role) => {
          return role.name;
        });
        console.log("roles 2", roles);
        for (let i = 0; i < value.length; i++) {
          if (!roles.includes(value[i])) {
            return Promise.reject(`Role ${value[i]} Does Not Exist`);
          }
        }
      }
    }),
  ];
})();
