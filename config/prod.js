const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const version = require('../package.json').version;

module.exports = function () {
  return {
    entry: {
      main: './src/index.js'
    },
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: `[name].${version}.bundle.js`,
      // publicPath: publicPath,
      sourceMapFilename: `[name].${version}.map`
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true
              }
            }]
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true,
                  sourceMap: true
                }
              },
              'sass-loader'
            ]
          })
        }
      ]
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
      }),
      new ExtractTextPlugin({
        filename: '[name].bundle.css'
      }),
      new HtmlWebpackPlugin({
        title: 'SimpleDebugger',
        filename: path.join(__dirname, '/../index.html')
      })
    ]
  };
};
