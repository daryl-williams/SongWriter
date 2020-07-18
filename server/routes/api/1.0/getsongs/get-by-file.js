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


const fs = require('fs');
const path = require('path');
const glob = require('glob');
const router = require('express').Router({mergeParams: true});

router.get('/', function(req, res)
{
  let pattern = req.document_root + '/songs/*.jsn';
  //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: pattern =', pattern);

  glob(pattern, function(err, files) {
    //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: globed files =', files);
    if (err) {
        console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: ERROR:', err);
        let json = {'status': 'error', 'route': '/getsongs-by-tag', 'result': 'unable to glob directory ' + songdir};
        console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: ERROR: returning json =', json);
        res.send(json);
    }
    else {
      let taglist = ['All Songs'];
      let filelist = [];
      let unclassified = [];

      // This for loop is used to build a list of all song tags, help in taglist.
      for (let i=0; i<files.length; i++){
        //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: >>> files['+i+'] =', files[i]);
        let ndx = files[i].lastIndexOf('/');

        let title = files[i].substring(ndx+1).replace(/'/, '');
        //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: TITLE =', title);

        filelist.push(files[i].substring(ndx+1));

        try {
          let song_file = fs.readFileSync(files[i], 'utf8');
          //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: >>> SONG_FILE:', song_file);

          let json = JSON.parse(song_file);
          //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: >>> JSON.header:', json.header);

          let tags = json.header.tags.split(',');
          //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: SONG_TAGS = >' + tags + '<');
          //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: SONG_TAGS LENGTH ', tags.length);

          if (tags.length === 1 && tags[0] === '') {
            //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: ###>>> TAGS =', tags);
            tags = ['Unclassified'];
            unclassified.push(title);
          }
//          else {
//            console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: CATCH ME IF YOU CAN ###>>> TAGS =', tags);
//          }

          for (let j=0, jlen=tags.length; j<jlen; ++j) {
            //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: TAGLIST =', taglist);

            let tag = tags[j].trim();
            //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: PROCESSING TAG[' + j + '] = >', tag + '<');

            if (taglist.includes(tag) === false) {
//              let tag = tags[j].trim();
              taglist.push(tag);
              //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: TAGLIST DOES NOT INCLUDE = >', tags[j] + '<');
              //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: PUSHED to TAGLIST =', tags[j] + "\n");
            }
            else {
              //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: ALREADY in TAGLIST =', tags[j] + "\n");
            }
          }
        }
        catch(e) {
          console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: >>> readFileSync ERROR:', e);
          return;
        }
      }
      //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: filelist =', filelist);
      //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: taglist =', taglist);

      let song_list = [];
      let song_index = {};

      for (let tag_ndx=0; tag_ndx<taglist.length; ++tag_ndx) {
        let current_tag = taglist[tag_ndx];
        //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: CURRENT_TAG: >' + current_tag + '<');

        let tag_obj = {
          id: current_tag,
          filelist: [],
        };

        song_index[current_tag] = {};
        song_index[current_tag].files = [];

        for (let file_ndx=0; file_ndx<files.length; ++file_ndx) {
          let filename = files[file_ndx];
          //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: FILENAME:', filename);

          // Read the song into song_file.
          let song_file = fs.readFileSync(filename, 'utf8');
          let json = JSON.parse(song_file);
          let song_tags = json.header.tags;
          //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: <<<>>> SONG_TAGS:', song_tags);
          if (song_tags === '') {
            song_tags = 'Unclassified';
          }

          if (song_tags.indexOf(current_tag) >= 0 || current_tag === 'All Songs') {
            //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: <<<>>> BINGO:', filename);
            song_index[current_tag].files.push(filename);
            tag_obj.filelist.push(filename);
          }
        }
        song_list.push(tag_obj);
      }
      //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: song_index=', song_index);
      //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: song_list=', song_list);

      let json = {'status': 'ok', 'route': '/api/1.0/getsongs-by-tag', 'result': song_list};
      //console.log('jsn:/server/routes/api/1.0/getsongs-by-tag.js: returning json =', json);
      res.send(json);
    }
  });
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

