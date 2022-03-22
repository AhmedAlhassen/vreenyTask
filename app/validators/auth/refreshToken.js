const { body } = require("express-validator");
const { RefreshToken } = require("../../models");
module.exports = (() => {
  return [
    body("refreshToken")
      .notEmpty()
      .withMessage("Refresh Token cannot be empty!")
      .custom(async (value) => {
        const token = await RefreshToken.findOne({
          where: { token: value },
          raw: true,
        });
        console.log(token);
        if (!token) {
          return Promise.reject("No such refresh token In The System");
        }
        if (token.expiryDate.getTime() < new Date().getTime()) {
          RefreshToken.destroy({ where: { id: token.id } });
          return Promise.reject(
            "Refresh Token has Expired please Sign Up agin"
          );
        }
      }),
  ];
})();
