const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV !== 'production'

const buildVersion = `${Date.now()}`

module.exports = {
  stats: 'minimal',
  mode: isDev ? 'development' : 'production',
  entry: {
    app: [
      './src/index.tsx',
    ],
    // sw: './sw/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    globalObject: 'this',
    publicPath: isDev ? '/' : '/dist/',
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          projectReferences: true,
        },
      },
      {
        test: /.svg$/,
        loader: 'svg-inline-loader',
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      // '~': path.resolve(__dirname, '..'),
    },
  },
  devtool: isDev ? 'inline-source-map' : false,
  plugins: [
    new HtmlWebpackPlugin({
      excludeChunks: ['sw'],
      template: 'assets/index.html',
    }),
    isDev ? new webpack.HotModuleReplacementPlugin() : null,
    new webpack.DefinePlugin({
      BUILD_VERSION: isDev ? 1 : buildVersion,
    }),
  ].filter(Boolean),
  devServer: {
    stats: 'minimal',
    hotOnly: true,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
}
