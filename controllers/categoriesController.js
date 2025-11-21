const db = require("../db/queries");

async function getCategories(req, res) {
  const category_list = await db.getAllCategories();

  res.render("categories", {
    title: "Categories - WarehouseDB",
    categories: category_list,
    error: req.session.deleteError,
  });

  if (req.session.deleteError) {
    req.session.deleteError = false;
  }
}

async function getCategoriesNew(req, res) {
  res.render("new-category", {
    title: "New Category- WarehouseDB",
  });
}

async function getCategoriesDelete(req, res) {
  const id = parseInt(req.params.id[0]);
  const active = await db.getFurnitures({ category: id });

  if (active.length > 0) {
    req.session.deleteError = true;
    res.redirect("/categories");
  } else {
    properties = await db.getCategory(id);

    res.render("delete-category", {
      title: "Delete Category - WarehouseDB",
      props: properties[0],
    });
  }
}

async function postCategoriesDelete(req, res) {
  const pathSplit = req.path.split("/");

  await db.deleteCategory(pathSplit[pathSplit.length - 1]);

  res.redirect("/categories");
}

async function postCategoriesNew(req, res) {
  await db.addCategory(req.body);

  res.redirect("/categories");
}

module.exports = {
  getCategories,
  getCategoriesNew,
  getCategoriesDelete,
  postCategoriesNew,
  postCategoriesDelete,
};
