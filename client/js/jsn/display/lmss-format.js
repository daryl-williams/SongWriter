/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/out/jsn-format.js
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

export function lmssFormat(json) {
	/*
	 * This method is called when a change event has occured on the select input with id=select-song.
	 */
	console.log('jsn:/client/js/events/select-action.js:lmssFormat(): song json =', json);

	function print_lmss(number_of_bars, beats_per_bar, DOM_song_headers, song_grid, the_song) {
		// Create the number of bars specified.
		let cntr = 0;
		for (let bar_ndx=0; bar_ndx < number_of_bars; bar_ndx++) {
				let bar_number = bar_ndx + 1;
				cntr = bar_ndx+1;

				// Create the bar that will contain the
				// all of the individual beats and assign
				// it a class name based on our song's timing.
				var bar_container = document.createElement('div');
				bar_container.id = 'bar-container' + bar_number;
				if (beats_per_bar === 3) {
					bar_container.className = 'bar-container-3QT';
				}
				else if (beats_per_bar === 4) {
					bar_container.className = 'bar-container-CT';
				}
				bar_container.style.height = '1in';
				bar_container.style.border = 'none';
				bar_container.style.borderRight = 'solid thin grey';
				bar_container.style.borderBottom = 'solid thin grey';

				document.getElementById('song-grid').style.gridGap = '5px';

				// and append the bar_container to the song_grid.
				song_grid.appendChild(bar_container);

				// Now we want to create the individual beat element
				// for each "voice" (i.e. chord, measure or lyric).
				for (let beat_ndx=0; beat_ndx < beats_per_bar; beat_ndx++) {
					let beat_number = beat_ndx + 1;

					let beat_div = document.createElement('div');
					beat_div.id = 'beat' + beat_number;
					beat_div.className += 'beat-div';
					beat_div.style.border = 'none';

					if (beats_per_bar === 3) {
						beat_div.className = 'beat-3QT';
					}
					else if (beats_per_bar === 4) {
						beat_div.className = 'beat-CT';
					}
					bar_container.appendChild(beat_div);

					let chord_div = document.createElement('div');
					let id = 'chord-bar' + bar_number + '-beat' + beat_number;
					chord_div.id += id;
					chord_div.className = 'chord-beat bar' + bar_number + '-beat' + beat_number + '-chord';
					chord_div.style.border = 'none';
					chord_div.style.height = '25%';

					if (the_song.body.bar[bar_ndx]['beat'][beat_ndx].chord === '') {
						chord_div.innerHTML = '/';
					}
					else {
						chord_div.innerHTML = the_song.body.bar[bar_ndx].beat[beat_ndx].chord;
					}
					chord_div.addEventListener("click", this.selectChordClickHandler); 
					beat_div.appendChild(chord_div);

					console.log('lsf:/song.js:openPage(): BAR #', bar_number);
					console.log('lsf:/song.js:openPage(): BEAT #', beat_number);

//					if (song.body.bar !== undefined && song.body.bar !== undefined 
//						&& song.body.bar[bar_ndx] !== undefined 
//						&& song.body.bar[bar_ndx].beat !== undefined
//						&& song.body.bar[bar_ndx].beat[beat_ndx] !== undefined
//						&& song.body.bar[bar_ndx].beat[beat_ndx].chord !== undefined) {
//
//						chord_div.innerText = song.body.bar[bar_ndx].beat[beat_ndx].chord;
//					}

					// Free memory.
					chord_div = null;

					// Print the lyrics div.
					let lyrics_div = document.createElement('div');
					id = 'lyrics-bar' + bar_number + '-beat' + beat_number;
					lyrics_div.id = id;
					lyrics_div.setAttribute('contenteditable', true);
					lyrics_div.className = 'lyrics-beat bar' + bar_number + '-beat' + beat_number + '-lyrics';
					lyrics_div.style.border = 'none';
//					lyrics_div.style.height = '25%';
					lyrics_div.style.marginTop = '.8em';
					lyrics_div.addEventListener("click", this.lyricsClickHandler); 

					beat_div.appendChild(lyrics_div);

					let class_list = document.getElementsByClassName('beat-CT');
					let client_width = document.getElementById(id).clientWidth + 4 + 'px';
					let client_height = document.getElementById(id).clientHeight + 2 + 'px';

					let text = 'lyric' + beat_number;
					if (the_song.body.bar !== undefined && the_song.body.bar !== undefined 
						&& the_song.body.bar[bar_ndx] !== undefined 
						&& the_song.body.bar[bar_ndx].beat !== undefined
						&& the_song.body.bar[bar_ndx].beat[beat_ndx] !== undefined
						&& the_song.body.bar[bar_ndx].beat[beat_ndx].chord !== undefined) {

						text = the_song.body.bar[bar_ndx].beat[beat_ndx].lyric;
					}

					let paper = Raphael(lyrics_div, client_width, client_height);
					let lyric = paper.text(25, 25, text).attr({
						"font-size": 15,
						"font-family": "fontName, sans-serif",
						'text-anchor': 'middle'
					});

					// Free memory.
					lyrics_div = null;
					beat_div = null;
				}
		}
		bar_container= null;
	}
}

