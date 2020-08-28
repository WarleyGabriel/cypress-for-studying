const reporter = require("cucumber-html-reporter");

const options = {
  theme: "bootstrap",
  jsonDir: "cucumber-reporter/cucumber-json",
  output: "cucumber-reporter/result/index.html",
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    "App Name": "Demo Automation",
    "Test Environment": "STAGING",
    Browser: "Chrome  54.0.2840.98",
    Platform: "Windows 10",
    Parallel: "Scenarios",
    Executed: "Remote",
  },
};

reporter.generate(options);
