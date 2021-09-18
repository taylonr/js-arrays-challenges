const mocha = require("mocha");
const { EVENT_TEST_FAIL, EVENT_TEST_PASS, EVENT_RUN_END } =
  mocha.Runner.constants;
const chalk = require("chalk");

class SimpleReporter {
  failed = 0;
  constructor(runner) {
    runner
      .on(EVENT_TEST_PASS, (test) => {})
      .on(EVENT_RUN_END, () => {
        if (!this.failed) {
          console.log(chalk.green("All tests passed"));
        }
      })
      .on(EVENT_TEST_FAIL, (test, err) => {
        this.failed++;
        console.log(chalk.red("FAILED: "), `${err.message}\n`);
      });
  }
}

module.exports = SimpleReporter;
