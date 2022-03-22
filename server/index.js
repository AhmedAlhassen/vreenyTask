const express = require("express");
const Router = require("../router");
class Server {
  constructor(PORT) {
    this.PORT = PORT;
    this.app = express();
  }

  start() {
    this._setupRoutes();
    this._listen();
  }

  _setupRoutes() {
    Router.create(this.app);
  }

  _listen() {
    this.app.listen(this.PORT, () => {
      console.log(`App is Running on Port ${this.PORT}`);
    });
  }
}

module.exports = Server;
