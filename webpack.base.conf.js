const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 需要单独把 CSS 文件分离出来的插件,抽离css样式,防止将样式打包在js中引起页面样式加载错乱的现象
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // 入口
  entry: {
    app: './src/index.js'
  },
  // 出口
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    // 出口文件使用name+hash命名这样每次修改代码打包以后名字都会不一样
    filename: '[name].[hash].js'
  },
  // 模块
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        use: ['babel-loader?cacheDirectory=true'],
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        // use:指需要什么样的loader去编译文件,这里由于源文件是.css所以选择css-loader
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: theme
            }
          }
        ]
      },
      {
        test: /\.less$/,
        // 因为这个插件需要干涉模块转换的内容，所以需要使用它对应的 loader
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 如果文件小于limit限制，则可以返回DataURL。
              fallback: 'responsive-loader' // 当目标文件的大小超过limit选项中设置的限制时要使用的备用加载程序。
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
    // resolve: {
    //   alias: {
    //     utils: path.resolve(__dirname, 'src/utils'), // 这里使用 path.resolve 和 __dirname 来获取绝对路径
    //   },
    //   extensions: ['.js', '.json', '.jsx', '.css', '.less'],
    //   modules: [
    //     path.resolve(__dirname, 'node_modules'), // 指定当前目录下的 node_modules 优先查找
    //   ],
    // },
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: './index.html', // 配置文件模板
      inject: 'body' // script标签位于何处
    }),
    // 引入插件，配置文件名，这里同样可以使用 [hash]
    new ExtractTextPlugin('[hash].css'),
    new webpack.ProvidePlugin({
      request: 'src/util/request'
    })
  ]
};
