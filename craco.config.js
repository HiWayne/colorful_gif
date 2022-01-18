const CracoLessPlugin = require("craco-less");
const SimpleProgressWebpackPlugin = require("simple-progress-webpack-plugin");

module.exports = {
  webpack: {
    plugins: [
      // 查看打包的进度
      new SimpleProgressWebpackPlugin(),
    ],
  },
  plugins: [{ plugin: CracoLessPlugin }],
};
