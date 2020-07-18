/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/display/file-browser.js
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

'use strict';

import { jsn } from '../../jsn/index.js';

export function fileBrowser() {
  // The purpose of this function is to display the
  // song file browser so the user can select a song.
  console.log('jsn:/client/js/jsn/display/file-browser.js:fileBrowser(): song jsn =', jsn);

  if (document.getElementById('file-browser') !== null) {
    jsn.meta.fileBrowser = document.getElementById('file-browser');

    if (document.getElementById('file-browser-header') !== null) {
      // An event handler for the user to move the file-browser window.
      document.getElementById('file-browser-header').addEventListener('click', jsn.events.dragWindow);
console.log('jsn:/client/js/jsn/display/file-browser.js:fileBrowser(): added click event handler to file-browser-header =', document.getElementById('file-browser-header'));
    }

    const get_song_tags = async function(url, content_type) {
      let songs_by_tag = await jsn.dispatch.get(url, content_type);
      //console.log('jsn:/client/js/jsn/display/file-browser.js:songs_by_tag(): songs_by_tag =', songs_by_tag);

      jsn.meta.tagList = songs_by_tag;

      let html = '<ul id="song-tags-list">\n';

      let filelist = [];
      let taglist = songs_by_tag;

      function compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const songA = a.id.toUpperCase();
        const songB = b.id.toUpperCase();

        let comparison = 0;
        if (songA > songB) {
          comparison = 1;
        }
        else if (songA < songB) {
          comparison = -1;
        }
        return comparison;
      }

      taglist.sort(compare);

      if (document.getElementById('file-browser-tags-container') !== null) {
        // Fill the tag names side display.
        for (let tag_ndx=0; tag_ndx<taglist.length; ++tag_ndx) {

          let tagname = taglist[tag_ndx].id;
          //console.log('jsn:/client/js/jsn/display/file-browser.js:get_song_tags(): songs_by_tag[' + tag_ndx + '].id =', taglist[tag_ndx].id);
          console.log('jsn:/client/js/jsn/display/file-browser.js:get_song_tags(): songs_by_tag[' + tag_ndx + '].id =', tagname);

          if (tag_ndx === 0) {
            html += '<li class="selected-tag song-tag-item" >' + taglist[tag_ndx].id + '</li>\n';
          }
          else {
            html += '<li class="song-tag-item" >' + taglist[tag_ndx].id + '</li>\n';
          }
          for (let file_ndx=0; file_ndx<taglist[tag_ndx].filelist.length; ++file_ndx) {
            if (!filelist.includes(taglist[tag_ndx].filelist[file_ndx])) {
              filelist.push(taglist[tag_ndx].filelist[file_ndx]);
            }
          }
        }
        html += '</ul>\n';
        document.getElementById('file-browser-tags-content').innerHTML = html;

        // Setup the event click handler for song-tag-item elements.
        if (document.getElementsByClassName('song-tag-item') !== null) {
          let els = document.getElementsByClassName('song-tag-item');
          for (let i=0; i<els.length; ++i) {
            els[i].addEventListener('click', jsn.events.selectTag);
          }
        }
      }

      if (document.getElementById('file-browser-files') !== null) {
        html = '<ul id="song-list">';
        for (let file_ndx=0; file_ndx<filelist.length; ++file_ndx) {
          let fq_filename = filelist[file_ndx];
          let fname = fq_filename.substring(fq_filename.lastIndexOf('/')+1);
          html += '<li class="song-list-item">' + fname + '</li>\n';
        }
      }
      html += '</ul>\n';
      document.getElementById('file-browser-files').innerHTML = html;

      // Setup the event click handler for song-list elements.
      if (document.getElementsByClassName('song-list-item') !== null) {
        let els = document.getElementsByClassName('song-list-item');
        for (let i=0; i<els.length; ++i) {

          els[i].addEventListener('click', jsn.events.selectSong);
          els[i].addEventListener('dblclick', jsn.events.selectSong);
          //els[i].addEventListener('dblclick', jsn.events.openFile);
          //els[i].addEventListener('click', jsn.events.openFile);

          /*
          els[i].addEventListener('dblclick', function(event) {
            console.log('jsn:/client/js/jsn/display/file-browser.js:fileBrowser(): SONG DOUBLE CLICKED =', event.target.innerText);

            // Add the selected class to the song-list-item element so it gets highlighted.
            if (document.getElementsByClassName('selected-song song-list-item') !== null) {
              for (let sel_ndx=0; sel_ndx<document.getElementsByClassName('selected-song song-list-item').length;++sel_ndx) {
                document.getElementsByClassName('selected-song song-list-item')[sel_ndx].classList.remove('selected-song');
              }
            }

            els[i].classList.add('selected-song');
            html += '</ul>\n';

            jsn.events.openFile();
          });
          */

          /*
          els[i].addEventListener('click', function(event) {
            console.log('jsn:/client/js/jsn/display/file-browser.js:fileBrowser(): SONG CLICKED =', event.target.innerText);

            // Remove the selected class from the song-list-item element so it's no longer highlighted.
            let selected = document.getElementsByClassName('selected-song song-list-item');
            if (selected !== null && selected.length>0) {
              for (let sel_ndx=0; sel_ndx<selected.length;  ++sel_ndx) {
                selected[sel_ndx].classList.remove('selected-song');
              }
            }
            els[i].classList.add('selected-song');

//            if (document.getElementById('file-browser-files') !== null) {
//              html = '<ul id="song-list">';
//              for (let tags_ndx=0; tags_ndx<jsn.meta.songList.length; ++tags_ndx) {
//                let tagname = jsn.meta.songList[tags_ndx].id;
//                console.log('jsn:/client/js/jsn/display/file-browser.js:fileBrowser(): TAGNAME =', tagname);
//                if (tagname === event.target.innerText) {
//                  let filelist = jsn.meta.songList[tags_ndx].filelist;
//                  console.log('jsn:/client/js/jsn/display/file-browser.js:fileBrowser(): FILELIST =', filelist);
//                  for (let file_ndx=0; file_ndx<filelist.length; ++file_ndx) {
//                    let fq_filename = filelist[file_ndx];
//                    let fname = fq_filename.substring(fq_filename.lastIndexOf('/')+1);
//                    html += '<li class="song-list-item">' + fname + '</li>\n';
//                    document.getElementById('file-browser-files').innerHTML = html;
//                  }
//                }
//              }
//            }
//            html += '</ul>\n';
//          });
*/
        }
      }
    }

    let url = '/api/1.0/getsongs-by-tag';
    get_song_tags(url, 'json');

    let vpy = window.innerWidth;
    let vpy_half_width = vpy / 2;

    let file_browser_width = document.getElementById('file-browser').offsetWidth;
    let half_fb_width = file_browser_width / 2; 

    let left = vpy_half_width - half_fb_width;

    document.getElementById('file-browser').style.top = '100px';
    document.getElementById('file-browser').style.left = left + 'px';
    document.getElementById('file-browser').style.visibility = 'visible';
//    document.getElementById('file-browser').classList.add = 'center-file-browser';

    // Setup the click event handler for file-browser close control.
    if (document.getElementById('file-browser-close-controls') !== null) {
      document.getElementById('file-browser-close-controls').addEventListener('click', function(event) {
        document.getElementById('file-browser').style.visibility = 'hidden';
      });
    }
  }
}

