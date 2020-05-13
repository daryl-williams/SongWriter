/*
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/server/app.js
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

//const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const env = process.env.NODE_ENV;
//console.log('launchpad:/server/app.js: process.env.NODE_ENV =', process.env.NODE_ENV);

const fs = require("fs");
const path = require("path");

//const compression = require('compression'),

//const iface = '0.0.0.0';
//const port = process.env.PORT || 3000;

module.exports = function(app, express) {

	// Set our static path. Note: this has to come before
	// we declare our routes if we want it to work.
	app.use(express.static(path.join(path.dirname(__dirname), "client")));

	app.locals.document_root = path.dirname(__dirname) + '/client';
	console.log('launchpad:/server/app.js: document_root =', app.locals.document_root);

	app.use(function (req, res, next) {
 	 req.document_root = app.locals.document_root;
		next();
	});

	// adding Helmet to enhance your API's security
	app.use(helmet());

	// using bodyParser to parse JSON bodies into JS objects
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	//enabling CORS for all requests
	app.use(cors());

	// adding morgan to log HTTP requests
	app.use(morgan('combined'));

	// Routes
	app.use("/", require('./routes/index.js'));
//	app.use("/", function(req, res) {
//		console.log('sdsi:/server/app.js: GET / =', req);
//		res.send('Hello world!');
//	});
	app.use("/api", require('./routes/api/1.0/index.js'));

	//const app = require('./server/app.js')(app);

	return module;
}

