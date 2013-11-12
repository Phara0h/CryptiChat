var https = require('https');
var fs = require('fs');
/**
 * Bootstrap app.
 */
var sys = require('sys')
require.paths.unshift(__dirname + '/../../lib/');

/**
* Module dependencies.
*/

var express = require('express')
  , stylus = require('stylus')
  , nib = require('nib')
  , sio = require('socket.io');

/**
 * App.
 */
var privateKey = fs.readFileSync('../key').toString();
var certificate = fs.readFileSync('../crt').toString();
var ca = fs.readFileSync('../intermediate.crt').toString();

var app = express.createServer({key:privateKey,cert:certificate,ca:ca });


/**
 * App configuration.
 */

...

/**
 * App routes.
 */

app.get('/', function (req, res) {
  res.render('index', { layout: false });
});

/**
 * App listen.
 */

app.listen(443, function () {
  var addr = app.address();
  console.log('   app listening on http://' + addr.address + ':' + addr.port);
});

/**
 * Socket.IO server (single process only)
 */

var io = sio.listen(app,{key:privateKey,cert:certificate,ca:ca});