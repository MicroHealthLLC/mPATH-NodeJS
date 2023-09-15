// https://webpack.js.org/guides/development/
//https://dev.to/lavikara/setup-vue-webpack-and-babel-boo
const htmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/dashboard.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // ...existing loaders...
            // Add an additional loader to handle the result of these loaders
            scss: ["vue-style-loader", "css-loader", "sass-loader"]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': 'development'
   }),
   new htmlWebpackPlugin({
    template: path.resolve(__dirname, "public", "index.html"),
    favicon: "./public/favicon.ico",
  }),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js','.ts', '.tsx', '.vue', '.css'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      "@": `${path.resolve(__dirname, "src")}`,
    }
  }
}