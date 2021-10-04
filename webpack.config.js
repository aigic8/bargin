const path = require("path")
const HtmlPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin: CleanPlugin } = require("clean-webpack-plugin")

const fromHere = toPath => path.resolve(__dirname, toPath)
const isProduction = process.env.NODE_ENV === "production"

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: fromHere("src/index.tsx"),
  output: {
    path: fromHere("dist"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  },
  plugins: [
    new CleanPlugin(),
    new HtmlPlugin({ template: fromHere("src/index.html") }),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader" },
    ],
  },
  devtool: isProduction ? false : "source-map",
  stats: "minimal",
  devServer: {
    hot: true
  }
}