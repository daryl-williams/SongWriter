/*
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/server/routes/api/v1.0/save/index.js
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

const saveByFile = require('./save-to-file.js');
const saveByRemote = require('./save-to-remote.js');
const saveByMongoDB = require('./save-to-mongodb.js');

// Route Handlers

router.post("/", function(req, res) {
  console.log('JSN:/server/routes/api/1.0/save/index.js:POST: SONG_STORAGE =', process.env.SONG_STORAGE);
  //console.log('JSN:/server/routes/api/1.0/save/index.js: req.body :::=', req.body);
 
  if (process.env.SONG_STORAGE === 'file') {
    saveByFile(req.body);
  }
  else if (process.env.SONG_STORAGE === 'remote') {
    saveByRemote(req.body);
  }
  else if (process.env.SONG_STORAGE === 'mongodb') {
    saveByMongoDB(req.body);
  }
  else {
    console.log('JSN:/server/routes/api/1.0/save/index.js: ERROR: unknown storage type =', process.env.SONG_STORAGE);
  }
});

router.use("/", function(req, res) {
  console.log('JSN:/server/routes/api/1.0/save/index.js: storageType =', process.env.SONG_STORAGE);
});

router.get('*', function(req, res, next) {
  console.log('JSN:/server/routes/api/1.0/save/index.js: ERROR: no such route:', req.url);
  var json = {
    'status': 'error',
    'msg': 'No such resource.',
  };
  let err = new Error();
  err.statusCode = 404;
  res.send(json);
});

module.exports = router;

