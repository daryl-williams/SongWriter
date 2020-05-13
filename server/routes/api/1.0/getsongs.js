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


const fs = require('fs');
const path = require('path');
const glob = require('glob');
const router = require('express').Router({mergeParams: true});

router.get('/', function(req, res)
{
  let pattern = req.document_root + '/songs/*.jsn';
	console.log('jsn:/server/routes/api/v1.0/getsongs.js: pattern =', pattern);

   glob(pattern, function(err, files) {
			console.log('jsn:/server/routes/api/v1.0/getsongs.js: files =', files);
      if (err) {
        console.log('jsn:/server/routes/api/v1.0/getsongs.js: ERROR:', err);
        let json = {'status': 'error', 'route': '/getsongs', 'result': 'unable to glob directory ' + songdir};
        console.log('jsn:/server/routes/api/v1.0/getsongs.js: ERROR: returning json =', json);
        res.send(json);
      }
      else {
				let filelist = [];
        for (let i=0; i<files.length; i++){
        	//console.log('jsn:/server/routes/api/v1.0/getsongs.js: >>> files['+i+'] =', files[i]);

          let ndx = files[i].lastIndexOf('/');
          let title = files[i].substring(ndx+1).replace(/'/, '');
 		      //console.log('jsn:/server/routes/api/v1.0/getsongs.js: TITLE =', title);

          filelist.push(files[i].substring(ndx+1));
        }

        let json = {'status': 'ok', 'route': '/api/1.0/getsongs', 'result': filelist};
        console.log('jsn:/server/routes/api/v1.0/getsongs.js: returning json =', json);
        res.send(json);
      }
    });
});

router.get('*', function(req, res, next) {
  console.log('launchpad:/server/routes/api/v1.0/getsongs.js: *** ERROR *** CATCH ALL route!');
  console.log('/server/routes/api/v1.0/getsongs.js: SESSION =', req.session);
  console.log('/server/routes/api/v1.0/getsongs.js: COOKIES =', req.cookies);
  if (typeof req.user === 'undefined') {
  console.log('/server/routes/api/v1.0/getsongs.js: *** ERROR *** unauthenticated request, user =', req.user);
    //res.redirect('/login');
    let json = {'status': 'error', 'result': 'authorization required', 'user': req.user};
    console.log('/server/routes/api/v1.0/getsongs.js: returning json =', json);
    res.io.emit("aws-update", json);
    return;
  }
  else {
    console.log('/server/routes/api/v1.0/getsongs.js: ***** authenticated request, user =', req.user);
  }
});

// Route middleware that will happen on every request.
router.use(function(req, res, next) {
 var when = Date();
 var client_ipaddr = req.header('x-forwarded-for') || req.connection.remoteAddress.replace(/::ffff:/, '');
 console.log('launchpad:/server/routes/api/v1.0/getsongs.js:', client_ipaddr, req.username, req.method, req.url, Date()); // log each request to the console.
 //console.log('launchpad:/server/routes/api/v1.0/user.js: REQUEST PARAMS=', req.params); // log each request to the console.
 next(); // continue doing what we were doing and go to the route.
});

module.exports = router;

