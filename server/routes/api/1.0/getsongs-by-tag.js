/*
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/server/routes/api/1.0/getsongs-by-tag.js
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


//const fs = require('fs');
//const path = require('path');
//const glob = require('glob');
const router = require('express').Router({mergeParams: true});

router.get('/', function(req, res)
{
  let song_storage = process.env.SONG_STORAGE;
  console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: song_storage =', song_storage);

  if (song_storage === 'file') {
    // TODO...
  }
  else if (song_storage === 'remote') {
    //const remote = require('./getsongs/get-by-remote.js');
    (async () => {
      //const await taglist = remote();
      try {
        const axios = require('axios');
        const uri = 'http://weblane.com:5253/api/tags';
        let response = await axios.get(uri);
        let taglist = response.data.result;
        console.log('JSN:/server/routes/api/1.0/getsongs/get-by-remote.js: Returning taglist =', taglist);
        res.send(taglist);
      }
      catch(error) {
        console.log('JSN:/server/routes/api/1.0/getsongs/get-by-remote.js: axios get ERROR =', error);
      }
    })();

    //res.send(taglist);
  }
  else if (song_storage === 'mongodb') {
    // TODO...
  }
  else {
    console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: ERROR: unknown song storage =', song_storage);
  }
});

router.get('*', function(req, res, next) {
  console.log('JSN:/server/routes/api/1.0/getsongs-by-tag.js: *** ERROR *** CATCH ALL route!');
  var json = {
    'status': 'error',
    'msg': 'No such resource.',
  };
  let err = new Error();
  err.statusCode = 404;
  res.send(json);
});

// Route middleware that will happen on every request.
router.use(function(req, res, next) {
 var when = Date();
 var client_ipaddr = req.header('x-forwarded-for') || req.connection.remoteAddress.replace(/::ffff:/, '');
 console.log('JSN:/server/routes/api/1.0/getsongs-by-tag.js:', client_ipaddr, req.username, req.method, req.url, Date()); // log each request to the console.
 //console.log('JSN:/server/routes/api/1.0/user.js: REQUEST PARAMS=', req.params); // log each request to the console.
 next(); // continue doing what we were doing and go to the route.
});

module.exports = router;

