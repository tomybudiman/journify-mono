module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          "@features": "./src/features",
          "@shared": "./src/shared",
          "@store": "./src/store",
          "@navigation": "./src/navigation",
        },
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
