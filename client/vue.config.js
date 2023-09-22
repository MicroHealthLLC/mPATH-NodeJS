const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV } = process.env;

const setPath = folderName => path.join(__dirname, folderName);
console.log(setPath('src/dasboard.js'));
const isProd = () => process.env.NODE_ENV === 'production';

// const buildingForLocal = () => NODE_ENV === 'development';
const buildingForLocal = () => true;

const setPublicPath = () => {
  const env = NODE_ENV;
  if (env === 'production') {
    return 'https://your-host.com/production/';
  }
  if (env === 'staging') {
    return 'https://your-host.com/staging/';
  }
  return '/';
};

const extractCSS = new ExtractTextPlugin({
  filename: 'css/styles.[hash].css', // "[name].[contenthash].css",
  disable: buildingForLocal(),
});

const extractHTML = new HtmlWebpackPlugin({
  title: 'History Search',
  filename: 'index.html',
  inject: true,
  template: setPath('../core/templates/_base_teleconsultoria.html'),
  environment: process.env.NODE_ENV,
  isLocalBuild: buildingForLocal(),
  imgPath: !buildingForLocal() ? 'assets' : 'src/assets',
});

const config = {
  /**
   * You can use these too for bigger projects. For now it is 0 conf mode for me!
   */
  // entry: {
  //   build: path.join(setPath('src'), 'main.js'),
  //   vendor: path.join('setPath('src'), 'vendor.js')
  // },
  // output: {
  //   path: buildingForLocal() ? path.resolve(__dirname) : setPath('dist'), // this one sets the path to serve
  //   publicPath: setPublicPath(),
  //   filename: buildingForLocal() ? 'js/[name].js' : 'js/[name].[hash].js',
  // },
  outputDir: setPath('dist'),
  configureWebpack: {
    entry: {
      build: path.join(setPath('src'), 'dasboard.js'),
      // vendor: path.join(setPath('src'), 'vendor.js'),
    },
    // output: {
    //   path: buildingForLocal() ? path.resolve(__dirname) : setPath('dist'), // this one sets the path to serve
    //   publicPath: setPublicPath(),
    //   filename: buildingForLocal() ? 'js/[name].js' : 'js/[name].[hash].js',
    // },
    optimization: {
      runtimeChunk: false,
      splitChunks: {
        chunks: 'all', // Taken from https://gist.github.com/sokra/1522d586b8e5c0f5072d7565c2bee693
      },
    },
    resolveLoader: {
      modules: [setPath('node_modules')],
    },
    mode: buildingForLocal() ? 'development' : 'production',
    devServer: {
      historyApiFallback: true,
      noInfo: false,
    },
    plugins: [
      extractHTML,
      // extractCSS,
      new webpack.DefinePlugin({
        'process.env': {
          isStaging: NODE_ENV === 'development' || NODE_ENV === 'staging',
          NODE_ENV: `"${NODE_ENV}"`,
        },
      }),
      new CleanWebpackPlugin(),
      new VueLoaderPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              js: 'babel-loader',
            },
          },
        },
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [
            {
              loader: 'babel-loader',
              options: { presets: ['es2015'] },
            },
          ],
        },
        {
          test: /\.css$/,
          use: extractCSS.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'autoprefixer-loader'],
          }),
        },
        {
          test: /\.scss$/,
          use: !buildingForLocal()
            ? extractCSS.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'autoprefixer-loader', 'sass-loader'],
            })
            : [
              {
                loader: 'style-loader', // creates style nodes from JS strings
              },
              {
                loader: 'css-loader', // translates CSS into CommonJS
              },
              {
                loader: 'sass-loader', // compiles Sass to CSS
              },
            ],
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'file-loader',
          query: {
            name: '[name].[ext]?[hash]',
            useRelativePath: buildingForLocal(),
          },
        },
      ],
    },
  },
};
module.exports = config;