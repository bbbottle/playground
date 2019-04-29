const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const manifestDirPath = path.resolve(__dirname, 'node_modules/@zhoujiahao/vendor/dist/');
const manifestPath = path.resolve(manifestDirPath, './manifest.json');

const plugins = [
  new CleanWebpackPlugin([
    'dist/assets',
  ]),

  new HtmlWebpackPlugin({
    template: 'app/tpl/index.html',
    filename: '../index.html',
    chunks: ['polyfill', 'main'],
    chunksSortMode: 'dependency'
  }),
  new MiniCssExtractPlugin({
    filename: `[name].[chunkhash:6].min.css`,
    allChunks: true,
  }),
  new AddAssetHtmlPlugin([{
    filepath: path.resolve(__dirname, 'node_modules/@zhoujiahao/vendor/dist/vendor.js'),
  }]),
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require(manifestPath),
  }),
];

module.exports = (env) => {
  const isPRD = env === 'production' || env === 'local-build';
  const projectPath = path.resolve(__dirname, 'app/');
  const packagePath = (isPRD && env !== 'local-build')
    ? /node_modules\/@zhoujiahao\/[a-z-]+\/lib/
    : /packages\/[a-z-]+\/lib/;

  if (isPRD) {
    plugins.push(
      new BundleAnalyzerPlugin({analyzerMode: 'static', reportFilename: 'report.html'})
    );
  }

  return {
    entry: {
      'polyfill': [
        '@zhoujiahao/utils/lib/runtime'
      ],
      'main': './app/js/main/index.js',
    },
    output: {
      filename: '[name].[chunkhash:6].js',
      chunkFilename: '[name].[chunkhash:6].js',
      publicPath: "/assets/",
      path: path.resolve(__dirname, 'dist/assets')
    },
    resolve: {
      modules: ['node_modules'],
      symlinks: true
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: [projectPath, packagePath],
          use: {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["syntax-dynamic-import", "@babel/plugin-proposal-class-properties"],
            }
          }
        },
        {
          test: /\.(scss|css)$/,
          include: [projectPath, packagePath],
          use: [
            "style-loader",
            "css-loader",
            "sass-loader"
          ],
        }
      ]
    },
    optimization: {
      minimize: isPRD,
      usedExports: true,
      providedExports: true,
      sideEffects: true,
      moduleIds: 'hashed',
      mergeDuplicateChunks: true,
    },
    plugins
  }
};
