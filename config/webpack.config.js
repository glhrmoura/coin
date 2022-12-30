const path = require('path');

const webpack = require('webpack');

const ZipPlugin = require('zip-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootPath = path.resolve(__dirname, '../');
const isDev = process.env.NODE_ENV === 'development';

const outputDirName = isDev ? 'build.dev' : 'build';
const prodPlugins = isDev ? [] : [
  new ZipPlugin({
    filename: 'coins-browser-extension.zip',
  }),
];

module.exports = {
  mode: isDev ? 'development' : 'production',

  watch: isDev ? true : false,

  devtool: isDev ? 'source-map' : false,

  entry: {
    popup: path.resolve(rootPath, 'src/extension/popup/index.js'),
    'service-worker': path.resolve(rootPath, 'src/extension/background/service-worker.js'),
  },

  output: {
    filename: '[name].js',
    path: path.resolve(rootPath, outputDirName),
  },

  resolve: {
    alias: {
      '@': path.resolve(rootPath, 'src'),
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
          'css-loader'
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

    new VueLoaderPlugin(),

    new HtmlWebpackPlugin({
      filename: 'popup.html',
      chunks : ['popup'],
      template: path.resolve(rootPath, 'src/extension/popup/templates/index.html')
    }),

    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(rootPath, 'src/static'),
          to: 'assets'
        },
        {
          from: path.resolve(rootPath, 'src/manifest.json'),
        },
      ],
    }),

    ...prodPlugins,
  ],
};
