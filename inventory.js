const fs = require("fs");

const getInventoryObject = () => {
  const inventory = require("./inventory.json");
  //   const result = {
  //     boot: inventory
  //       .filter((i) => i.itemType === "boot")
  //       .map((i) => {
  //         delete i.itemType;
  //         return i;
  //       }),
  //     tents: inventory
  //       .filter((i) => i.itemType === "tents")
  //       .map((i) => {
  //         delete i.itemType;
  //         return i;
  //       }),
  //     kayak: inventory
  //       .filter((i) => i.itemType === "kayak")
  //       .map((i) => {
  //         delete i.itemType;
  //         return i;
  //       }),
  //     sleepingBags: inventory
  //       .filter((i) => i.itemType === "sleepingBags")
  //       .map((i) => {
  //         delete i.itemType;
  //         return i;
  //       }),
  //     shirts: inventory
  //       .filter((i) => i.itemType === "shirts")
  //       .map((i) => {
  //         delete i.itemType;
  //         return i;
  //       }),
  //     backpacks: inventory
  //       .filter((i) => i.itemType === "backpacks")
  //       .map((i) => {
  //         delete i.itemType;
  //         return i;
  //       }),
  //   };

  //   return result;

  return inventory.reduce((obj, i) => {
    const itemType = i.itemType;

    if (!obj[itemType]) {
      obj[itemType] = [];
    }

    delete i.itemType;
    obj[itemType].push(i);
    return obj;
  }, {});
};

module.exports = {
  getInventoryObject,
};
