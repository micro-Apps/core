const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = () => {
  const options = {
    entry: './src/bootstrap',
    devtool: 'inline-source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'main.bundle.js',
      chunkFilename: '[name].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" }
          ]
        },
        {
          test: /\.less$/,
          use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader?modules" // translates CSS into CommonJS
          }, {
              loader: "less-loader", // compiles Less to CSS
              options: {
                javascriptEnabled: true
              }
          }]
        },
        {
          test:/\.(png|jpg|jpeg|gif)/ ,
          use:[{
              loader:'url-loader',
              options:{
                  limit:500000
              }
          }]
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      plugins: [new TsconfigPathsPlugin()]
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 8888,
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          pathRewrite: {'^/api' : ''}
        }
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../template.html'),
        hash: true
      }),
    ]
  };
  return options;
};