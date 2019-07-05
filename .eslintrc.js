module.exports = {
  root: true,
  env: {
    es6: true,
    node: true
  },
  "parserOptions": { "ecmaVersion": 8 },
  extends: ["eslint:recommended", "plugin:node/recommended", "plugin:prettier/recommended"],
  "rules": {
    "prettier/prettier": "error",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
}
