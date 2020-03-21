const path = require("path");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name]-[hash].js",
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.scss$|.css$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({ template: "./client/src/index.html" })],
  devServer: {
    hot: true,
    port: 8080,
    proxy: {
      "/api": "http://localhost:8000"
    },
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/,
          to: path.posix.join("dist", "index.html")
        }
      ]
    }
  }
});
