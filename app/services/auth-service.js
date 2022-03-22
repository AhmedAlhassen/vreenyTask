const bcrypt = require("bcrypt");
const Tokenizer = require("../modules/tokenizer");
const { RefreshToken } = require("../models");
const appKey = require("../../config/app");
class AuthService {
  async isPasswordAMatch(attempted, original) {
    return await bcrypt.compare(attempted, original);
  }

  async generateTokens(payload) {
    // return jwt.sign(payload, appKey, { expiresIn: tokenExpiresIn })

    const refreshToken = Tokenizer.generateRefreshToken();
    console.log("payload", payload);
    let expiredAt = new Date();
    expiredAt.setSeconds(expiredAt.getSeconds() + appKey.RefreshExpiration);
    await RefreshToken.create({
      token: refreshToken,
      expiryDate: expiredAt.getTime(),
      userId: payload.id,
    });

    return {
      accessToken: Tokenizer.generateAccessToken(payload),
      refreshToken,
    };
  }
  async generateNewTokens(token) {
    const refreshToken = await RefreshToken.findOne({ where: { token } });
    const user = await refreshToken.getUser();
    console.log(user.toJSON().id);
    return {
      accessToken: Tokenizer.generateAccessToken(user.toJSON()),
      refreshToken: token,
    };
  }
}

module.exports = new AuthService();
