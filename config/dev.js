const path = require('path');

module.exports = function (env) {
  return {
    devtool: 'cheap-module-source-map',
    entry: {
      main: './src/index.js'
    },
    output: {
      path: path.join(__dirname, '/../dist/assets'),
      filename: '[name].bundle.js',
      // publicPath: publicPath,
      sourceMapFilename: '[name].map'
    }
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
