/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/out/print-format.js
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

//import { song } from '../song.js';
//import { controlPanel }  from '../jsn/control_panel.js';
//import { editor }       from '../jsn/editor.js';
//import { controlPanel } from '../jsn/control_panel.js';
import { jsn } from '../../jsn/index.js';

export function printFormat(json) {
	/*
	 * This method is called when a change event has occured on the select input with id=select-song.
	 */
	console.log('jsn:/client/js/events/select-action.js:lmssFormat(): song json =', json);

	printPage();

	function printPage(the_song, lsf) {
		console.log('song.js:printPage(): this =', this);

		this.metronome = lsf.metronome;
		this.songAction = lsf.songAction;
		this.songFormat = lsf.songFormat;
		this.beatSymbol = lsf.beatSymbol;

		if (document.getElementById('app-content') !== null) {
//			let song_header = document.createElement('div');
//			song_header.id = 'song-header';

			let song_grid = document.createElement('div');
			song_grid.id = 'song-grid';

			let song_body = document.createElement('div');
			song_body.id = 'song-body';
			song_body.appendChild(song_grid);

//			document.getElementById('app-content').appendChild(song_header);
			document.getElementById('app-content').appendChild(song_body);

//			song_header = null;
			song_grid   = null;
			song_body   = null;
		}

		if (document.getElementById('song-body') !== null) {
			document.getElementById('song-body').style.padding = '0px';
		}

		if (document.getElementById('song-grid') !== null) {
			document.getElementById('song-grid').style.gridTemplateColumns = '2in 2in 2in 2in';
		}

		if (document.getElementById('song-header') && this.songAction === 'Display Song' !== null) {
			document.body.addEventListener('mousemove', function(event) {
				console.log('lsf:/song.js:printPage(): event.clientY =', event.clientY);

				if (document.getElementById('song-console') !== null) {
					let rect = document.getElementById('song-console').getBoundingClientRect();
					console.log('lsf:/song.js:printPage(): rect.bottom =', rect.bottom);

					if (rect.bottom > 0 && event.clientY < rect.bottom) {
						document.getElementById('song-console').style.display = 'none';
					}
					if (rect.bottom > 0 && event.clientY > rect.bottom) {
						document.getElementById('song-console').style.display = 'none';
					}
					if (rect.bottom > 0 && event.clientY <= rect.bottom) {
						document.getElementById('song-console').style.display = '';
					}
					else if (rect.bottom === 0 && event.clientY <= 15) {
						document.getElementById('song-console').style.display = '';
					}
				}
			});

			document.getElementById('song-header').addEventListener('click', function() {
				if (document.getElementById('song-console') !== null) {
					if (document.getElementById('song-console').style.display === '') {
						document.getElementById('song-console').style.display = 'none';
					}
					else if (document.getElementById('song-console').style.display === 'none') {
						document.getElementById('song-console').style.display = '';
					}
					else if (document.getElementById('song-console').style.display === 'inline') {
						document.getElementById('song-console').style.display = 'none';
					}
					else {
						document.getElementById('song-console').style.display = 'none';
					}
				}
			});
		}

		if (document.getElementById('song-header') !== null) {
			//document.getElementById('song-header').style.display = 'none';
			let html =  '<div style="margin:1em;">';
			html  += '<div>Title: ' + the_song.header.title + '</div>';
			html  += '<div>Written by: ' + the_song.header.composer + '</div>';
			html  += '<div>Key of: ' + the_song.header.key + '</div>';
			html  += '</div>';
			document.getElementById('song-header').innerHTML = html;
		}
		if (document.getElementById('song-body') !== null) {
			document.getElementById('song-body').style.marginLeft = '0px';
		}

		return;

//		if (lsf.songFormat === 'jsn') {
//			song.print_jsn(number_of_bars, beats_per_bar, DOM_song_headers, song_grid, the_song);
//		}
//		else if (lsf.songFormat === 'lmss') {
//			song.print_lmss(number_of_bars, beats_per_bar, DOM_song_headers, song_grid, the_song);
//		}
//		else {
//		}
	}
}

