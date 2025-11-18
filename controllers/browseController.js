const db = require("../db/queries");

async function getBrowseResults(req, res) {
  const results = await db.getFurniture();
  const category_list = await db.getAllCategories();

  res.render("browse", {
    title: "Browse - WarehouseDb",
    results: results,
    categories: category_list,
  });
}

async function postBrowseResults(req, res) {
  const { name, categories } = req.body;
  const filter = { name, categories };

  const results = await db.getFurniture(filter);
  const category_list = await db.getAllCategories();

  res.render("browse", {
    title: "Browse - WarehouseDb",
    results: results,
    categories: category_list,
  });
}

module.exports = {
  getBrowseResults,
  postBrowseResults,
};
