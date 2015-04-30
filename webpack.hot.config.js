var webpack = require('webpack');
var path = require('path');
var plugins = [
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.OldWatchingPlugin()
];

module.exports = {
  context: __dirname + '/lib',

  entry: {
    main: [
      'webpack-dev-server/client?http://localhost:7071/',
      'webpack/hot/only-dev-server',
      './js/app.js'
    ],
    vendor: ["react", "underscore", "react-router", "q", "reflux", "moment" ]
  },

  output: {
    filename: '[name].bundle.js',
    path: '/public/assets/js',
    publicPath: 'http://localhost:7071/assets/js'
  },

  plugins: plugins,

  module: {
    loaders: [
      { 
        test: /\.js$/,
        loaders: [ 'jsx-loader?harmony', 'react-hot'] 
      },
      { 
        test: /\.json$/,
        loader: 'json-loader' 
      }
    ]
  },

  resolve: {
    extensions: ["", ".js"]
  },

  debug: true,

  devtool: 'eval'
};
