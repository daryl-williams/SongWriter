/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/index.js
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

import { openFile }     from './util/openfile.js';
import { saveSong }      from './util/save-song.js';
import { display }      from './display/index.js';
import { events }       from './events/index.js';
import { dispatch }     from './util/dispatch.js';
import { toggleConsole } from './util/toggle-console.js';
import { controlPanel } from './util/control_panel.js';

class jsnApp {

	constructor() {
		//console.log('jsn:/client/js/jsn/jsn.js:constructor() this =', this);
		
		window.addEventListener("afterprint", function(event) {
			console.log('jsn:/client/js/jsn/jsn.js:constructor() afterprint event =', event);
		}, false);
		
		window.addEventListener("beforeprint", function(event) {
			console.log('jsn:/client/js/jsn/jsn.js:constructor() beforeprint event =', event);
		}, false);

		if (!jsnApp.instance) {
			this.doubleTime = false;
			this.openFile = openFile;
			this.saveSong = saveSong;
			this.toggleConsole = toggleConsole;
			this.display = display;
			this.events = events;
			this.dispatch = dispatch;
			this.controlPanel = controlPanel;
			this.player = {};
			this.metronome = {};
			this.meta = {
				action: null,
				previous_action: null,
				// Implementation specific.
				paper : '',
				outputFormat  : '',
				pulseHide    : '',
				pulseSlash   : '',
				pulseCircle  : '',
				pulseCurrent : '',
				pulseSymbol: '/',
				chord_target_div: '',
				tagList: {},
				songList: {},
				formData: [],
				formDataIsReady: false,
				displayFormat: 'jsn',
			};
			this.song = {
				header: {
					key            : '',
					tags           : '',
					title          : '',
					composer       : '',
					capo_at_fret   : '',
					time_signature : '',
					beats_per_bar  : 0,
					number_of_bars : 0,
				},
				body: [
					[],
				],
			};
			jsnApp.instance = this;
		}
//		console.log('jsn:/client/js/jsn/jsn.js:constructor() this.getsongs.byTag =', this.getsongs.byTag());
	}

	addToChordsContainer() {
		let scale_degree = [ 'maj', 'min', 'min', 'maj', 'maj', 'min', 'dim', ];
		let key = jsn.song.header.key;
		let root = teoria.note(key);
		let scale = root.scale('major').simple();

		if (document.getElementById('chords-container') !== null) {
			let chord_win = document.getElementById('chord-family');
			chord_win.innerHTML = '';

			let chord_el;

			for (let i=scale_degree.length-1; i>=0; i--) {
				//console.log('jsn:/client/js/jsn/index.js:addToChordsContainer(): note =', scale[i] + ', scale_degree['+i+'] =', scale_degree[i]);
				let chord_name = scale[i].toUpperCase() + ' ' + scale_degree[i];
				//console.log('jsn:/client/js/jsn/index.js:addToChordsContainer(): note =', scale[i] + ', chord_name =', chord_name);

				// Width and Height are the chord dimensions.
				let width  = 75;
				let height = 75;

				chord_el = Raphael.chord(chord_win, chord_name, chord_name).element.setSize(width, height);
				//console.log('jsn:/client/js/jsn/index.js:addToChordsContainer(): chord_el =', chord_el);

				chord_el.canvas.id = 'chord-' + chord_name;

				chord_el.canvas.style.cursor = 'pointer';

				chord_el.canvas.addEventListener("click", jsn.events.selectChordClickHandler);
			}

			chord_el = null;
			chord_win = null;
		}

		if (document.getElementById('chords-additional') !== null) {
			let chords_additional = document.getElementById('chords-additional');

			let chromatic = root.scale('chromatic').simple();
			//console.log('jsn:/client/js/jsn/index.js:addToChordsContainer(): chromatic =', chromatic);

			let chord_mode = [ 'maj', 'dominant7', 'maj7', 'min', 'dim', 'aug', 'sus2', ];

			for (let i=0,len=chromatic.length; i<len; i++) {
				if (chromatic[i].length === 1) {
					//console.log('jsn:/client/js/jsn/index.js:addToChordsContainer(): NOTE =', chromatic[i]);
					let root = teoria.note(chromatic[i]);
					//console.log('jsn:/client/js/jsn/index.js:addToChordsContainer(): NOTE =', root);
					let len = chord_mode.length - 1;
					let width  = 75;
					let height = 75;
					for (let j=len; j>=0; j--) {
						//console.log('jsn:/client/js/jsn/index.js:addToChordsContainer(): >>> note =', chromatic[i] + ', chord_mode['+j+'] =', chord_mode[j]);
						let chord_name = chromatic[i].toUpperCase() + ' ' + chord_mode[j];
						//console.log('jsn:/client/js/jsn/index.js:addToChordsContainer():  chord_name =', chord_name);

						let chord_el;
						// Below is a hack to display the dominant 7 of this chord row.
						// because I don't know the right name to use in the chord_mode array above.
						if (chord_mode[j] === 'dominant7') {
							let dom7 = chromatic[i].toUpperCase() + ' 7'; 
							chord_el = Raphael.chord(chords_additional, dom7, dom7).element.setSize(width, height);
						}
						else {
							chord_el = Raphael.chord(chords_additional, chord_name, chord_name).element.setSize(width, height);
						}
						chord_el.canvas.id = 'chord-' + chord_name;
						chord_el.canvas.style.cursor = 'pointer';

						//chord_el.canvas.addEventListener("click", jsn.events.selectedChordClickHandler);
						chord_el.canvas.addEventListener("click", jsn.events.selectChordClickHandler);
					}
				}
			}
		}
	}

	makeChordPopup() {
		let scale_degree = [ 'maj', 'min', 'min', 'maj', 'maj', 'min', 'dim', ];
		let key = jsn.song.header.key;
		let root = teoria.note(key);
		let scale = root.scale('major').simple();

		if (document.getElementById('chord-popup') !== null) {
			if (document.getElementById('chord-family') !== null) {
				if (document.getElementById('chord-family-title') !== null) {
					//document.getElementById('chord-family-title').innerHTML = '<div id="family-title">Chord Scale Family</div>';
					document.getElementById('chord-family-title').innerHTML = 'Chord Scale Family';
				}
				let popup = document.getElementById('chord-family');

				//console.log('lsf:/song.js:openPage(): KEY =', key);

				for (let i=scale_degree.length-1; i>=0; i--) {
					//console.log('lsf:/song.js:openPage(): note =', scale[i] + ', scale_degree['+i+'] =', scale_degree[i]);
					let chord_name = scale[i].toUpperCase() + ' ' + scale_degree[i];
					//console.log('lsf:/song.js:openPage(): chord_name =', chord_name);

//				let chord_div = document.createElement('div');
//				chord_div.className = 'chord-div';

					let width  = 100;
					let height = 100;
					let chord_el = Raphael.chord(popup, chord_name, chord_name).element.setSize(width, height);
					chord_el.canvas.id = 'chord-' + chord_name;

//				document.getElementById('chord-family').appendChild(chord_div);

					//chord_el.canvas.className += ' chord-family';
					chord_el.canvas.style.cursor = 'pointer';
//				chord_div.style.cursor = 'pointer';

					chord_el.canvas.addEventListener("click", function(event) {
						//console.log('lsf:/song.js:openPage(): >>> chord_el EVENT =', event);
						let id = event.target.id;
						if (document.getElementById(id) !== null) {
							let parent_id = document.getElementById(songHelper.chord_target_div).id;
							let chord_svg = document.getElementById(parent_id);
							if (document.getElementById(parent_id) !== null) {
								let chord_name = id.substring(6);
								// We'll remove "maj" string from name of major chords.
								chord_name = chord_name.replace(/(.*?)\smaj/, '$1');

								// Standardize the chord names.
								chord_name = chord_name.replace(/(\w)\smin/, '$1m');

								//let chord_el = Raphael.chord(parent_id, chord_name, chord_name).element.setSize(75, 75);
								document.getElementById(parent_id).innerHTML = chord_name;
								document.getElementById('chord-popup').style.display = 'none';
								let bar = {
									chord_name: chord_name,
								};
								//song.body.bar.push(bar);
							}
						}
					});
					//console.log('lsf:/song.js:openPage(): chord_el =', chord_el);
				}
			}
		}

		if (document.getElementById('chord-more') !== null) {
			let chord_more = document.getElementById('chord-more');

			if (document.getElementById('chord-more-title') !== null) {
				document.getElementById('chord-more-title').innerHTML = 'More Chords';
			}
			let chromatic = root.scale('chromatic').simple();
			//console.log('lsf:/song.js:openPage(): chromatic =', chromatic);

			let popup = document.getElementById('chord-more');

			let chord_mode = [ 'maj', 'dominant7', 'maj7', 'min', 'dim', 'aug', 'sus2', ];

			for (let i=0,len=chromatic.length; i<len; i++) {
				if (chromatic[i].length === 1) {
					//console.log('lsf:/song.js:openPage(): >>> NOTE =', chromatic[i]);
					let root = teoria.note(chromatic[i]);
					//console.log('lsf:/song.js:openPage(): >>> ROOT =', root);
					let len = chord_mode.length - 1;
					let width  = 100;
					let height = 100;
					for (let j=len; j>=0; j--) {
						//console.log('lsf:/song.js:openPage(): note =', chromatic[i] + ', chord_mode['+j+'] =', chord_mode[j]);
						let chord_name = chromatic[i].toUpperCase() + ' ' + chord_mode[j];
						//console.log('lsf:/song.js:openPage(): chord_name =', chord_name);

						//Raphael.chord(chord_beat, chord_name, chord_name).element.setSize(110, 110);
						let chord_el;
						// Below is a hack to display the dominant 7 of this chord row.
						// because I don't know the right name to use in the chord_mode array above.
						if (chord_mode[j] === 'dominant7') {
							let dom7 = chromatic[i].toUpperCase() + ' 7'; 
							chord_el = Raphael.chord(chord_more, dom7, dom7).element.setSize(width, height);
						}
						else {
							chord_el = Raphael.chord(chord_more, chord_name, chord_name).element.setSize(width, height);
						}
						chord_el.canvas.id = 'chord-' + chord_name;
						chord_el.canvas.style.cursor = 'pointer';

						chord_el.canvas.addEventListener("click", function(event) {
							//console.log('lsf:/song.js:openPage(): >>> chord_el EVENT =', event);
							if (document.getElementById('chords-container') !== null) {
								document.getElementById('chords-container').style.visibility = 'visible';
							}
						});
					}
				}
			}
		}
	}

	launch(song_name) {
		//console.log('jsn:/client/js/jsn/index.js:open(): song_name =', song_name);
		//console.log('jsn:/client/js/jsn/index.js:open(): THIS =', this);

		if (jsn.controlPanel.action === 'edit' && jsn.controlPanel.songName === '') {
			if (document.getElementById('select-song') !== null) {
				document.getElementById('select-song').disabled = false;
			}
			return;
		}

		if (song_name) {
			console.log('jsn:/client/js/jsn/index.js:open(): edit existing song =', song_name);

			const getsong = async function(url) {
				let json = await jsn.dispatch.get(url, 'json');
				//console.log('jsn:/client/js/jsn/index.js:open(): JSON typeof response =', typeof json);
				jsn.song = JSON.parse(json);
				//console.log('jsn:/client/js/jsn/index.js:open(): JSON json_song =', jsn.song);

				// This seems like a good place to populate the chord popup info.
				//jsn.makeChordPopup();
				jsn.addToChordsContainer();

				if (jsn.controlPanel.action === 'edit') {
					if (document.getElementById('form-container') !== null) {
						document.getElementById('form-container').innerHTML = jsn.meta.editForm;
					}
				}
				display.jsnFormat();
			};

			let url = '/api/1.0/getsong/' + song_name;
			getsong(url);
		}
		else {
			console.log('jsn:/client/js/jsn/index.js:open(): start new song ...');
		}
	}
}

var jsn = new jsnApp();
console.log('jsn:/client/js/jsn/jsn.js: jsn =',  jsn);

export { jsn };

