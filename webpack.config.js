const path = require('path');

module.exports = {
  entry: './src/index.js',
  target: 'node-webkit',
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }],
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '/lib'),
    library: '',
    libraryTarget: 'commonjs2',
    libraryExport: 'default',
  },
};
