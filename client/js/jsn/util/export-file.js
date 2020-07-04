/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/util/export-pdf.js
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

import { jsn } from '../index.js';

export function exportFile() {
  /*
   * This method is called when the File Export menu option has been selected.
   */

  let num_cols = 4;
  let song_html = '';
  let songname = jsn.song.header.title + '.jsn';
  let display_format = jsn.controlPanel.displayFormat;

  if (document.getElementById('song-content') !== null) {
    song_html = document.getElementById('song-content').innerHTML.trim();
    //console.log('jsn:/client/js/jsn/util/export-file.js:exportFile(): song_html =', song_html);
  }

  let url = '/export-setup';

  song_html = song_html.replace(/\n/g, "");
  song_html = song_html.replace(/^\\"/g, '"');
  song_html = song_html.replace(/^\"/, "");

  let payload = {
    song: song_html,
    title: jsn.song.header.title,
    composer: jsn.song.header.composer,
  };
  //console.log('jsn:/client/js/jsn/util/export-file.js:exportFile(): payload =', payload);

  let jsonstr = JSON.stringify(payload);
  //console.log('jsn:/client/js/jsn/util/export-file.js:exportFile(): jsonstr =', jsonstr);

  let options = {
    method: "POST",
    body: jsonstr,
    headers: {
      'Content-Type': 'application/json',
    },
    responseType: 'blob',
  };
  console.log('jsn:/client/js/jsn/util/export-file.js:exportFile(): options =', options);

  async function getpdf() {
    let response = await jsn.dispatch.post(url, 'blob', options);
    console.log('jsn:/client/js/jsn/util/export-file.js:exportFile(): response =', response);

//    if (!response.ok) {
//      throw new Error('Network response was not ok');
//      return;
//    }

    let filename = response.filename;

    //let blob = new Blob([response], { type: 'application/pdf' });
    let blob = response.data;

    //url = window.URL.createObjectURL(response);
    url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    document.body.appendChild(link);
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }

  getpdf();
}

