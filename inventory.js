const fs = require("fs");

const getBoots = () => {
  const inventory = require("./inventory.json");
  return inventory.filter((_) => _.itemType === "boot");
};

module.exports = {
  getBoots,
};
