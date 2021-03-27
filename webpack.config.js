const path = require('path');
const webpack = require('webpack');


module.exports = {
  // mode: 'production',
  mode: 'development',
  entry: './src/wrapper.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'codeExamples',
      type: 'window',
    },
    filename: 'show-code-examples.min.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', "@babel/react"],
          },
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  }
};
