const { Router } = require("express");

const indexController = require("../controllers/indexController");
const browseController = require("../controllers/browseController");

const appRouter = Router();

appRouter.get("/", indexController.getIndex);
appRouter.get("/browse", browseController.getBrowseResults);
appRouter.post("/browse", browseController.postBrowseResults);

module.exports = appRouter;
