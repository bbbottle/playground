const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const packagePath = /node_moudles\/@zhoujiahao\/[a-z-]+\/lib/;

const jsPath = [
  path.resolve(__dirname, 'app/js/'),
  packagePath
];

const stylePath = [
  path.resolve(__dirname, 'app/style/'),
  packagePath
];

module.exports = {
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
        include: jsPath,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['syntax-dynamic-import'],
          }
        }
      },
      {
        test: /\.s?css$/,
        include: stylePath,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ],
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
      chunks: ['main-vendor', 'main'],
      chunksSortMode: 'dependency'
    }),
    new MiniCssExtractPlugin({
      filename: `[name].[chunkhash:6].min.css`,
      allChunks: true,
    }),
  ],
};
