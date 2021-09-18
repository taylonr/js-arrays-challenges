const { assert } = require("chai");
const fs = require("fs");

const { financePerItemPerMonth } = require("../inventory");

const isObject = (obj) =>
  typeof obj === "object" && obj !== null && !Array.isArray(obj);

describe("Challenge 7", () => {
  let isObj = false;
  const itemTypes = [];
  let monthsPresent = false;

  let result = financePerItemPerMonth();

  it("Should return an array", () => {
    isObj = isObject(result);

    assert(isObj, "Make sure to return an object from the function");
  });

  it("Should have each item type", () => {
    if (!isObj) return;

    const updateMissingTypes = (type) => {
      if (!result.hasOwnProperty(type)) {
        itemTypes.push(type);
      }
    };

    updateMissingTypes("boot");
    updateMissingTypes("kayak");
    updateMissingTypes("tents");
    updateMissingTypes("sleepingBags");
    updateMissingTypes("shirts");
    updateMissingTypes("backpacks");

    assert(
      itemTypes.length === 0,
      `The following item types were missing; ${itemTypes.join(",")}`
    );
  });

  it("Should contain each month for each item", () => {
    if (itemTypes.length) return;

    const monthNums = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ];
    const areEqual = (a, b) =>
      a.length == b.length && a.every((v, i) => b.includes(v));

    monthsPresent = Object.values(result).every((r) => {
      return areEqual(monthNums, Object.keys(r));
    });

    assert(
      monthsPresent,
      "Make sure all 12 months are included as keys on every object"
    );
  });

  it("Should have all the right values", () => {
    if (!monthsPresent) return;

    const expectedResults = require("./results.json");

    const errors = [];

    Object.keys(result).forEach((key) => {
      const actual = result[key];

      Object.keys(actual).forEach((k) => {
        if (
          Number(
            Math.abs(
              actual[k].revenue - expectedResults[key][k].revenue
            ).toFixed(2)
          ) > 0.01
        ) {
          errors.push(
            `${key} - month ${k}.revenue, expected ${expectedResults[key][k].revenue} but got ${actual[k].revenue}`
          );
        }

        if (
          Number(
            Math.abs(actual[k].profit - expectedResults[key][k].profit).toFixed(
              2
            )
          ) > 0.01
        ) {
          errors.push(
            `${key} - month ${k}.profit, expected ${expectedResults[key][k].profit} but got ${actual[k].profit}`
          );
        }
      });
    });

    assert(errors.length === 0, `${errors.join("\n")}`);
  });
});
