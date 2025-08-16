// ESLint Flat Config for Node/Koa project
// See: https://eslint.org/docs/latest/use/configure/configuration-files-new

import js from "@eslint/js";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/",
      "bun.lock",
      "bun.lockb",
      "dist/",
      "build/",
      "eslint.config.*",
    ],
  },
  // Base recommended rules
  js.configs.recommended,
  // CommonJS files (.js, .cjs)
  {
    files: ["**/*.js", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: { ...globals.node },
    },
  },
  // ESM files (.mjs)
  {
    files: ["**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
    },
  },
]; 