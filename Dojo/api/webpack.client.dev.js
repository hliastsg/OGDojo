const path = require("path")
const webpack = require("webpack")

module.exports = {
  entry: ['./client/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  target: 'web',
  devtool: 'inline-source-map',
  module: {
    rules: [
      
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins 
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            //options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              sourceMap: true,
            }
          }
        ]
      },
      
      // {
      //   test: /\.(sa|sc|c)ss$/,
      //   use: ["style-loader", "css-loader", "sass-loader"]
      // },
      
      {
        test: /\.(jpeg|jpg|png|svg|woff|woff2|eot|ttf)$/,
        loader: 'url-loader',
      },
      {
        test: /\.(ico|webmanifest|xml)$/,
        loader: 'file-loader'
      }
      ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
    })
  ],
  
  // resolve: {
  //   alias: {
  //     'react-dom': '@hot-loader/react-dom'
  //   }
  // }
}