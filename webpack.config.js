const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const glob = require("glob");
module.exports = {
  entry: {
    "main-ts":  glob.sync("./src/**/*.ts"),
    "main-js":  glob.sync("./src/**/*.js"),

  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      { test: /\.ts$/, use: "ts-loader" }
    ],
  },
  devServer: {
    contentBase: "./dist",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["node_modules"],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Hello World rxjs-typeScript",
      hash: true,
      filename: "index.html",
      template: "./src/index.html", //new 一个这个插件的实例，并传入相关的参数
    }),

    new CopyPlugin({
      patterns: [
        { from: __dirname + "/src/html", to: __dirname + "/dist/html" },
      ],
    }),
  ],
};
