const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const glob = require("glob");
module.exports = {
  entry: glob.sync("./src/**/*.ts"),

  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [{ test: /\.ts$/, use: "ts-loader" }],
  },
  devServer: {
    contentBase: "./dist",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: ["node_modules"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
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
        { from: __dirname + "/src/html", to: __dirname + '/dist/html' },
      ],
    })
  ],
};
