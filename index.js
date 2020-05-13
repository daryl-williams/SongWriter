/*
 * /app/index.js
 */

const express = require("express");
const app = express();

//const compression = require('compression'),

const iface = '0.0.0.0';
const port = process.env.PORT || 3000;

let webserver = undefined;
if (true) {
	//const http = require('http');
	webserver = require('http').createServer(app);
}
else {
	webserver = require('https').Server({
		key:  fs.readFileSync('/home/ubuntu/.letsencrypt/privkey.pem'),
		cert: fs.readFileSync('/home/ubuntu/.letsencrypt/cert.pem'),
		ca:   fs.readFileSync('/home/ubuntu/.letsencrypt/chain.pem')
		}, app);
}
//console.log('WEBServer =', webserver);

webserver.on('error', function(err) {
	console.log('JSN:/index.js: WEBSERVER ERROR =', err);
});

var io = require('socket.io').listen(webserver);
//app.use(function(req, res, next) {
//	res.io = io; // Turn on socket.io websocket server.
//	next();
//});

io.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function (data) {
		//console.log('JSN:/index.js: client says =', data);
	});

	socket.on('jsn_request', function (data) {
		console.log('JSN:/index.js:jsn_request: client says =', data);
	});
});

webserver.listen(port, iface, () => {
	console.log('JSN:/index.js: listening on interface: ' + iface + ' at port: ' + port + "\n");
});

require('./server/app.js')(app, express);

