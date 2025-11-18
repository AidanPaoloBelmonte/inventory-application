const db = require("../db/queries");

async function getBrowseResults(req, res) {
  const results = await db.getAllFurniture();
  res.render("browse", {
    title: "Browse - WarehouseDb",
    results: results,
  });
}

async function postBrowseResults(req, res) {
  const { name, categories } = req.body;
  const filter = { name, categories };

  const results = await db.getAllFurniture(filter);
  res.render("browse", {
    title: "Browse - WarehouseDb",
    results: results,
  });
}

module.exports = {
  getBrowseResults,
  postBrowseResults,
};
