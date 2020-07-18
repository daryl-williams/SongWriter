/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/util/save-song.js
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

export function saveSong() {
  console.log('jsn:/client/js/util/save-song.js:saveSong(): this.song =', this.song);

//  if (document.querySelector('.dropdown-menu') !== null) {
//    console.log('jsn:/client/js/util/save-song.js:saveSong(): dropdown-menu =', document.querySelector('.dropdown-menu'));
//    document.querySelector('.dropdown-menu').classList.toggle('hidden');
//    document.querySelector('.dropdown-menu').classList.replace('hidden', 'visible');
//  }

  let measures = document.querySelectorAll('[data-type=measure]');

  for (let i=0, len=measures.length; i<len; ++i) {
    let beats = measures[i].querySelectorAll('[data-type=beat]');
    for (let j=0, jlen=beats.length; j<jlen; ++j) {
      console.log('jsn:/client/js/util/save-song.js:saveSong(): this.song['+i+']['+j+'] =', this.song.body[i][j]);
      console.log('jsn:/client/js/util/save-song.js:saveSong(): measure['+i+']['+j+'] =', beats[j]);
    }
  }

  //let song_str = 'song=' + JSON.stringify(this.song);
  //let encoded_song_str = encodeURI('song=' + JSON.stringify(this.song));
  //console.log('lsf:/lachlan.js:saveSong(): encoded_song_str =', encoded_song_str);
  let encoded_song_str = encodeURI(JSON.stringify(this.song));
  let song_str = JSON.stringify(this.song);
  
  let json = {
    "song": song_str
  };

  let self = this;

  const saveSong = async function(url, json) {
    let options = {
      method: "POST",
      body: song_str,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    let retval = await self.dispatch.post(url, 'json', options);
    console.log('jsn:/client/js/jsn/util/save-song.js:saveSong(): RETVAL =', retval);
  }

  let url = '/api/1.0/save/';
  saveSong(url, json);
}

