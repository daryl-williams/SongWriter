/*
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/server/routes/api/1.0/save-song.js
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

const nodemailer = require('nodemailer');

router.post('/', function(req, res)
{
  console.log('JSN:/server/routes/api/1.0/save-song.js: req.body =', req.body.body);

  // Default return value:
  let request_status = 'ok';

  let song_title = req.body.header.title;
  console.log('JSN:/server/routes/api/1.0/save-song.js: song_title =', song_title);

  // Write the song structure to storage.
  const fs = require('fs');
  //const path = require('path');
  let file_store_root = './client/songs';

  let song_file = file_store_root + '/' + song_title + '.jsn';
  console.log('JSN:/server/routes/api/1.0/save-song.js: song_file =', song_file);

  var transporter = nodemailer.createTransport({
    host: 'weblane.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'daryl@weblane.com',
      pass: '1Npw4m2R@daryl@weblane.c0m!.',
      pass: '1n3Mai1pw4weblane!.'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = {
    from: 'daryl@weblane.com',
    to: 'daryl@weblane.com',
    subject: 'Song Saved on Heroku: ' + song_title,
    text: 'Should be attached.',
    attachments: [
      {
        filename: song_title,
        path: song_file,
      }
    ]
  };

  try {
    fs.writeFile(song_file, JSON.stringify(req.body), (err) => {
      if (err) {
        console.log('JSN:/server/routes/api/1.0/save-song.js: writeFile ERROR =', err)
      }
      else {
        console.log('JSN:/server/routes/api/1.0/save-song.js: wrote file: ', song_file)

        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log('JSN:/server/routes/api/1.0/save-song.js: semdMail ERROR =', err)
          }
          else {
            console.log('JSN:/server/routes/api/1.0/save-song.js: semdMail INFO =', info)
          }
        });

        // Return result to the client.
        let json = {
          "status": request_status,
        }
        res.send(json);
      }
    });
  }
  catch (err) {
    request_status = 'error';
    console.error('JSN:/server/routes/api/1.0/save-song.js: ERROR: writing file:', song_file, ', error =', err);
  }
});

router.get('*', function(req, res, next) {
  console.log('JSN:/server/routes/api/1.0/save-song.js: >>> NOTICE: no such route!');
  var json = {
    'status': 'error',
    'msg': 'No such resource.',
  };
  let err = new Error();
  err.statusCode = 404;
  res.send(json);
});

module.exports = router;

