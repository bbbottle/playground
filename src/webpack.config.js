const eslint_formatter_pretty = require('eslint-formatter-pretty');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    'main-vendor': [
      './app/js/utils/runtime'
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
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['syntax-dynamic-import'],
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader', options: {sourceMap: true}},
            {loader: 'sass-loader', options: {sourceMap: true}},
          ],
          publicPath: '/'
        })
      }
    ]
  },
  optimization: {
    minimize: false,
    moduleIds: 'hashed',
    mergeDuplicateChunks: true,
  },
  plugins: [
    // 分析打包后的模块
    // new BundleAnalyzerPlugin({analyzerMode: 'static', reportFilename: 'report.html'}),

    new CleanWebpackPlugin([
      'dist/assets',
    ]),

    new HtmlWebpackPlugin({
      template: 'app/tpl/index.html',
      filename: '../index.html',
      chunks: ['main-vendor', 'main']
    }),
    new ExtractTextPlugin(`[name].[md5:contenthash:base64:6].min.css`),
  ]
};
