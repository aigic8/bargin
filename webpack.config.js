const path = require("path")
const HtmlPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin: CleanPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const fromHere = toPath => path.resolve(__dirname, toPath)
const isProduction = process.env.NODE_ENV === "production"
const CssStyleLoader = isProduction ? MiniCssExtractPlugin.loader : "style-loader"

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
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, use: "ts-loader" },
      {
        test: /(\.s[ac]ss|css)$/,
        use: [CssStyleLoader, "css-loader", "postcss-loader", "sass-loader"]
      }
    ],
  },
  devtool: isProduction ? false : "source-map",
  stats: "minimal",
  devServer: {
    hot: true
  }
}