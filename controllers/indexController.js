function getIndex(req, res) {
  res.render("index", {
    title: "Inventory Application",
  });
}

module.exports = {
  getIndex,
};
