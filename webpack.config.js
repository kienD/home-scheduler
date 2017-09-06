var path = require('path');

config = {
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {presets: 'es2015'},
        test: /\.(js|jsx)$/
      }
    ]
  },
  node: {
    fs: 'empty'
  }
};

module.exports = config;
