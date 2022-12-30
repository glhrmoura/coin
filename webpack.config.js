const path = require('path');

const webpack = require('webpack');

const VueLoader = require('vue-loader');
const ZipPlugin = require('zip-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const outputDirName = isDev ? 'build.dev' : 'build.prod/src';
const prodPlugins = isDev ? [] : [
  new ZipPlugin({
    filename: 'coins-browser-extension.zip',
    path: path.resolve(__dirname, 'build.prod'),
  }),
];

module.exports = {
  mode: isDev ? 'development' : 'production',

  watch: isDev ? true : false,

  devtool: isDev ? 'source-map' : false,

  entry: {
    popup: path.resolve(__dirname, 'src/extension/popup/index.js'),
    'service-worker': path.resolve(__dirname, 'src/extension/background/service-worker.js'),
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, outputDirName),
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
      template: path.resolve(__dirname, 'src/extension/popup/templates/index.html')
    }),

    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/static'),
          to: 'assets'
        },
        {
          from: path.resolve(__dirname, 'src/manifest.json'),
        },
      ],
    }),

    ...prodPlugins,
  ],
};
