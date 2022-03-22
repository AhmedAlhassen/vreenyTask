const express = require("express");
const webRoutes = require("./web");
const apiRoutes = require("./api");
class Router {
  constructor() {
    this.router = express.Router();
    this.webRoutes = webRoutes;
  }
  create(app) {
    //TODO attach middleware
    this._attachMiddleware();
    //TODO attach routes
    this._attachWebRoutes();
    this._attachApiRoutes();
    //TODO handle 404
    this._handlePageNotFound();
    //TODO handle exceptions
    this._handelExceptions();
    //TODO register router

    app.use(this.router);
  }

  _handelExceptions() {
    this.router.use((err, req, res, next) => {
      err.statusCode = err.status || err.statusCode || 500;
      return res.status(err.statusCode).send(err.message);
    });
  }

  _catchError(route) {
    return (req, res, next) => {
      route(req, res, next).catch(next);
    };
  }

  _attachMiddleware() {
    this.router.use(express.json());
  }

  _attachApiRoutes() {
    this._attacheRoutes(apiRoutes, "/api");
  }

  _attachWebRoutes() {
    console.log("web routes", this.webRoutes);
    this._attacheRoutes(this.webRoutes);
  }

  _handlePageNotFound() {
    this.router.all("*", (req, res) => {
      res.status(404).send("Page Not Found");
    });
  }

  _attacheRoutes(routeGroups, prefix = "") {
    console.log(routeGroups);
    routeGroups.forEach(({ group, routes }) => {
      console.log("groups", group);
      console.log("routes", routes);
      routes.forEach(({ method, path, middleware = [], handler }) => {
        this.router[method](
          prefix + group.prefix + path,
          [...(group.middleware || []), ...middleware],
          this._catchError(handler)
        );
      });
    });
  }
}

module.exports = new Router();
