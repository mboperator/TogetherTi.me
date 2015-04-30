var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var express = require('express');
var path = require('path');
var fs = require('fs');

var config = require('./webpack.hot.config');
module.exports = function() {
  var app = express();
  // Redirect all non existing files to index.html
  app.get('/*', function(req, res) {
      var filename = path.join(__dirname, '/', 'public', req.url);
      if (fs.existsSync(filename)) {
          console.log('static: ' + req.url);
          res.sendFile(filename);
      } else {
          console.log('static: index.html (' + req.url + ')');
          res.sendFile(path.join(__dirname, './', 'public') + '/index.html');
      }
  });

  var compiler = webpack(config);

  var server = new WebpackDevServer(compiler, {
      contentBase: 'http://localhost:7070',
      hot: true,
      quiet: false,
      noInfo: false,
      lazy: false,
      watchDelay: 20,
      publicPath: 'http://localhost:7070/assets/js',
      stats: { colors: true },
  });

  server.listen(7071, 'localhost', function() {});
  app.listen(7070);
};
