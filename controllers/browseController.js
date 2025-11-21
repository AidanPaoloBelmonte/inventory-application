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

  const results = await db.getFurnitures(filters);
  const category_list = await db.getAllCategories();

  res.render("browse", {
    title: "Browse - WarehouseDb",
    results: results,
    categories: category_list,
    filters: filters,
  });
}

async function getBrowseEdit(req, res) {
  const properties = await db.getFurniture(req.params.id);
  const category_list = await db.getAllCategories();

  res.render("edit-stock", {
    title: "Edit Stock - WarehouseDB",
    props: properties[0],
    categories: category_list,
  });
}

async function getBrowseDelete(req, res) {
  const properties = await db.getFurniture(req.params.id);

  res.render("delete-stock", {
    title: "Delete Stock - WarehouseDB",
    props: properties[0],
  });
}
async function getBrowseNew(req, res) {
  const category_list = await db.getAllCategories();

  res.render("new-stock", {
    title: "New Stock - WarehouseDB",
    categories: category_list,
  });
}

async function postBrowseEdit(req, res) {
  const pathSplit = req.path.split("/");
  const props = { id: pathSplit[pathSplit.length - 1], ...req.body };

  await db.updateFurniture(props);

  res.redirect("/stock");
}

async function postBrowseNew(req, res) {
  await db.addFurniture(req.body);

  res.redirect("/stock");
}

async function postBrowseDelete(req, res) {
  const pathSplit = req.path.split("/");

  await db.deleteFurniture(pathSplit[pathSplit.length - 1]);

  res.redirect("/stock");
}

async function postBrowseResults(req, res) {
  const { name, categories } = req.body;
  const filter = { name, categories };

  const results = await db.getFurnitures(filter);
  const category_list = await db.getAllCategories();

  res.render("browse", {
    title: "Browse - WarehouseDb",
    results: results,
    categories: category_list,
  });
}

module.exports = {
  getBrowseResults,
  getBrowseEdit,
  getBrowseDelete,
  getBrowseNew,
  postBrowseResults,
  postBrowseEdit,
  postBrowseDelete,
  postBrowseNew,
};
