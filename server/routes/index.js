/*
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/server/routes/index.js
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

const path = require("path");
//const express = require("express");
const router = require('express').Router({mergeParams: true});

// Route Handlers

router.get('/', function (req, res) {
  console.log('JSN:/server/routes/index.js: document_root =', req.document_root);
	let filename = 'index.html';
  console.log('JSN:/server/routes/index.js: filename =', filename);
 	res.sendFile(filename, {'root': req.document_root}, function(err, next) {
		if (err) {
  		console.log('JSN:/server/routes/index.js:router.get("/"): >>> sendFile ERROR =', err);
			res.status(404).send('not found');
			next;
		}
		else {
  		console.log('JSN:/server/routes/index.js:router.get("/"): sendFile OK.');
		}
	});
});

router.get('/about', function (req, res) {
	res.send('About time!');
  console.log('JSN:/server/routes/index.js:router.get("/about"): this =', this);
});

// API Routes
//router.use('/api', require('./api/index.js'));
router.use('/api/1.0', require('./api/1.0/index.js'));
router.use('/view', require('./view/index.js'));

router.get('*', function(req, res, next) {
	console.log('JSN:/server/routes/index.js: >>> NOTICE: no such route! requested url =', req.url);
	//res.send('routes/index: No such resource', 404);
	res.status(404).send('routes/index: No such resource');
});

/*
// Route middleware that will happen on every request.
router.use(function(req, res, next) {
  //console.log('launchpad:/server/routes/index.js: REQ.user =', req.user);
  //console.log('launchpad:/server/routes/index.js: REQ.session =', req.session);

  var when = Date();
  var client_ipaddr = req.header('x-forwarded-for') || req.connection.remoteAddress.replace(/::ffff:/, '');

  //console.log('/server/routes/index.js:', client_ipaddr, req.method, req.url + ' ' + Date()); // log each request to the console.
  //console.log('/server/routes/index.js: ********* USER =', req.user); // log each request to the console.

  // Main Page
  router.get("/", (req, res, next) => {
    //console.log('launchpad:/server/routes/index.js:authenticate(): Inside HOME req.user = ',req.user);

    console.log('launchpad:/server/routes/index.js:authenticate(): Inside HOME route, global.static_docroot = ', global.static_docroot);
    let home_page = global.static_docroot + '/client/html/index.html';
    console.log('launchpad:/server/routes/index.js:authenticate(): Inside HOME route, home_page = ', home_page);

    res.sendFile(home_page, function(err) {
      if (err) {
        console.log('launchpad:/server/routes/index.js:sendFile(): *** ERROR *** error =', err);
        next;
      }
      else {
        console.log('launchpad:/server/routes/index.js: sendFile OK.');
      }
    });
  });

  // API Route
  router.use("/api", require('./api/index.js'));
});
*/

module.exports = router;

