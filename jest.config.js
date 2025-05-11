const nextJest = require("next/jest");
const dotEnv = require("dotenv");

dotEnv.config({
  path: ".env.development",
});

const createJestConfig = nextJest({ dir: "." });

/** @type {import('jest').Config} */
const jestConfig = {
  verbose: true,
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
};

module.exports = createJestConfig(jestConfig);
