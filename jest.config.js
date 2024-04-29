const nextJest = require("next/jest");
const dotEnv = require("dotenv");

dotEnv.config({
  path: ".env.development",
});

const createJestConfig = nextJest({ dir: "." });

/** @type {import('jest').Config} */
const jestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>"],
};

module.exports = createJestConfig(jestConfig);
