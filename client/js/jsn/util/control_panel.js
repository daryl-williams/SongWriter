/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/util/control_panel.js
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

//import { song } from './song.js';
//import { editor } from './editor.js';
//console.log('jsn:/client/js/jsn/util/control_panel.js: >>> editor =', editor);

class ControlPanel {

	constructor() {
		//console.log('jsn:/client/js/jsn/util/control_panel.js:constructor() this =', this);

		if (!ControlPanel.instance) {
			this.metronome = {};
			this.action = 'Edit Song';
			this.songFormat = 'jsn';
			this.pulseSymbol = '/';
			this.songName = '';
			ControlPanel.instance = this;
			self = this;
		}
	}

/*
	editSong(song_name) {
		console.log('jsn:/client/js/jsn/util/control_panel.js:editSong(): this =', this);

		this.songName = song_name;
		editor.initSongMetaForm(song_name);
		return;

		let song_key       = 'not defined';
		let song_title     = 'not defined';
		let composer       = 'not defined';
		let capo_at_fret   = 'not defined';
		let time_signature  = 'not defined';
		let beats_per_bar  = 'not defined';
		let number_of_bars = 'not defined';

		let song_header = document.querySelectorAll('[data-type=header]');

		// Validate out input.
		let validInput = function(song_header) {
			let missing = [];
			let valid = true;
			for (let i=song_header.length-1; i>=0; i--) {
				// check if we have any empty required values...
				if (song_header[i].required && song_header[i].value === '') {
					valid = false;
					missing.push(song_header[i]);
					// We have an empty required value.
					let element_id = song_header[i].id;
					//console.log('jsn:/lachlan.js:openShop(): song_header[' + i + '].name =', song_header[i].name, ', REQUIRED =', song_header[i].required, ', value =', song_header[i].value);
					if (document.getElementById(element_id) !== null) {
						let flag = element_id + '.error';
						let reason = song_header[i].id + '.error-reason';
						if (document.getElementById(reason) !== null) {
							let eid = element_id.substring(5,element_id.indexOf(']')).replace(/-/g, ' ');
							let err_msg = eid + ' <span class="error-reason-text">is a required field.</span>';
							//console.log('jsn:/lachlan.js:openShop(): ERR_MSG =', err_msg);
							document.getElementById(reason).style.visibility = 'visible';
							document.getElementById(reason).innerHTML = err_msg;
						}
					}
				}
			}
			return valid;
		};

		if ( ! validInput(song_header) ) {
			return;
		}

		if (document.getElementById('song-metadata') !== null) {
			let form = document.getElementById('song-metadata');

			for (let i=form.elements.length-1; i>=0; i--) {
				// We don't need the submit button.
				if (form.elements[i].type === 'submit') continue;

				// Assign the element_id.
				let element_id = form.elements[i].id;

				// Assign the song header data.
				if (document.getElementById(element_id) !== null) {
					if (element_id === 'song[title]') {
						song_title = document.getElementById(element_id).value;
					}
					else if (element_id === 'song[composer]') {
						composer = document.getElementById(element_id).value;
					}
					else if (element_id === 'song[key]') {
						let select_box = document.getElementById(element_id); 
						song_key = select_box.options[select_box.selectedIndex].value;
					}
					else if (element_id === 'song[capo-at-fret]') {
						let select_box = document.getElementById(element_id); 
						capo_at_fret = select_box.options[select_box.selectedIndex].value;
					}
					else if (element_id === 'song[time-signature]') {
						let select_box = document.getElementById(element_id); 
						time_signature = select_box.options[select_box.selectedIndex].value;
						if (time_signature === '3/4') {
							beats_per_bar = 4;
						}
						else if (time_signature === '4/4') {
							beats_per_bar = 4;
						}
					}
					else if (element_id === 'song[number-of-bars]') {
						number_of_bars = document.getElementById(element_id).value;
					}
				}
			}
		}

		lsf.song.header.key = song_key;
		lsf.song.header.title = song_title;
		lsf.song.header.composer = composer;
		lsf.song.header.capo_at_fret = capo_at_fret;
		lsf.song.header.time_signature = time_signature;
		lsf.song.header.beats_per_bar = beats_per_bar;
		lsf.song.header.number_of_bars = number_of_bars;

		if (lsf.song.body.bar !== undefined) {
			let beat = [];
			for (let bar_ndx=0; bar_ndx<number_of_bars; bar_ndx++) {
				for (let beat_ndx=0; beat_ndx<beats_per_bar; beat_ndx++) {
					beat[beat_ndx] = {
						chord: '',
						measure: '',
						lyric: '',
					}
					lsf.song.body.bar[bar_ndx] = {beat: beat};
					console.log('jsn:/lachlan.js:beginSong(): bar['+bar_ndx+'] =', beat);
				}
			}
		}

		if (event.target.id === 'save-song-button') {
			lsf.saveSong();
		}
		else if (document.getElementById('app-content') !== null) {
			song.openPage(lsf, lsf.song, lsf.songFormat, false);
		}
		return false;
	}

	printPage(event) {
		console.log('jsn:/lachlan.js:printPage(): event =', event);

		if (document.getElementById('song-body') !== null) {
			document.getElementById('song-body').style.padding = '0px';
		}

		if (document.getElementById('song-grid') !== null) {
			document.getElementById('song-grid').style.gridTemplateColumns = '2in 2in 2in 2in';
		}

		if (document.getElementById('song-console') !== null && event !== undefined) {
			document.getElementById('song-console').style.display = 'none';
		}

		if (document.getElementById('song-header') !== null) {
			//document.getElementById('song-header').style.display = 'none';
			let html =  '<div style="margin:1em;">';
			html  += '<div>Title: ' + song.header.title + '</div>';
			html  += '<div>Written by: ' + song.header.composer + '</div>';
			html  += '<div>Key of: ' + song.header.key + '</div>';
			html  += '</div>';
			document.getElementById('song-header').innerHTML = html;
		}
		if (document.getElementById('song-body') !== null) {
			document.getElementById('song-body').style.marginLeft = '0px';
		}

		if (event !== undefined){
			window.print();
		}
	}

	fetch(url, callback, reqtype, data_str) {
		let request_type = 'GET';
		if (typeof reqtype !== 'undefined') {
			request_type = reqtype;
			var data = data_str;
		}

		var xhr = new XMLHttpRequest();
		xhr.open(request_type, url, true);
		if (request_type === 'post') {
			//Send the proper header information along with the request
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
		xhr.send(data);
		xhr.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				callback(this);
			}
		};
	}

	focusEventHandler(event) {
		// First we check if we should enable the begin button.
		let element_list =  document.querySelectorAll('[data-type=header]');
		let field_value_list = [];
		for (let j=0; j<element_list.length-1; j++) {
			console.log('jsn:/lachlan.js:window.onload(): element['+j+'].value =', element_list[j].value);
			if (element_list[j].value !== '' ) {
				field_value_list.push(element_list[j].value);
			}
		}
		if (field_value_list.length === 5) {
			if (document.getElementById('begin-save-button') !== null) {
				document.getElementById('begin-save-button').disabled = false;
				document.getElementById('begin-save-button').addEventListener("click", lsf.beginSong);
			}
		}

		let error_list = document.querySelectorAll('.error-reason');
		for (let j=0; j<error_list.length; j++) {
			let error_id = error_list[j].id;
			//console.log('jsn:/lachlan.js:window.onload(): error_id =', error_id);
			if (document.getElementById(error_id) !== null) {
				document.getElementById(error_id).style.visibility = 'hidden';
			}
		}
	}
*/
}

var controlPanel = new ControlPanel();
//console.log('jsn:/client/js/jsn/util/control_panel.js: controlPanel =', controlPanel);

//Object.freeze(lsf);
export { controlPanel };

