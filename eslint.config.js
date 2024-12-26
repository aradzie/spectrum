import js from "@eslint/js";
import confusingBrowserGlobals from "confusing-browser-globals";
import node from "eslint-plugin-n";
import hooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import ts from "typescript-eslint";

export default ts.config(
  {
    files: ["**/*.{js,ts,tsx}"],
  },
  {
    ignores: ["build", "dist", "tmp", "sandbox"],
  },
  {
    extends: [js.configs.recommended, ...ts.configs.recommended],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": hooks,
      "simple-import-sort": simpleImportSort,
      "node": node,
    },
    rules: {
      ...hooks.configs.recommended.rules,
      "eqeqeq": ["error", "always", { null: "never" }],
      "no-constant-condition": ["error", { checkLoops: false }],
      "no-implicit-coercion": "error",
      "no-restricted-globals": ["error", ...confusingBrowserGlobals],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
      "simple-import-sort/imports": ["error", { groups: [["^\\u0000", "^node:", "^", "^\\."]] }],
      "simple-import-sort/exports": ["error"],
      "node/file-extension-in-import": ["error", "always"],
      "node/no-missing-import": ["error"],
    },
    settings: {
      node: {
        typescriptExtensionMap: [
          [".ts", ".ts"],
          [".tsx", ".tsx"],
        ],
      },
    },
  },
);
