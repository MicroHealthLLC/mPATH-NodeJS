// https://webpack.js.org/guides/development/

const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/dashboard.js'
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
   })
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