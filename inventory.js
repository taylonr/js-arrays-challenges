const fs = require("fs");

const calculateRevenue = () => {
  const transactions = require("./transactions.json");

  return transactions
    .filter((t) => {
      const tDate = new Date(t.transactionDate);
      return tDate.getFullYear() === 2021 && tDate.getUTCMonth() === 2;
    })
    .reduce((rev, t) => {
      rev += t.amount;

      return rev;
    }, 0);
};

module.exports = {
  calculateRevenue,
};
