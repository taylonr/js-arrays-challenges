const lossItems = () => {
  const inventory = require("./inventory.json");
  const transactions = require("./transactions.json");

  const summedDiscountCodes = transactions
    .filter((t) => t.discountCode)
    .reduce((obj, t) => {
      if (!obj[t.discountCode]) {
        obj[t.discountCode] = 0;
      }

      obj[t.discountCode]++;

      return obj;
    }, {});

  let max = 0;
  let discountCode = "";

  Object.keys(summedDiscountCodes).forEach((k) => {
    if (summedDiscountCodes[k] > max) {
      max = summedDiscountCodes[k];
      discountCode = k;
    }
  });

  const lossItems = transactions
    .filter((t) => {
      const item = inventory.find((i) => i.id === t.itemId);
      return t.discountCode === discountCode && t.amount - item.cost < 0;
    })
    .map((t) => t.itemId);

  return { discountCode, lossItems };
};

module.exports = {
  lossItems,
};
