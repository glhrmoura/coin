const path = require('path');
const webpack = require('webpack');
const VueLoader = require('vue-loader');
const ZipPlugin = require('zip-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    popup: path.resolve(__dirname, 'src/extension/popup/index.js'),
    'service-worker': path.resolve(__dirname, 'src/extension/background/service-worker.js'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist/prod/src'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets/images',
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
    }),
    new VueLoader.VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      chunks : ['popup'],
      template: path.resolve(__dirname, 'src/extension/popup/popup.template.html')
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/extension/assets'),
          to: ''
        },
        {
          from: path.resolve(__dirname, 'src/manifest.json'),
        },
      ],
    }),
    new ZipPlugin({
      filename: 'coin.zip',
      path: path.resolve(__dirname, 'dist/prod'),
    }),
  ],
};
