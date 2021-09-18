const { assert } = require("chai");
const fs = require("fs");

const { getBoots } = require("../inventory");

describe("Getting a sublist", () => {
  let isArray = false;
  let bootLength = 0;
  let allAreBoots = false;

  it("Should return an array", () => {
    const result = getBoots();

    isArray = Array.isArray(result);

    assert(isArray, "Make sure to return an array");
  });

  it("Should only be 18 items", () => {
    if (!isArray) return;

    const result = getBoots();

    bootLength = result.length;

    assert(
      bootLength === 18,
      `Make sure to return all boots, received ${bootLength} but expected 18`
    );
  });

  it("Should have every item be a boot", () => {
    if (bootLength !== 18) return;

    const result = getBoots();

    allAreBoots = result.every((r) => r.itemType === "boot");

    assert(allAreBoots, "Make sure to only include boots");
  });

  it("Should include the full object", () => {
    if (!allAreBoots) return;

    const result = getBoots();

    const allProps = result.every(
      (r) =>
        r.hasOwnProperty("id") &&
        r.hasOwnProperty("itemType") &&
        r.hasOwnProperty("brand") &&
        r.hasOwnProperty("color") &&
        r.hasOwnProperty("price") &&
        r.hasOwnProperty("cost")
    );

    assert(
      allProps,
      "Each object should have the fields: id, itemType, brand, color, price, cost"
    );
  });
});
