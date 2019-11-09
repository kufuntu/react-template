const path = require("path");
const webpack = require('webpack');
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  entry: "./src/server/server.tsx",
  output: {
    path: path.join(__dirname, "/dist/server"),
    filename: "server.js"
  },
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
      new CleanWebpackPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
  ]
};
