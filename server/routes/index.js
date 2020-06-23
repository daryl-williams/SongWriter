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

router.post('/export', function (req, res) {

  console.log('JSN:/server/routes/index.js:router.post("/export"): req.body.song =', req.body.song);

  let encoded_song_str = encodeURI(JSON.stringify(req.body.song));

  // Write the song structure to storage.
  const fs = require('fs');

  let file_store_root = './client/export';
  let export_file = 'testing-pdf-export.html';

  let song_file = file_store_root + '/' + export_file;
  console.log('JSN:/server/routes/api/1.0/export-file.js: song_file =', song_file);

  const htmldoc = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta  name = "viewport" content = "width=device-width, initial-scale=1" />
  <meta  name="description" content="A JSON song notation prototype" />

  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

  <!--
  <link rel="manifest" href="/site.webmanifest">
  -->

  <link rel="stylesheet" type="text/css" href="/css/main.css" />
  <link rel="stylesheet" type="text/css" href="/css/toolbar.css" />
  <link rel="stylesheet" type="text/css" href="/css/button.css" />
<!--
  <link rel="stylesheet" type="text/css" href="/css/console-switch.css" />
-->
  <link rel="stylesheet"  type="text/css" href="/vendors/font-awesome/font-awesome-4.7.0/css/font-awesome.css" />

  <link rel="stylesheet" type="text/css" href="/css/song-meta.css" />
  <link rel="stylesheet" type="text/css" href="/css/file-browser.css" />
  <link rel="stylesheet" type="text/css" href="/css/song.css" />
  <link rel="stylesheet" type="text/css" href="/css/chords-container.css" />
  <link rel="stylesheet" type="text/css" href="/css/split.css" />
  <link rel="stylesheet" type="text/css" href="/css/help-window.css" />
  <link rel="stylesheet" media="print" href="/css/print.css" />

  <title>
    Song Writer
  </title>
</head>
<body>
  <div class="page">
    <div id="song-content" style="width: 8.5in; height: 11in;">
      SONG_CONTENT
    </div>
  </div>
</body>
</html>
`;

  const song_title = `<b>Title:</b> ${req.body.title}<br><b>Written by:</b> ${req.body.composer}<br>`;

  let song_wip = req.body.song.replace('<div id="preview-header"></div>', '<div id="preview-header">' + song_title + '</div>'); 
  let song_html = htmldoc.replace('SONG_CONTENT', song_wip); 

  const puppeteer = require("puppeteer");

  try {
    //fs.writeFileSync(song_file, JSON.stringify(req.body.song));
    fs.writeFile(song_file, song_html, 'ascii', () => {
      (async () => {
        console.log('JSN:/server/routes/index.js:router.get("/export"): PUPPETTER');
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        //await page.goto("http://weblane.com:3000/export/Rita\ Ballew.jsn/4/jsn");
        //await page.goto("http://localhost:3000");
        //await page.goto("https://google.com");
        //await page.goto("https://unform.com");

        await page.goto("http://localhost:3000/export/testing-pdf-export.html");
        await page.pdf({ path: "./TEST.pdf", format: "Letter" });
        await browser.close();

        let json = {
          status: 'ok',
          song: req.params.song,
          cols: req.params.cols,
          format: req.params.format,
          route: '/export/'
        };
        res.send(json);
      })();
    });
  }
  catch (err) {
    request_status = 'error';
    console.error('JSN:/server/routes/api/1.0/export-file.js: ERROR: writing file:', song_file, ', error =', err);
  }
});

router.get('/about', function (req, res) {
  res.send('About time!');
  console.log('JSN:/server/routes/index.js:router.get("/about"): this =', this);
});

// API Routes
//router.use('/api', require('./api/index.js'));
router.use('/api/1.0', require('./api/1.0/index.js'));
//router.use('/view', require('./view/index.js'));

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

