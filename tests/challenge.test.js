const { assert } = require("chai");
const fs = require("fs");

const { financePerItem } = require("../inventory");

const isObject = (obj) =>
  typeof obj === "object" && obj !== null && !Array.isArray(obj);

describe("financePerItem", () => {
  let isObj = false;
  const missingKeys = [];
  let allObjects = false;
  let validKeys = false;

  const result = financePerItem();

  it("Should return an object", () => {
    isObj = isObject(result);

    assert(isObj, "Make sure to return an object from the function");
  });

  it("Should have a key for each type", () => {
    if (!isObj) return;

    if (!result.hasOwnProperty("boot")) {
      missingKeys.push("boot");
    }

    if (!result.hasOwnProperty("kayak")) {
      missingKeys.push("kayak");
    }

    if (!result.hasOwnProperty("sleepingBags")) {
      missingKeys.push("sleepingBags");
    }

    if (!result.hasOwnProperty("tents")) {
      missingKeys.push("tents");
    }

    if (!result.hasOwnProperty("shirts")) {
      missingKeys.push("shirts");
    }

    if (!result.hasOwnProperty("backpacks")) {
      missingKeys.push("backpacks");
    }

    assert(
      missingKeys.length === 0,
      `The following item types were missing ${missingKeys.join(",")}`
    );
  });

  it("Should have an object for each value", () => {
    if (missingKeys.length) return;

    allObjects = Object.values(result).every((v) => isObject(v));

    assert(allObjects, "Each field (e.g. boot) should be an object");
  });

  it("Every value should have a revenue & profit key", () => {
    if (!allObjects) return;

    validKeys = Object.values(result).every(
      (v) => v.hasOwnProperty("revenue") && v.hasOwnProperty("profit")
    );

    assert(validKeys, "Each item type should have a revenue & profit property");
  });

  it("Should have correct values", () => {
    if (!validKeys) return;

    const expectedResults = require("./results.json");

    const errors = [];

    Object.keys(result).forEach((key) => {
      if (
        Number(
          Math.abs(result[key].revenue - expectedResults[key].revenue).toFixed(
            2
          )
        ) > 0.01
      ) {
        errors.push(
          `${key}.revenue, expected ${expectedResults[key].revenue} but got ${result[key].revenue}`
        );
      }

      if (
        Number(
          Math.abs(result[key].profit - expectedResults[key].profit).toFixed(2)
        ) > 0.01
      ) {
        errors.push(
          `${key}.profit, expected ${expectedResults[key].profit} but got ${result[key].profit}`
        );
      }
    });

    assert(errors.length === 0, `${errors.join("\n")}`);
  });
});
