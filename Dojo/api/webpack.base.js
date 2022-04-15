const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // Tell webpack to run babel on every file it runs through
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: [/node_modules/],
        options: {
          presets: [
            '@babel/preset-react',
            ['@babel/env', { targets: { browsers: ['last 2 versions'] } }]
          ]
        }
      },

      {
        test: /\.(sass|less|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          }, 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              sourceMap: true,
            }
          }
        ]
      },
      
      {
        test: /\.(jpeg|jpg|png|svg|otf|tiff|wav|mp3)$/,
        loader: 'url-loader'
      },
      
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
        options: {
          encoding: 'base64',
          limit: 10000,
        },
      },

    ],
  },

  plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[id].css',
        chunkFilename: 'css/[id].css'
      }),
  ]
};
  