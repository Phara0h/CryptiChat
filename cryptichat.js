var app = require('express')()
  , express = require('express')
  , https = require('https')
  , io = require('socket.io')
  , fs = require('fs')

var options = {
  key: fs.readFileSync('./cr.key'),
  cert: fs.readFileSync('./cr.cert')
};

/**
 * App.
 */
//var privateKey = fs.readFileSync('../key').toString();
//var certificate = fs.readFileSync('../crt').toString();
//var ca = fs.readFileSync('../intermediate.crt').toString();

//var app = express.createServer({key:privateKey,cert:certificate,ca:ca })

var server = https.createServer(options,app);

/**
 * App configuration.
 */

app.configure(function () {
	app.use(express.static(__dirname + '/public'));
});
/**
 * App routes.
 */

app.get('/', function (req, res) {
 res.sendfile(__dirname + '/index.html');
});

server.listen(443);
io.listen(server);