/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/display/lmss-format.js
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

export function lmssFormat() {
	// This method is called to display the song in JSN Format.
	console.log('jsn:/client/js/jsn/display/lmss-format.js:lmssFormat(): this =', this);

	let number_of_bars = 0;

	if (jsn.meta.action === 'edit') {
		// Set up for editing the song.

		jsn.addToChordsContainer();

		if (document.querySelector('#app-console') !== null) {
			if (document.querySelector('#app-console').classList.contains('hide')) {
				// Close the console.
				document.querySelector('#app-console').classList.toggle('hide');
			}
		}
	}
	else if (jsn.meta.action === 'print' || jsn.meta.action === 'preview') {
		// Print or display the song Preview.

		// Hide the application toolbar if we're printing.
		if (jsn.meta.action === 'print') {
			if (document.querySelector('#app-header') !== null) {
				document.querySelector('#app-header').style.display = 'none';
			}

			// This is a synchronous call to print so it blocks until done.
			window.print();

			// Show the application toolbar.
			if (document.querySelector('#app-header') !== null) {
				document.querySelector('#app-header').style.display = 'block';
			}

			if (jsn.meta.previous_action === 'edit' || jsn.meta.previous_action === 'display') {
				// Show the application console.
				if (document.getElementById('app-console').classList.contains('hide')) {
					document.getElementById('app-console').classList.replace('hide', 'show');
				}
				// Remove the Preview/Print header.
				if (document.getElementById('preview-header') !== null) {
					document.getElementById('preview-header').innerHTML = '';
				}
			}

			jsn.meta.action = jsn.meta.previous_action;

			return;
		}

		if (document.querySelector('#app-console') !== null) {
			if (document.querySelector('#app-console').classList.contains('hide') === false) {
				// Close the console.
				document.querySelector('#app-console').classList.toggle('hide');
			}
		}

		if (document.getElementById('song-content') !== null) {
			// Display the preview.
			document.getElementById('song-content').innerHTML = `
			<div id="preview-header" style="padding:1em; text-align:center;">
			  <b>Title:</b> ${jsn.song.header.title}<br>
			  <b>Written by:</b> ${jsn.song.header.composer}<br>
			</div>
			<div id="song-grid"></div>
			`;
			document.getElementById('song-content').style.height = '100vh';
		}
	}

	if (document.getElementById('song-grid') !== null) {
		document.getElementById('song-grid').innerHTML = '';
	}

	number_of_bars = jsn.song.body.length;;

	if (document.getElementById('song-grid') === null) {
		console.log('jsn:/client/js/jsn/display/jsnFormat.js: ERROR: missing song-grid!');
		alert('Missing song-grid! Exiting...');
		return;
	}

	if (jsn.meta.displayLayout === 'auto') {
		document.getElementById('song-grid').style.gridTemplateColumns='repeat(auto-fit, auto)';
	}
	else if (jsn.meta.displayLayout === '4-column') {
		document.getElementById('song-grid').style.gridTemplateColumns='repeat(4, auto)';
	}
	else if (jsn.meta.displayLayout === '5-column') {
		document.getElementById('song-grid').style.gridTemplateColumns='repeat(5, auto)';
	}
	else if (jsn.meta.displayLayout === '6-column') {
		document.getElementById('song-grid').style.gridTemplateColumns='repeat(6, auto)';
	}
	else if (jsn.meta.displayLayout === '8-column') {
		document.getElementById('song-grid').style.gridTemplateColumns='repeat(8, auto)';
	}

	let song_grid = document.getElementById('song-grid');

	// Create the number of bars specified.
	let cntr = 0;
	for (let bar_ndx=0; bar_ndx < number_of_bars; bar_ndx++) {
		let bar_number = bar_ndx + 1;
		cntr = bar_ndx+1;

		// Create the bar that will contain all
		// of the individual beats and assign
		// it a class name based on our song's timing.
		var bar_container = document.createElement('div');
		bar_container.id = 'bar-container' + bar_number;
		bar_container.className = 'measure ';
		if (jsn.song.header.beats_per_bar === 3) {
			bar_container.className += 'bar-container-3QT';
		}
		else if (jsn.song.header.beats_per_bar === 4) {
			bar_container.className += 'bar-container-CT';
		}
		bar_container.id = 'bar-container' + bar_number;
		bar_container.setAttribute('data-type', 'measure');

		if (jsn.meta.action === 'preview') {
			bar_container.style.border = 'none';
			bar_container.style.height = '.5in';
		}

		// and append the bar_container to the song_grid.
		song_grid.appendChild(bar_container);

		// Now we want to create the individual beat element
		// for each "voice" (i.e. chord, measure or lyric).
		for (let beat_ndx=0; beat_ndx < jsn.song.header.beats_per_bar; beat_ndx++) {
			let beat_number = beat_ndx + 1;

			let beat_div = document.createElement('div');
			beat_div.id = 'beat' + beat_number;
			beat_div.className += 'beat-div';
			beat_div.setAttribute('data-type', 'beat');

			if (jsn.song.header.beats_per_bar === 3) {
				beat_div.className = 'beat-3QT';
			}
			else if (jsn.song.header.beats_per_bar === 4) {
				beat_div.className = 'beat-CT';
			}
			bar_container.appendChild(beat_div);

			let chord_div = document.createElement('div');
			let id = 'chord-div_bar' + bar_number + '-beat' + beat_number;
			chord_div.id += id;
			chord_div.className = 'chord-beat bar' + bar_number + '-beat' + beat_number + '-chord';

			if (jsn.meta.action === 'preview') {
				chord_div.style.border = 'none';
			}

			if (jsn.song.body[bar_ndx] === undefined) {
				jsn.song.body[bar_ndx] = new Array(jsn.song.header.beats_per_bar - 1);
				for (let i=0; i<jsn.song.header.beats_per_bar; i++) {
					jsn.song.body[bar_ndx][i] = {};
				}
			}

			// Create the "Chord" div.
			let value = '';
			if (jsn.meta.action === 'new song') {
				jsn.song.body[bar_ndx][beat_ndx].chord = '';
			}
			else if (jsn.song.body[bar_ndx][beat_ndx] !== undefined) {
				value = jsn.song.body[bar_ndx][beat_ndx].chord;
				if ( typeof value === 'undefined') {
					value = '';
				}
			}

			if (value === '') {
				let paper = Raphael(chord_div, 50, 30); // This is the width / height of the svg element.
				jsn.meta.pulseSymbol = paper.path('M15,25 L30,5').attr({stroke: '#000', 'stroke-width': 2});
				chord_div.innerHTML = '/';
			}
			else {
				chord_div.innerHTML = value;
			}

			//chord_div.innerHTML = value;
			chord_div.addEventListener("click", jsn.events.selectChordClickHandler); 
			beat_div.appendChild(chord_div);
			chord_div = null; // Free memory.

			//console.log('lsf:/song.js:openPage(): BAR #', bar_number);
			//console.log('lsf:/song.js:openPage(): BEAT #', beat_number);

			// Create the "Beat" div.
			let meter_div = document.createElement('div');
			id = 'meter-bar' + bar_number + '-beat' + beat_number;
			meter_div.id += id;
			meter_div.className += 'meter-beat bar' + bar_number + '-beat' + beat_number + '-meter';

			let sub_beats = 1;
			if (jsn.meta.doubleTime) {
				if (jsn.song.header.beats_per_bar === 3) {
					sub_beats *= 2;
				}
				else if (jsn.song.header.beats_per_bar === 4) {
					sub_beats *= 2;
				}
			}

			let paper = Raphael(meter_div, 50, 30); // This is the width / height of the svg element.

			let metric_symbol_slash = true;
			if (document.getElementById('metrics-button') !== null) {
				if (document.getElementById('metrics-button').value === 'Metric Symbol @') {
					metric_symbol_slash = false;
				}
			}

			for (let i=1; i<=sub_beats; i++) {
				if (metric_symbol_slash) {
					jsn.meta.pulseCurrent = 'slash';
					//jsn.meta.pulseSymbol = paper.path('M0,40 L40,10').attr({stroke: '#000', 'stroke-width': 2});
					jsn.meta.pulseSymbol = paper.path('M15,25 L30,5').attr({stroke: '#000', 'stroke-width': 2});
				}
				else {
					jsn.meta.pulseCircle = paper.circle(20, 20, 10).attr({
						fill: '#ccc',
						stroke: '#00',
						'stroke-width': 1
					});
					jsn.meta.pulseCurrent = 'circle';
				}
			}

			jsn.song.body[bar_ndx][beat_ndx].beat = sub_beats;

			if (jsn.meta.action !== 'preview') {
				//chord_div.style.border = 'none';
				beat_div.appendChild(meter_div);
			}
			meter_div = null; // Free memory.

			// Create the lyrics div.
			let lyrics_div = document.createElement('div');
			id = 'lyrics-bar' + bar_number + '-beat' + beat_number;
			lyrics_div.id = id;
			lyrics_div.setAttribute('contenteditable', true);
			lyrics_div.className = 'lyrics-beat bar' + bar_number + '-beat' + beat_number + '-lyrics';

			//lyrics_div.addEventListener("click", jsn.events.lyricsClickHandler); 
			lyrics_div.addEventListener("keyup", jsn.events.lyricsClickHandler); 

			if (jsn.meta.action === 'preview') {
				lyrics_div.style.border = 'none';
			}

			beat_div.appendChild(lyrics_div);

//if (document.querySelectorAll('.lyrics-beat') !== null) {
//	document.querySelectorAll('.lyrics-beat')[beat_ndx].style.paddingTop = 10 + 'px';
//}

			let class_list = document.getElementsByClassName('beat-CT');
			let client_width = document.getElementById(id).clientWidth + 2 + 'px';
			let client_height = document.getElementById(id).clientHeight + 2 + 'px';

			let text = ''; //'lyric' + beat_number;

			if (jsn.song.body[bar_ndx][beat_ndx] !== undefined && jsn.song.body[bar_ndx][beat_ndx].lyric !== undefined ) {
				text = jsn.song.body[bar_ndx][beat_ndx].lyric;
			}

			jsn.song.body[bar_ndx][beat_ndx].lyric = text;

			lyrics_div.innerHTML = text;

			// Free memory.
			lyrics_div = null;
			beat_div = null;
		}
	}

	bar_container= null;

	if (document.getElementById('song-grid') !== null) {
		const viewport_height =  window.innerHeight;
		const header_height = document.getElementById('song-metadata').offsetHeight;
		const offset_height = viewport_height - header_height;

		const song_grid_height = document.getElementById('song-grid').offsetHeight;

		let height = (offset_height > song_grid_height) ? song_grid_height : offset_height;
		height = height -100;
	}
}

