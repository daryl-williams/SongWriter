/*
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/server/routes/api/index.js
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

// API v1.0 Route Handler
router.use('/1.0', require('./1.0/index.js'));

router.get('*', function(req, res, next) {
  console.log('launchpad:/server/routes/api/index.js: *** ERROR *** CATCH ALL route!');
  var json = {
    'status': 'error',
    'msg': 'No such resource.',
  };
  let err = new Error();
  err.statusCode = 404;
  res.send(json);
});

module.exports = router;

