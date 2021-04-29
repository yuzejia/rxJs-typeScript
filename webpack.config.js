const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const glob = require("glob");
const WebpackParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
let lists = [];
let HtmlPluginLists = [];

function getList(path) {
  var list = glob.sync(path);
  console.log(list);
  list.forEach((item, index) => {
    console.log(item.split("/"));
    var name = item.split("/")[3].split(".")[0];
    lists[index] = {};
    lists[index].name = name;
    lists[index].src = item.split(".html")[0];
  });
}

function entryList(path) {
  getList(path);
  lists.forEach((item, index) => {
    HtmlPluginLists[index] = new HtmlWebpackPlugin({
      filename: item.name + ".html",
      template: item.src + ".html",
      hash: true,
    });
  });
  return HtmlPluginLists;
}

module.exports = {
  entry: {
    "main-ts": glob.sync("./src/**/*.ts"),
    "main-js": glob.sync("./src/**/*.js"),
    "main-html": glob.sync("./src/**/*.html"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js",
    chunkFilename: "[name].[chunkhash].js",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
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

  plugins: [
    new CleanWebpackPlugin(),
    ...entryList("./src/html/*.html"),

  ],
};
