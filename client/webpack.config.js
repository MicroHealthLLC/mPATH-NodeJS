// https://webpack.js.org/guides/development/

const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const dotenv = require('dotenv')
var path = require('path');

dotenv.config();

module.exports = {
  context: __dirname,
  mode: 'development',
  entry: './src/dashboard.js',
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': 'development'
   })
  ],
  resolve: {
    extensions: ['.js','.ts', '.tsx', '.vue', '.css'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}