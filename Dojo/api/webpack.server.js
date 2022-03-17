const path = require('path');
const merge = require('webpack-merge').merge;
const webpackNodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.js');

const config = {
  target: 'node',
  // Root file
  entry: './server/index.js',
  externals: [webpackNodeExternals()],
  // Output
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist')
  },
}

module.exports = merge(baseConfig, config);