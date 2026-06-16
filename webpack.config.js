const path = require('path');

const outputPath = process.env.WEBPACK_OUTPUT_PATH
  ? path.resolve(__dirname, process.env.WEBPACK_OUTPUT_PATH)
  : path.resolve(__dirname, 'dist');

let config = {
  mode: 'production',
  entry: './src/wrapper.js',
  output: {
    path: outputPath,
    library: {
      name: 'codeExamples',
      type: 'window',
    },
    filename: 'show-code-examples.min.js',
    clean: true,
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

if (process.env.NODE_ENV === "development") {
  config = {
    ...config,
    mode: 'development',
    devtool: 'source-map'
  }
}

module.exports = config
