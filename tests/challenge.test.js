const { assert } = require("chai");
const fs = require("fs");

const { lossItems } = require("../inventory");

const isObject = (obj) =>
  typeof obj === "object" && obj !== null && !Array.isArray(obj);

describe("Challenge 7", () => {
  let isObj = false;
  const missingKeys = [];

  let result = lossItems();

  it("Should return an array", () => {
    isObj = isObject(result);

    assert(isObj, "Make sure to return an object from the function");
  });

  it("Should have the correct keys", () => {
    if (!isObj) return;

    if (!result.hasOwnProperty("discountCode")) {
      missingKeys.push("discountCode");
    }

    if (!result.hasOwnProperty("lossItems")) {
      missingKeys.push("lossItems");
    }

    assert(
      missingKeys.length === 0,
      `The object is missing the key(s): ${missingKeys.join(",")}`
    );
  });

  it("Should have the discount code", () => {
    if (missingKeys.length) return;

    assert(
      result.discountCode === "20-OFF",
      `Incorrect discount code, expected 20-OFF and got ${result.discountCode}`
    );
  });

  it("Should have all the loss items", () => {
    if (missingKeys.length) return;

    const expectedIds = [41676, 36318, 41170, 42307, 96969];

    const areEqual = (a, b) =>
      a.length == b.length && a.every((v, i) => b.includes(v));

    assert(
      areEqual(expectedIds, result.lossItems),
      `Expected lossItems to be ${expectedIds} but received ${result.lossItems}`
    );
  });
});
