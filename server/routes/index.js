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

//const html2canvas = require('html2canvas');
//const jsPDF = require('jsPDF');
//var pdf = require('html-pdf');

const fetch = require('node-fetch')
const path = require("path");
//const express = require("express");
const router = require('express').Router({mergeParams: true});

// Route Handlers

router.get('/', function (req, res) {
  console.log('JSN:/server/routes/index.js: document_root =', req.document_root);

/*
  // FUCKING CACHE.
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
*/
});

router.get('/export/:songfile', function (req, res) {
  console.log('JSN:/server/routes/index.js:router.post("/export/:songfile"): req.params =', req.params);
});

router.post('/export-setup', function (req, res) {
  const document_root = req.document_root;
  console.log('JSN:/server/routes/index.js:post(/export-setup):  document_root =', document_root);
  //console.log('JSN:/server/routes/index.js: req.body =', req.body);

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

  <link rel="stylesheet" type="text/css" href="/css/main.css" />
  <link rel="stylesheet" type="text/css" href="/css/toolbar.css" />
  <link rel="stylesheet" type="text/css" href="/css/button.css" />
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

  const crypto = require('crypto');
  const obfstr = crypto.randomBytes(32).toString('hex');
  console.log('JSN:/server/routes/index.js:post(/export-setup):  obfstr =', obfstr);

  const song_title = req.body.title;
  const export_dir = document_root + '/export';

  const html_srcfile = obfstr + ':' + song_title.replace(/[\s]+/g, '_') + '.html';
  const html_songfile = export_dir + '/' + html_srcfile;

  console.log('JSN:/server/routes/index.js:post(/export-setup):  html_srcfile =', html_srcfile);
  console.log('JSN:/server/routes/index.js:post(/export-setup):  html_songfile =', html_songfile);

  const export_outputfile = export_dir + '/' + obfstr + ':' + song_title + '.pdf';;
  console.log('JSN:/server/routes/index.js:post(/export-setup):  export_outputfile =', export_outputfile);

  const page_header = `<b>Title:</b> ${req.body.title}<br><b>Written by:</b> ${req.body.composer}<br>`;

  let song_wip = req.body.song.replace('<div id="preview-header"></div>', '<div id="preview-header">' + page_header + '</div>'); 
  let song_html = htmldoc.replace('SONG_CONTENT', song_wip); 
  let song_json = {
    song: song_html
  }
  //console.log('JSN:/server/routes/index.js:post(/export-setup):  SONG_JSON =', song_json);

  let jsonstr = JSON.stringify(song_json);
  //console.log('jsn:/client/js/jsn/util/export-file.js:exportFile(): jsonstr =', jsonstr);

  const puppeteer = require("puppeteer");

  // Write the song structure to storage.
  const fs = require('fs');

  try {
    fs.writeFile(html_songfile, song_html, 'ascii', () => {
      console.log('JSN:/server/routes/index.js:post(/export-setup).fs.WriteFile(): succesfully wrote file ', html_songfile);

      (async () => {
        console.log('JSN:/server/routes/index.js:post(/export-setup).fs.WriteFile(): callback, running puppeteer...')
        const browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox'],
        });
        const page = await browser.newPage();

        console.log('JSN:/server/routes/index.js:post(/export-setup).fs.WriteFile(): EXPORT_URL =', ENV['EXPORT_URL']);
        //const uri = 'http://localhost:3000/export/' + html_srcfile;
        const uri = '/export/' + html_srcfile;
        console.log('JSN:/server/routes/index.js:post(/export-setup).fs.WriteFile(): URI =', uri);
        await page.goto(uri);

        const export_file = export_dir + '/' + obfstr + ':' + song_title.replace(/[\s]+/g, '_') + '.pdf';
        console.log('JSN:/server/routes/index.js:post(/export-setup).fs.WriteFile(): export_file =', export_file);

        await page.pdf({ path: export_file, format: "Letter" });
        await browser.close();

/*
html2canvas(
  song_html,
  {scale: 2}
).then(canvas => {
  let pdf = new jsPDF('p', 'mm', 'a4');
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 211, 298);
  pdf.save(export_file);
});
*/

//const pdf = require('html-pdf');
//const options = { format: 'Letter'};

//pdf.create(song_html, options).toFile(export_file, function(err, res) {
//  if (err) {
//    return console.log('ERROR =', err);
//  }
//  else  {
    console.log('OK: ', res); // { filename: '/app/businesscard.pdf' }

        res.download(export_file, song_title + '.pdf', function (err) {
          if (err) {
            console.error('JSN:/server/routes/index.js:post(/export-setup).fs.WriteFile(): ERROR exporting song, error =', err);
          }
          else {
            console.log('JSN:/server/routes/index.js:post(/export-setup).fs.WriteFile(): exported song successfully.');
            try {
              fs.unlink(html_songfile, (err) => { 
                if (err) {
                  console.error('JSN:/server/routes/index.js:post(/export-setup).fs.WriteFile(): ERROR unkinking file: ' + html_songfile + ', error =', err);
                }
                else {
                  console.log('JSN:/server/routes/index.js:post(/export-setup).fs.WriteFile(): unkinked file: ' + html_songfile);
                }
              });
              //fs.unlink(export_dir + '/' + song_title.replace(/[\s]+/g, '_') + ".pdf");
              fs.unlink(export_file, (err) => { 
                if (err) {
                  console.error('JSN:/server/routes/index.js:post(/export-setup).fs.WriteFile(): ERROR unkinking file: ' + export_file + ', error =', err);
                }
                else {
                  console.log('JSN:/server/routes/index.js:post(/export-setup).fs.WriteFile(): unkinked file: ' + export_file);
                }
              });
            }
            catch(err) {
             console.log(err);
           }
          }
        });
// here
//  }
//});
// there
      })();
    });
  }
  catch (err) {
    request_status = 'error';
    console.error('JSN:/server/routes/api/1.0/export-file.js: ERROR: writing file:', html_songfile, ', error =', err);
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

