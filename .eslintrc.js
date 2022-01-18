module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2017: true,
    node: true,
  },
  extends: ["react-app", "eslint:recommended", "plugin:react/recommended", "plugin:react-hooks/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2017,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "react-hooks"],
  settings: {
    react: { version: "16.0" },
  },
  rules: {
    "react-hooks/exhaustive-deps": "off",
  },
  overrides: [
    {
      files: ["**/*.test.js", "**/*.test.jsx", "**/*.test.tsx", "**/*.spec.js", "**/*.spec.jsx", "**/*.spec.tsx"],
      env: {
        jest: true,
      },
    },
  ],
};
