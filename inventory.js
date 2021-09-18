const inventory = require("./inventory.json");

const updateInventory = () => {
  const updates = require("./inventory_update.json");
  for (let i = 0; i < updates.length; i++) {
    const update = updates[i];

    for (let j = 0; j < inventory.length; j++) {
      const item = inventory[j];
      if (update.id === item.id) {
        delete update.id;
        const key = Object.keys(update)[0];

        item[key] = update[key];
        break;
      }
    }
  }

  return inventory;
};

module.exports = {
  updateInventory,
};
