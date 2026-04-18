module.exports = {
  arrowParens: "avoid",
  singleQuote: false,
  trailingComma: "all",
  bracketSameLine: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "^\\u0000",
    "^react$",
    "^react-native$",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@(features|shared|store|navigation)(/.*)?$",
    "",
    "^[./]",
  ],
};
