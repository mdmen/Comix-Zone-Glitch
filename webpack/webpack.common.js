const HtmlWebpackPlugin = require('html-webpack-plugin');
const { sourceFolder, distFolder } = require('./paths');

module.exports = {
  entry: [`${sourceFolder}/index.ts`],
  output: {
    path: distFolder,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${sourceFolder}/index.html`,
    }),
  ],
};
