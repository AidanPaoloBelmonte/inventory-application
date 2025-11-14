function getIndex(req, res) {
  res.render("index", {
    title: "WarehouseDB - All you can get database",
  });
}

module.exports = {
  getIndex,
};
