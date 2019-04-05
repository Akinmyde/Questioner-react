const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
        enforce: 'pre',
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  },
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebPackPlugin({
      title: 'Questioner App',
      template: 'public/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './public',
    hot: true,
  },
};
