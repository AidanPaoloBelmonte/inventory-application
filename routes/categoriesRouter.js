const { Router } = require("express");

const categoriesController = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getCategories);
categoriesRouter.get("/delete/:id", categoriesController.getCategoriesDelete);
categoriesRouter.post("/delete/:id", categoriesController.postCategoriesDelete);

module.exports = categoriesRouter;
