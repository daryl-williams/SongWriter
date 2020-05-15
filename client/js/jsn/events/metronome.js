/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/events/metronome.js
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

export function metronome(event) {
	/*
	 * This method is called when <TODO>
	 */
	console.log('jsn:/client/js/events/metronome.js:metronome(): event.target =', event.target);

	event.preventDefault();

  event.target.firstElementChild.style.visibility = 'visible';


	return;

	console.log('jsn:/client/js/jsn/display/file-browser.js:fileBrowser(): SONG CLICKED =', event.target.innerText);

	// Remove any existing selected song-item.
	if (document.getElementsByClassName('selected-song song-list-item') !== null) {
		let len = document.getElementsByClassName('selected-song song-list-item').length;
		for (let sel_ndx=0; sel_ndx<len; ++sel_ndx) {
			document.getElementsByClassName('selected-song song-list-item')[sel_ndx].classList.remove('selected-song');
		}
	}

	// Add the selected-song class to the song-list-item element so it gets highlighted.
	event.target.classList.add('selected-song');

/*
	if (document.getElementById('file-browser-files') !== null) {
		let html = '<ul id="song-list">';
		for (let song_ndx=0; song_ndx<jsn.meta.songList.length; ++song_ndx) {
			let songname = jsn.meta.songList[song_ndx].id;
			//console.log('jsn:/client/js/jsn/display/file-browser.js:fileBrowser(): songname =', songname);
			if (songname === event.target.innerText) {
				let filelist = jsn.meta.songList[song_ndx].filelist;
				//console.log('jsn:/client/js/jsn/display/file-browser.js:fileBrowser(): FILELIST =', filelist);
				for (let file_ndx=0; file_ndx<filelist.length; ++file_ndx) {
					let fq_filename = filelist[file_ndx];
					let fname = fq_filename.substring(fq_filename.lastIndexOf('/')+1);
					html += '<li class="song-list-item">' + fname + '</li>\n';
				}
			}
		}
		html += '</ul>\n';
		document.getElementById('file-browser-files').innerHTML = html;
	}
*/

	if (event.type === 'dblclick') {
		jsn.events.openFile();
	}

	return;

				// Setup the event click handler for song-list elements.
				if (document.getElementsByClassName('song-list-item') !== null) {
					let els = document.getElementsByClassName('song-list-item');
					for (let i=0; i<els.length; ++i) {
/*
								els[i].addEventListener('click', function(event) {
									console.log('jsn:/client/js/jsn/display/file-browser.js:fileBrowser(): SONG CLICKED =', event.target.innerText);

									// Add the selected class to the song-list-item element so it gets highlighted.
									if (document.getElementsByClassName('selected-tag song-list-item') !== null) {
										for (let sel_ndx=0; sel_ndx<document.getElementsByClassName('selected-tag song-list-item').length;++sel_ndx) {
											document.getElementsByClassName('selected-tag song-list-item')[sel_ndx].classList.remove('selected-tag');
										}
									}

									els[i].classList.add('selected-tag');
									html += '</ul>\n';
								});
*/
					}
				}
}

