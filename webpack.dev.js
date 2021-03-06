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
    host: '0.0.0.0',
    port: 8080,
    // public: 'asd.test:80',
    useLocalIp: true,
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
