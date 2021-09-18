const { assert } = require("chai");
const fs = require("fs");

const { updateInventory } = require("../inventory");

describe("Checking the updated data", () => {
  let isArray = false;
  let result = undefined;

  beforeEach(() => {
    result = updateInventory();
  });

  it("Should return an array", () => {
    isArray = Array.isArray(result);
    assert(isArray, "Make sure you return an array from the function");
  });

  it("Should be the entire inventory array", () => {
    if (!isArray) return;

    assert(
      result.length === 100,
      "Make sure you include every item in the inventory array"
    );
  });

  it("Should have all properties", () => {
    if (!isArray || result.length !== 100) return;

    assert(
      result.every((r) => {
        return (
          r.hasOwnProperty("id") &&
          r.hasOwnProperty("itemType") &&
          r.hasOwnProperty("brand") &&
          r.hasOwnProperty("color") &&
          r.hasOwnProperty("price") &&
          r.hasOwnProperty("cost")
        );
      }),
      "Make sure that every item returned has the properties id, itemType, brand, color, price and cost"
    );
  });

  it("Should have updated all of the specified parameters", () => {
    if (!isArray || result.length !== 100) return;
    const updates = require("./inventory_update.json");

    const errors = updates.reduce((acc, u) => {
      const match = result.find((r) => r.id === u.id);
      if (!match) {
        acc += `Id ${u.id} was not found\n`;
      }

      const { id, ...rest } = u;

      const key = Object.keys(rest)[0];

      if (match[key] !== u[key]) {
        acc += `${key} was expected to be ${u[key]} but was ${match[key]} for Id: ${match.id}\n`;
      }

      return acc;
    }, "");

    assert(errors.length === 0, errors);
  });
});
