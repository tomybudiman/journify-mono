module.exports = {
  arrowParens: "avoid",
  singleQuote: false,
  trailingComma: "all",
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: ["^react$", "<THIRD_PARTY_MODULES>", "", "^[./]"],
};
