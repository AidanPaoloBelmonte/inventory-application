const db = require("../db/queries");

async function getBrowseResults(req, res) {
  const filters = {};

  Object.keys(req.query).forEach((q) => {
    if (req.query[q]) {
      let value = req.query[q];
      if (!Array.isArray(value) && !isNaN(parseInt(value))) {
        value = parseInt(req.query[q]);
      } else if (Array.isArray(value)) {
        const newValue = value.reduce((n, v, i) => {
          if (isNaN(parseInt(value))) {
            n.psuh(v);
          } else {
            n.push(parseInt(v));
          }

          return n;
        }, []);
      }

      filters[q] = value;
    }
  });

  const results = await db.getFurniture(filters);
  const category_list = await db.getAllCategories();

  res.render("browse", {
    title: "Browse - WarehouseDb",
    results: results,
    categories: category_list,
    filters: filters,
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
