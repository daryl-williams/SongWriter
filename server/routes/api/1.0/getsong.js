/*
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/server/routes/api/1.0/getsongs.js
 *
 * Copyright (C) 2019-2020  Daryl P. Williams
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


const router = require('express').Router({mergeParams: true});

router.get('/', function(req, res)
{
	console.log('JSN:/server/routes/api/1.0/getsong.js: req.params =', req.params);

	const fs = require('fs');
	//const path = require('path');

	let song_file = './client/songs/' + req.params.song_name;
	console.log('JSN:/server/routes/api/1.0/getsong.js: song_file =', song_file);

	try {
		var song = fs.readFileSync(song_file, 'utf8');
	}
	catch(err) {
		err.statusCode = 404;
		res.send(err);
		return;
	}

	console.log('JSN:/server/routes/api/1.0/getsong.js: RETURNING song =', song);
	res.json(song);
	//return song;
});

router.get('*', function(req, res, next) {
	console.log('JSN:/server/routes/api/1.0/getsong.js: >>> NOTICE: no such route!');
	var json = {
		'status': 'error',
		'msg': 'No such resource.',
	};
	let err = new Error();
	err.statusCode = 404;
	res.send(json);
	//res.send('routes/api/1.0/getsong: No such resource', 404);
	//res.status(404).send('routes/api/1.0/getsong: No such resource');
});

/*
// Route middleware that will happen on every request.
router.use(function(req, res, next) {
 var when = Date();
 var client_ipaddr = req.header('x-forwarded-for') || req.connection.remoteAddress.replace(/::ffff:/, '');
 console.log('launchpad:/server/routes/api/v1.0/user.js:', client_ipaddr, req.username, req.method, req.url, Date()); // log each request to the console.
 //console.log('launchpad:/server/routes/api/v1.0/user.js: REQUEST PARAMS=', req.params); // log each request to the console.
 next(); // continue doing what we were doing and go to the route.
});
*/

module.exports = router;

