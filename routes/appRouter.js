const { Router } = require("express");

const indexController = require("../controllers/indexController");
const browseController = require("../controllers/browseController");

const appRouter = Router();

appRouter.get("/", indexController.getIndex);
appRouter.get("/stock", browseController.getBrowseResults);
appRouter.post("/stock", browseController.postBrowseResults);
appRouter.get("/stock/edit/:id", browseController.getBrowseEdit);
appRouter.post("/stock/edit/:id", browseController.postBrowseEdit);

module.exports = appRouter;
