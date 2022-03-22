require("dotenv").config();
module.exports = {
  appKey: process.env.APP_KEY,
  // tokenExpiresIn: 3600, // 1 hour
  // RefreshExpiration: 86400, // 24 hours
  /* for test */
  tokenExpiresIn: 60, // 1 hour
  RefreshExpiration: 120, // 24 hours
};
