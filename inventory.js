const fs = require("fs");

const financePerItem = () => {
  const transactions = require("./transactions.json");
  const inventory = require("./inventory.json");

  const rev = {};

  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];
    const item = inventory.find((i) => i.id === t.itemId);

    if (!rev[item.itemType]) {
      rev[item.itemType] = {
        profit: 0,
        revenue: 0,
      };
    }

    const profit = t.amount - item.cost;

    rev[item.itemType].revenue += t.amount;
    rev[item.itemType].profit += profit;
  }

  return rev;
};

module.exports = {
  financePerItem,
};
