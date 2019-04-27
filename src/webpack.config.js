const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const plugins = [
  new CleanWebpackPlugin([
    'dist/assets',
  ]),

  new HtmlWebpackPlugin({
    template: 'app/tpl/index.html',
    filename: '../index.html',
    chunks: ['main-vendor', 'main'],
    chunksSortMode: 'dependency'
  }),
  new MiniCssExtractPlugin({
    filename: `[name].[chunkhash:6].min.css`,
    allChunks: true,
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
      'main-vendor': [
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
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: [projectPath, packagePath],
          use: {
            loader: 'babel-loader',
            options: {
              presets: [[
                "@babel/preset-env", {
                  "modules": false
                }]],
              plugins: ['syntax-dynamic-import'],
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
      runtimeChunk: "single",
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          toys: {
            test: packagePath,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    },
    plugins
  }
};
