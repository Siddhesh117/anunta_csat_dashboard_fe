const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
  {
    serverUrl: "http://localhost:9000",
    options: {
      "sonar.sources": "src",
      /* 'sonar.tests': 'src', */
      /* Entry point of your code */
      "sonar.inclusions": "src/**/*.ts, src/**/*.tsx, src/**/*.js, src/**/*.less"
    }
  },
  () => process.exit()
);
