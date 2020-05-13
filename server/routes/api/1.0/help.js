/*
 * This file is part of SongWriter, A song notation and editing tool.
 *
 * jsn:/client/js/index.js
 *
 * Copyright (C) 2019,2020,  Daryl P. Williams
 * 
 * SongWriter is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 * 
 * SongWriter is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with SongWriter.  If not, see <https://www.gnu.org/licenses/>.
 */

const router = require('express').Router({mergeParams: true});
const fs = require('fs');

router.get('/', function(req, res)
{
	const topic = req.params.topic;
	console.log('JSN:/server/routes/api/1.0/help.js: help topic =', topic);

	let helpfile = './client/views/' + topic + '.html';
	console.log('JSN:/server/routes/api/1.0/help.js: helpfile =', helpfile);

	let help_html = '';
	try {
		help_html = fs.readFileSync(helpfile, 'utf8');
	}
	catch(err) {
		help_html = '<div class="error">' + err + '</div>';
		console.log('JSN:/server/routes/api/1.0/help.js: ERROR: readFileSync(), error =', err);
	}

	//console.log('JSN:/server/routes/api/1.0/about.js: RETURNING about =', about);
	res.send(help_html);
});

router.get('*', function(req, res, next) {
	console.log('JSN:/server/routes/api/1.0/help.js: >>> NOTICE: no such route!');
	var json = {
		'status': 'error',
		'msg': 'No such resource.',
	};
	let err = new Error();
	err.statusCode = 404;
	res.send(json);
});

module.exports = router;

