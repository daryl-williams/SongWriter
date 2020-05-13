/*
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/server/routes/api/1.0/getmeta.js
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
	//console.log('JSN:/server/routes/api/1.0/getmeta.js: req.params =', req.params);

	const fs = require('fs');
	//const path = require('path');

	let song_metafile = './client/views/song-metadata-form.html';
	//console.log('JSN:/server/routes/api/1.0/getmeta.js: song_metafile =', song_metafile);

	var song_meta_html = fs.readFileSync(song_metafile, 'utf8');

	//console.log('JSN:/server/routes/api/1.0/getmeta.js: RETURNING song_meta_html =', song_meta_html);
	res.send(song_meta_html);
});

router.get('*', function(req, res, next) {
	console.log('JSN:/server/routes/api/1.0/getmeta.js: >>> NOTICE: no such route!');
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

module.exports = router;

