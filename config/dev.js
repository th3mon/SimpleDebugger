const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {
  return {
    devtool: 'cheap-module-source-map',
    entry: {
      main: './src/index.js'
    },
    output: {
      path: path.resolve(__dirname, './dist/assets'),
      filename: '[name].bundle.js',
      // publicPath: publicPath,
      sourceMapFilename: '[name].map'
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
            use: 'css-loader'
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [ 'css-loader', 'sass-loader' ]
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '[name].bundle.css'
      }),
      new HtmlWebpackPlugin({
        // TODO: add version number
        title: 'SimpleDebugger',
        filename: path.join(__dirname, '/../index.html'),
        template: 'template-demo.html'
      })
    ]
    // devServer: {
    //   port: 7777,
    //   host: 'localhost',
    //   historyApiFallback: true,
    //   noInfo: false,
    //   stats: 'minimal',
    //   publicPath: publicPath
    // }
  };
};
