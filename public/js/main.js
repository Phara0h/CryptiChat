
var webSocket;
init();
function init() 
{
	var socket = io.connect('https://localhost',{secure: true});
	socket.on('connect', function(d){console.log(d)});
	socket.on('message', function(d){console.log(d)});
	socket.on('disconnect', function(d){console.log(d)});
	socket.send("Hello World")
	webScoket = socket;
}
