/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/events/events-orig.js
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

import { lsf } from '../lsf.js';
//import { song } from '../song.js';
//import { setSongAction } from './setSongAction.js';
//console.log('JSN:/client/js/events.js: setSongAction =', setSongAction);

class eventHandler {

	constructor() {
		console.log('lsf:/lsf.js:constructor() this =', this);

	}

	fetch() {
		console.log('JSN:events.js:fetch(): fetching...');
	}

/*
	setSongAction(event) {
		*
		* This method is called when a change event has occured on the select input with id=song-action.
		*
		event.preventDefault();
		console.log('lsf:/lsf.js:songAction(): event =', event);

		lsf.songAction = event.target.value;

		let disabled_state = true;

		if (this.songAction === 'Select action') {
			disabled_state = true;
		}
		else {
			disabled_state = false;
		}

		let song_name = '';

		if (document.getElementById('song-select') !== null) {
			song_name = document.getElementById('song-select').value;
			document.getElementById('song-select').disabled = disabled_state;
		}

		if (document.getElementById('song-format-button') !== null) {
			document.getElementById('song-format-button').disabled = disabled_state;
		}

		if (document.getElementById('grid-column-select') !== null) {
			document.getElementById('grid-column-select').disabled = disabled_state;
		}

		if (document.getElementById('metrics-button') !== null) {
			document.getElementById('metrics-button').disabled = disabled_state;
		}

		if (lsf.songAction === 'Edit Song') {
			lsf.openShop(song_name);
		}
		else if (lsf.songAction === 'Display Song') {
			lsf.printPage();
		}
		else {
		}
	}
*/

	toggleGridColumns(event) {
		console.log('lsf:/lachlan.js:toggleGridColumns(): event =', event);

		event.preventDefault();

		let select = document.getElementById('grid-column-select');

		if (select !== null) {
			if (select.value === 'Grid layout: auto layout') {
				document.getElementById('song-grid').style.gridTemplateColumns='repeat(auto-fill, minmax(1in, 2in))';
			}
			else if (select.value === 'Grid layout: 4 columns') {
				document.getElementById('song-grid').style.gridTemplateColumns='repeat(4, minmax(1in, 2in))';
			}
			else if (select.value === 'Grid layout: 5 columns') {
				document.getElementById('song-grid').style.gridTemplateColumns='repeat(5, minmax(1in, 2in))';
			}
			else if (select.value === 'Grid layout: 6 columns') {
				document.getElementById('song-grid').style.gridTemplateColumns='repeat(6, minmax(1in, 2in))';
			}
		}
		select = null;
	}


	setSongFormat() {
		console.log('lsf:/lachlan.js:setSongFormat(): this =', this);

		if (document.getElementById('song-format-button') !== null) {
			if (document.getElementById('song-format-button').value === 'Song Format: JSN') {
				document.getElementById('song-format-button').value = 'Song Format: LMSS';
				lsf.songFormat = 'lmss';

				let number_of_bars = song.header.number_of_bars;
				let beats_per_bar = song.header.beats_per_bar;
				let DOM_song_headers = document.querySelectorAll('[data-type=header]');
				let song_grid = document.getElementById('song-grid');

				song.print_lmss(number_of_bars, beats_per_bar, DOM_song_headers, song_grid, song);
			}
			else if (document.getElementById('song-format-button').value === 'Song Format: LMSS') {
				document.getElementById('song-format-button').value = 'Song Format: JSN';
				lsf.songFormat = 'jsn';
			}
			else {
			}
		}
	}

	toggleMetric() {
		console.log('lsf:/lachlan.js:toggleMetric(): this =', this);

		if (self.currentMetric === 'slash') {
			self.currentMetric = 'circle';
		}
		else {
			self.currentMetric = 'slash';
		}

		let metrics = document.getElementsByClassName('meter-beat');
		for (let i=0, len=metrics.length; i<len; i++) {
			console.log('lsf:/lachlan.js:toggleMetric(): metrics['+i+'] =', metrics[i]);

			let svg = metrics[i].firstElementChild;
			console.log('lsf:/lachlan.js:toggleMetric(): SVG =', svg);

			let kids = svg.children;
			console.log('lsf:/lachlan.js:toggleMetric(): KIDS =', kids);

			let path = kids[2];
			console.log('lsf:/lachlan.js:toggleMetric(): PATH =', path);
//			song.metricCurrent.hide();

				let meter_id = metrics[i].id;
				if (document.getElementById(meter_id) !== null) {
					let meter_div = document.getElementById(meter_id);

					let svg = metrics[i].firstElementChild;
					metrics[i].removeChild(svg);

					let paper = Raphael(meter_div, 75, 75);
					if (self.currentMetric === 'slash') {
						song.metricSlash = paper.path('M20,40 L40,10').attr({stroke: '#000', 'stroke-width': 2});
					}
					else if (self.currentMetric === 'circle') {
						let metricCircle = paper.circle(20, 20, 8).attr({
							fill: '#ddd',
							stroke: '#000',
							'stroke-width': 1
						});
					}
					else {
					}
				}
		}

		if (document.getElementById('metrics-button') !== null) {
			if (document.getElementById('metrics-button').value === 'Toggle Beat Symbol /') {
				document.getElementById('metrics-button').value = 'Toggle Beat Symbol @';
			}
			else if (document.getElementById('metrics-button').value === 'Toggle Beat Symbol @') {
				document.getElementById('metrics-button').value = 'Toggle Beat Symbol /';
			}
		}
	}

	setMetronome(event) {
		event.preventDefault();

		console.log('lsf:/lsf.js:setMetronome(): event =', event);

		if (document.getElementById('metronome-button') !== null) {
			let metronome_button = document.getElementById('metronome-button');
			let current_value = metronome_button.value;

			if (document.getElementById('metronome-sound-select') !== null) {
				var metronome_disabled = document.getElementById('metronome-sound-select');;
				document.getElementById('metronome-sound-select').disabled = false;
			}

			let bpm_input = document.getElementById("bpm-input");
			if (bpm_input !== null) {
				let output = document.getElementById("bpm-output");
				if (output!== null) {
					let bpm_input = document.getElementById('bpm-input');
					if (current_value === 'Metronome') {
						metronome_button.value = 'Start';
						bpm_input.disabled = false;
						output.innerHTML = bpm_input.value + ' bpm';
						// Update the current bpm_input value (each time you drag the bpm_input handle)
						bpm_input.oninput = function() {
							output.innerHTML = this.value + " bpm";
						}

						let click_sound = './sounds/bell.mp3';
						if (document.getElementById('metronome-sound-select') !== null) {
							click_sound = document.getElementById('metronome-sound-select').value;
							if (click_sound === 'Click') {
								click_sound = './sounds/click.wav';
							}
							else if (click_sound === 'Banjo') {
								click_sound = './sounds/banjo.mp3';
							}
							else if (click_sound === 'Bell') {
								click_sound = './sounds/bell.mp3';
							}
							else if (click_sound === 'Woodblock') {
								click_sound = './sounds/Woodblock.mp3';
							}
						}
						lsf.metronome = new Tone.Player(click_sound).toMaster();
					}
					else if (current_value === 'Start') {
						// The transport is capable of any time signature, but the value
						// will be reduced to a number over 4. So for example, 4/4 time
						// would be set as just 4, and 6/8 time would be set as 3.
						if (song.header.time_signature === '4/4') {
							Tone.Transport.timeSignature = '4';
						}
						else if (song.header.time_signature === '3/4') {
							Tone.Transport.timeSignature = '3';
						}
						else if (song.header.time_signature === '2/4') {
							Tone.Transport.timeSignature = '2';
						}

						Tone.Transport.bpm.value = bpm_input.value;
						console.log('song.js: Tone.Transport.scheduleRepeat(): BPM =', Tone.Transport.bpm.value);

						Tone.Transport.scheduleRepeat(function(time) {
							//do something with the time
							console.log('song.js: Tone.Transport.scheduleRepeat(): time =', time);
							lsf.metronome.start(time);
						}, '8n', '1m');

						//start the Transport for the events to start
						Tone.Transport.start();

						metronome_button.value = 'Stop';
					}
					else if (current_value === 'Stop') {
						Tone.Transport.stop();
						metronome_button.value = 'Metronome';
						bpm_input.disabled = true;
						metronome_disabled.disabled = true;
						output.innerHTML = '';
					}
					else {
					}
				}
			}
		}
	}

	openShop(event) {
		console.log('lsf:/lachlan.js:openShop(): event =', event);

		if (lsf.songAction === 'Display Song') {
			song.printPage();
		}

		if (document.getElementById('app-content') !== null) {
			console.log('lsf:/lachlan.js:window.onload(): here =', lsf);

			var url = 'views/home.html';
			console.log('goToRoute(): url =', url);

			lsf.fetch(url, function(resp) {

				if (lsf.songAction !== 'Display Song') {
					document.getElementById('app-content').innerHTML = resp.responseText;
				}

//				if (document.getElementById('begin-song-button') !== null) {
//					document.getElementById('begin-song-button').addEventListener("click", lsf.getExistingSongData, true);
//				}
//
//				if (document.getElementById('save-song-button') !== null) {
//					document.getElementById('save-song-button').addEventListener("click", lsf.saveSong, true);
//				}

				// Set an event handleer for each form input element so we
				// are able to determine when to activate the "Begin" button.
				if (document.getElementById('song-metadata') !== null) {
					//let form = document.getElementById('song-metadata');
					let element_list = document.querySelectorAll('[data-type=header]');
					for (let i=0; i<element_list.length; i++) {
						let element_id = element_list[i].id;
						//console.log('lsf:/lachlan.js:window.onload(): element_id =', element_id);
						if (document.getElementById(element_id) !== null) {
							let element = document.getElementById(element_id);

							// Setup the focus even handler for this element.
							// The focus handler is used to print missing
							// input data error messages. And to enable the
							// begin button if all fields are filled in.
							element.addEventListener("blur", lsf.focusEventHandler, true);

						}
					}
				}
			});
		}
	}

	getSong(song_name) {
		if (song_name === 'Select Existing Song') {
			return;
		}
		console.log('lsf:/lachlan.js:getSong(): song_name:', song_name);

		if (document.getElementById('metronome-button') !== null) {
			document.getElementById('metronome-button').disabled = false;
		}

		let url = 'php/getsong.php?song-title=' + song_name;
		lsf.fetch(url, function(resp) {
			console.log('lsf:/lachlan.js:gerSong():fetch() resp =', resp.responseText);
			let json = JSON.parse(resp.responseText);
			console.log('lsf:/lachlan.js:gerSong():fetch() JSON =', json);
			if (json.status === 'ok') {
				console.log('lsf:/lachlan.js:gerSong():fetch() song =', json.song);

				let the_song = {};

				if (typeof json.song === 'string') {
					the_song = JSON.parse(json.song);
					/*
					let str = json.song;
					console.log('lsf:/lachlan.js:gerSong():fetch() typeof str =', typeof str);
					let the_song = JSON.parse(str)
					*/
					console.log('lsf:/lachlan.js:gerSong():fetch() typeof the_song =', typeof the_song);
				}
				else {
					the_song = JSON.parse(json.song);
				}

				song.openPage(lsf, the_song, lsf.songFormat, true);

				if (document.getElementById('begin-save-button') !== null) {
					document.getElementById('begin-save-button').style.visibility = 'visible';
				}
			}
		});
	}
	//var setSongAction = import(setSongAction) from "./setSongAction.js";
}

var events = new eventHandler();
console.log('JSN:/lsf.js: eventHandler =', events);
//Object.freeze(lsf);
export { events };
//export { events.setSongAction } from "./setSongAction.js";

