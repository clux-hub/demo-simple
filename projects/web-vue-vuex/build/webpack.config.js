/* eslint-disable no-console */
const path = require('path');
const chalk = require('chalk');
const jsonFormat = require('json-format');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const {genCommonOptions} = require('@clux/dev-webpack/dist/utils');

const debugMode = !!process.env.DEBUG;
const nodeEnv = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const isProdModel = nodeEnv === 'production';
const envName = process.env.PROJ_ENV || 'local';

const rootPath = path.join(__dirname, '../');
const srcPath = path.join(rootPath, './src');
const distPath = path.join(rootPath, './dist', envName);
const publicPath = path.join(rootPath, './public');
const envPath = path.join(rootPath, './env', envName);
const baseConfigPath = path.join(publicPath, 'config.js');

const baseConfig = require(baseConfigPath);
const projectConfig = baseConfig[nodeEnv];
const projectConfigJson = jsonFormat(projectConfig, {type: 'space'});
const devtool = isProdModel ? 'cheap-module-source-map' : debugMode ? 'eval-cheap-module-source-map' : 'eval';

console.info(`config: \n${chalk.blue(projectConfigJson)}`);
console.info(`mode: ${chalk.magenta(nodeEnv)} \ndebuger: ${chalk.magenta(devtool)} \nenv: ${chalk.magenta(envName)}`);

const {clientPublicPath, apiProxy} = projectConfig;

const commonOptions = genCommonOptions({isProdModel, srcPath, isVue: true});

const clientWebpackConfig = {
  context: rootPath,
  name: 'client',
  mode: nodeEnv,
  target: 'browserslist',
  stats: 'minimal',
  devtool,
  entry: srcPath,
  performance: false,
  watchOptions: {
    ignored: /node_modules/,
  },
  ignoreWarnings: [/export .* was not found in/],
  output: {
    publicPath: clientPublicPath,
    path: path.join(distPath, './client'),
    hashDigestLength: 8,
    filename: isProdModel ? '[name].[contenthash].js' : '[name].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.runtime.esm-bundler.js',
      '@': srcPath,
    },
  },
  optimization: {
    // minimize: false,
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
        },
      },
      {
        oneOf: commonOptions.oneOfFileLoader,
      },
      {
        oneOf: [
          {
            test: /\.(tsx|ts)$/,
            oneOf: commonOptions.oneOfTsLoader,
          },
          {
            test: /\.css$/,
            oneOf: commonOptions.oneOfCssLoader(),
          },
          {
            test: /\.less$/,
            oneOf: commonOptions.oneOfCssLoader({
              loader: 'less-loader',
              options: {
                sourceMap: false,
              },
            }),
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new VueLoaderPlugin(),
    commonOptions.forkTsCheckerWebpackPlugin,
    new EslintWebpackPlugin({cache: true, extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']}),
    new HtmlWebpackPlugin({
      minify: false,
      inject: 'body',
      template: path.join(publicPath, './client/index.html'),
    }),
    new HtmlReplaceWebpackPlugin([
      {
        pattern: '$$ClientPublicPath$$',
        replacement: clientPublicPath,
      },
      {
        pattern: '$$ClientGlobalVar$$',
        replacement: JSON.stringify(projectConfig.globalVar),
      },
    ]),
    isProdModel &&
      new MiniCssExtractPlugin({
        ignoreOrder: true,
        filename: '[name].[contenthash].css',
      }),
    !isProdModel && new webpack.HotModuleReplacementPlugin(),
  ].filter(Boolean),
};

const devServerConfig = {
  static: [
    {publicPath: clientPublicPath, directory: path.join(envPath, './client')},
    {
      publicPath: clientPublicPath,
      directory: path.join(publicPath, './client'),
      staticOptions: {fallthrough: false},
    },
  ],
  historyApiFallback: {index: '/client/index.html'},
  proxy: apiProxy,
};
module.exports = {
  clientWebpackConfig,
  devServerConfig,
  projectConfigJson,
  projectConfig,
  distPath,
  publicPath,
  envPath,
};
