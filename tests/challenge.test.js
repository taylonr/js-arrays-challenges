const { assert } = require("chai");
const fs = require("fs");

const { calculateRevenue } = require("../inventory");

describe("Calculating revenue", () => {
  let isNumber = false;

  const result = calculateRevenue();

  it("Should return a number", () => {
    isNumber = Number(result) === result;

    assert(isNumber, "Make sure to return a number from the function.");
  });

  it("Should return the correct amount", () => {
    if (!isNumber) return;

    assert(
      result === 1439.39,
      `Only add the ammounts for transactions that occurred in 2021-03. Expected 1439.39 but received ${result}`
    );
  });
});
