const { Router } = require("express");

const browseController = require("../controllers/browseController");

const stockRouter = Router();

stockRouter.get("/", browseController.getBrowseResults);
stockRouter.post("/", browseController.postBrowseResults);
stockRouter.get("/new", browseController.getBrowseNew);
stockRouter.post("/new", browseController.postBrowseNew);
stockRouter.get("/edit/:id", browseController.getBrowseEdit);
stockRouter.post("/edit/:id", browseController.postBrowseEdit);
stockRouter.get("/delete/:id", browseController.getBrowseDelete);
stockRouter.post("/delete/:id", browseController.postBrowseDelete);

module.exports = stockRouter;
