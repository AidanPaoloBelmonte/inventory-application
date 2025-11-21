const { Router } = require("express");

const indexController = require("../controllers/indexController");
const browseController = require("../controllers/browseController");

const appRouter = Router();

appRouter.get("/", indexController.getIndex);
appRouter.get("/stock", browseController.getBrowseResults);
appRouter.post("/stock", browseController.postBrowseResults);
appRouter.get("/stock/new", browseController.getBrowseNew);
appRouter.post("/stock/new", browseController.postBrowseNew);
appRouter.get("/stock/edit/:id", browseController.getBrowseEdit);
appRouter.post("/stock/edit/:id", browseController.postBrowseEdit);
appRouter.get("/stock/delete/:id", browseController.getBrowseDelete);
appRouter.post("/stock/delete/:id", browseController.postBrowseDelete);

module.exports = appRouter;
