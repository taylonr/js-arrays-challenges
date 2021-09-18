const { assert } = require("chai");
const fs = require("fs");

const { getInventoryObject } = require("../inventory");

describe("Converting to an object", () => {
  let isObject = false;
  const missingKeys = [];
  let valuesAreArray = false;
  let noItemTypes = false;
  let onlyValidProperties = false;

  const result = getInventoryObject();

  it("Should return an object", () => {
    isObject =
      typeof result === "object" && result !== null && !Array.isArray(result);

    assert(isObject, "Make sure you return an object");
  });

  it("Should have a key for each type", () => {
    if (!isObject) return;

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

  it("Should return arrays for each itemType", () => {
    if (missingKeys.length) return;

    const values = Object.values(result);

    valuesAreArray = values.every((v) => Array.isArray(v));

    assert(valuesAreArray, "The value for each item type should be an array");
  });

  it("Should not have any item type properties", () => {
    if (!valuesAreArray) return;

    const values = Object.values(result);

    noItemTypes = values.every((val) => {
      return val.every((v) => !v.hasOwnProperty("itemType"));
    });

    assert(noItemTypes, "Objects should not have an itemType property");
  });

  it("Should include all valid properties", () => {
    if (!noItemTypes) return;

    const values = Object.values(result);

    onlyValidProperties = values.every((val) => {
      return val.every(
        (v) =>
          v.hasOwnProperty("id") &&
          v.hasOwnProperty("brand") &&
          v.hasOwnProperty("color") &&
          v.hasOwnProperty("price") &&
          v.hasOwnProperty("cost")
      );
    });

    assert(
      onlyValidProperties,
      "Objects should have the keys id, brand, color, price, cost"
    );
  });

  it("should have the correct objects for each item type", () => {
    if (!onlyValidProperties) return;

    const expected = require("./results.json");

    const getIds = (_) => _.id;
    const areEqual = (a, b) =>
      a.length == b.length && a.every((v, i) => b.includes(v));

    const actual_boots = result.boot.map(getIds);
    const actual_kayaks = result.kayak.map(getIds);
    const actual_bags = result.sleepingBags.map(getIds);
    const actual_tents = result.tents.map(getIds);
    const actual_shirts = result.shirts.map(getIds);
    const actual_backpacks = result.backpacks.map(getIds);

    const bootIds = expected.boot.map(getIds);
    const kayakIds = expected.kayak.map(getIds);
    const bags = expected.sleepingBags.map(getIds);
    const tents = expected.tents.map(getIds);
    const shirts = expected.shirts.map(getIds);
    const backpacks = expected.backpacks.map(getIds);

    assert(
      areEqual(actual_boots, bootIds),
      `The boot property should have the Ids: ${bootIds}`
    );
    assert(
      areEqual(actual_kayaks, kayakIds),
      `The kayaks property should have the Ids: ${kayakIds}`
    );
    assert(
      areEqual(actual_bags, bags),
      `The sleepingBags property should have the Ids: ${bags}`
    );
    assert(
      areEqual(actual_tents, tents),
      `The tents property should have the Ids: ${tents}`
    );
    assert(
      areEqual(actual_shirts, shirts),
      `The shirts property should have the Ids: ${shirts}`
    );
    assert(
      areEqual(actual_backpacks, backpacks),
      `The backpacks property should have the Ids: ${backpacks}`
    );
  });
});
