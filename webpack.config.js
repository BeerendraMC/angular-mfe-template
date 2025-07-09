const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    bundle: [
      "./dist/angular-mfe-demo/browser/polyfills.js",
      "./dist/angular-mfe-demo/browser/main.js",
    ],
  },
  output: {
    path: path.resolve(__dirname, "elements/angular-mfe-demo"), // Output directory
    filename: "angular-mfe-demo-element.js",
  },
  module: {
    rules: [
      // You might need rules for handling other file types (e.g., Babel for older browser support)
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env'],
      //     },
      //   },
      // },
    ],
  },
  // devtool: 'inline-source-map' // Optional: for easier debugging
};
