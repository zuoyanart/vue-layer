var utils = require('./utils');
var webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    index: './index.js',
  },
  output: {
    path: 'dist',
    library: 'vue-layer',
    filename: 'vue-layer.js',
    libraryTarget: 'umd' //只能在浏览器端执行
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue'
    }
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loaders: ['vue']
    }, {
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      },
      exclude: /node_modules/
    }, {
      test: /\.less$/,
      loader: "style!css!less",
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }]
  },
  vue: {
    loaders: utils.cssLoaders(),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin('css/[name].css')
    // new webpack.ProvidePlugin({//打包第三方库
    //       vue: 'vue'
    //   }),
    // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js', Infinity),
  ],
}