const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const stylePath = [
  path.resolve(__dirname, 'node_modules/@zhoujiahao/editor'),
  path.resolve(__dirname, 'app'),
  '/Users/zjhou/Documents/sideProjects/command/packages/editor',
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
        include: stylePath,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/'
            }
          },
          'css-loader',
          'sass-loader',
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
      chunks: ['main-vendor', 'main']
    }),
    new MiniCssExtractPlugin({
      filename: `[name].[chunkhash:6].min.css`,
      allChunks: true,
    }),
  ],
  watchOptions: {
    ignored: [
      /node_modules([\\]+|\/)+(?!(pseudoerminal|@zhoujiahao\/editor))/,
    ]
  }
};
