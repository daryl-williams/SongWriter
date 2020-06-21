/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/display/newsong.js
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

export function newSong() {
  // The purpose of this function is to present a clean
  // metadata form so as to begin creating a new song.
  //console.log('jsn:/client/js/jsn/display/newsong.js:newSong(): jsn.song =', jsn.song);

  jsn.meta.action = 'edit';

  // Now that we have a song we can turn on the Save file option.
  if (document.getElementById('save-menu-option') !== null) {
    document.getElementById('save-menu-option').classList.add('disabled');
  }

  // We also need to disable the File Print menu option.
  if (document.getElementById('print-menu-option') !== null) {
    document.getElementById('print-menu-option').classList.add('disabled');
  }

  // We also need to disable the View menu Toggle Console option.
  if (document.getElementById('viewmenu-toggle-console') !== null) {
    document.getElementById('viewmenu-toggle-console').classList.add('disabled');
  }

  // We also need to disable the View menu Display option.
  if (document.getElementById('display-song') !== null) {
    document.getElementById('display-song').classList.add('disabled');
  }

  // We also need to disable the View menu Preview option.
  if (document.getElementById('preview-song') !== null) {
    document.getElementById('preview-song').classList.add('disabled');
  }

  // Clear out any previous song header data.
  for (let prop in jsn.song.header) {
    if (jsn.song.header.hasOwnProperty(prop)) {
      jsn.song.header[prop] = '';
      console.log('jsn:/client/js/jsn/display/newsong.js:newSong(): song header[' +  prop + '] =', jsn.song.header[prop]);
    }
  }

  jsn.song.body = [];

  if (document.getElementById('song-metadata-form') !== null) {
    const form = document.getElementById('song-metadata-form');
    [...form.elements].forEach((input) => {
        console.log('jsn:/client/js/jsn/display/newsong.js:newSong(): form input =', input.id);
        if (input.tagName === 'INPUT') {
          input.value = '';
        }
        else if (input.tagName === 'SELECT') {
          input.options[0].defaultSelected = true;
        }
    });
  }

  if (document.getElementById('app-console') !== null) {
    document.getElementById('app-console').classList.replace('hide', 'visible');
  }

  if (document.getElementById('song-content') !== null) {
    document.getElementById('song-content').innerHTML = '<div id="song-grid"></div>';
  }

  if (document.getElementById('song-grid') !== null) {
    document.getElementById('song-grid').innerHTML = '';
  }

  if (document.getElementById('chord-family') !== null) {
    document.getElementById('chord-family').innerHTML = '';
  }

  if (document.getElementById('chords-additional') !== null) {
    document.getElementById('chords-additional').innerHTML = '';
  }

  if (document.getElementById('viewmenu-toggle-console') !== null) {
    document.getElementById('viewmenu-toggle-console').classList.toggle('disabled');
  }
}

