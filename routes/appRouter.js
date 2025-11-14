const { Router } = require("express");

const indexController = require("../controllers/indexController");

const appRouter = Router();

appRouter.get("/", indexController.getIndex);

module.exports = appRouter;
