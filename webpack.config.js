const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: ['babel-polyfill', './src/index.jsx'],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  node: {
    fs: 'empty',
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader',
      },
      {
        test: /\.css$/,
        loader: 'css-loader',
      },
      {
        test: /\.css$/,
        loader: 'postcss-loader',
        options: {
          localIdentName: 'postcss',
          plugins: () => [
            autoprefixer({
              browsers: [
                '> 1%',
                'last 2 versions',
              ],
            }),
          ],
        },
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'url-loader',
          options: {
            sourceMap: true,
            importLoaders: 1,
          },
        },
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.(png|svg|gif|jpg|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 25000,
            name: 'images/[name].[ext]',
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
