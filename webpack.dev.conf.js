// 开发环境下webpack的配置
const webpack = require('webpack');
// 使用webpack-merge继承webpack.base.conf.js中的基础配置，再单独配置
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path');
const baseWebpackConfig = require('./webpack.base.conf.js');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  plugins: [
    // 热更新相关
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: true
    })
  ],
  // 开发服务器
  devServer: {
    clientLogLevel: 'warning',
    open: true,
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    port: 8080
  },

  optimization: {
    nodeEnv: 'development'
  }
});
