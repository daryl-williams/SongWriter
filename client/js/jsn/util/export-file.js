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

export async function exportFile() {
  /*
   * This method is called when the File Export menu option has been selected.
   */

  let song_html = '';
  let num_cols = 4;
  let songname = jsn.song.header.title + '.jsn';
  let display_format = jsn.controlPanel.displayFormat;

  if (document.getElementById('song-content') !== null) {
    song_html = document.getElementById('song-content').innerHTML;
    console.log('jsn:/client/js/jsn/util/export-file.js:exportFile(): song_html =', song_html);
  }

  //let url = '/export/' + songname + '/' + num_cols + '/' + display_format;
  let url = '/export';

  song_html = song_html.replace(/\n/g, "");
  song_html = song_html.replace(/^\\"/g, '"');

//  if (song_html[0] === '"') {
 //   song_html = song_html.substring(1);
  //}
  song_html = song_html.replace(/^\"/, "");

  let payload = {
    song: song_html,
    title: jsn.song.header.title,
    composer: jsn.song.header.composer,
  };

  let options = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  let retval = await jsn.dispatch.post(url, 'html', options);
  console.log('jsn:/client/js/jsn/util/export-file.js:exportFile(): retval =', retval);

  //let pdf = await jsn.dispatch.get(url, content_type);
  //let pdf = await jsn.dispatch.get(url);

/*
  const puppeteer = require("puppeteer");
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
    await page.pdf({ path: "./TEST.pdf", format: "Letter" });
    await browser.close();
  })();

  // The export_file function executes an ajax request for the song.
  const exportSong = async function(url, content_type) {
    let song = await jsn.dispatch.get(url, content_type);
    //console.log('jsn:/client/js/jsn/util/openfile.js:exportFile:getsong(): song =', song);

    if (song.statusCode != undefined && song.statusCode != 200) {
      console.log('jsn:/client/js/jsn/util/openfile.js:exportFile:getsong(): ERROR: song.statusCode =', song.statusCode);
      alert(JSON.stringify(song));
      return;
    }

    if (song.format === 'jsn') {
      jsn.display.jsnFormat();
    }
    else if (song.format === 'lmss') {
      jsn.display.jsnFormat();
    }
    else  {
      console.log('jsn:/client/js/jsn/util/openfile.js:exportFile:getsong(): ERROR: unknown song format =', song.format);
    }
  }
  exportSong(url, 'json');
*/
}

