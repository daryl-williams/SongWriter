/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/events/select-chord-click-handler.js
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

export function selectChordClickHandler(event) {
	/*
	 * This method is called when <TODO>
	 */
	console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): event.target.id =', event.target.id);

	console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): event =', event);

	event.preventDefault();

	if (event.target.id.substring(0, 9) === 'chord-div') {
		// A chord container has been selected, and should be followed by a chord selection handled in the else below.
		jsn.meta.chord_target_div = event.target.id;
		if (document.getElementById(event.target.id) !== null) {
			document.getElementById(event.target.id).classList.toggle('selected-chord-div');
		}
		return;
	}
	else {
		// A chord has been selected, now we need to get the chord name and insert it as innerHTML to the div chosen above.
		console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): >>> event.target.nodeName =', event.target.nodeName);

		function replacer(match, measure, beat, offset, str) {
			return [measure-1, beat-1];
		}

		if (event.target.id === 'chord-delete-button') {
			const div_id = jsn.meta.chord_target_div;
			const measure_beat = div_id.replace(/chord-div_bar([\d]+)-beat([\d]+)$/, replacer);
			console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): measure =', measure_beat);

			const mblist = measure_beat.split(',');
			let measure = mblist[0];
			let beat = mblist[1];
			console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): measure =', measure);
			console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): beat =', beat);

			jsn.song.body[measure][beat].chord = '';
			if (document.getElementById(div_id)) {
				document.getElementById(div_id).innerHTML = '';
			}
		}
		else {
			let chord_name;

			if (event.target.nodeName === 'svg') {
				chord_name = event.target.id;
			}
			else {
				chord_name = event.target.parentElement.id;
			}
			console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): chord_container =', chord_name);

			let div_id = jsn.meta.chord_target_div;

			if (document.getElementById(div_id) !== null) {
				chord_name = chord_name.substring(6);
				chord_name = chord_name.replace(/(.*?)\sdominant7/, '$17'); // We'll remove "dominant" string from name of major chords.
				chord_name = chord_name.replace(/(.*?)\smaj/, '$1'); // We'll remove "maj" string from name of major chords.
				chord_name = chord_name.replace(/(\w)\smin/, '$1m'); // Standardize the minor chord name to just lowercase m.
				document.getElementById(div_id).innerHTML = chord_name; 
				document.getElementById(div_id).style.backgroundColor = "#fff";
				jsn.meta.chord_target_div = '';

				let measure_beat = div_id.replace(/chord-div_bar([\d]+)-beat([\d]+)$/, replacer);
				console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): measure =', measure_beat);

				const mblist = measure_beat.split(',');
				let measure = mblist[0];
				let beat = mblist[1];
				console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): measure =', measure);
				console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): beat =', beat);

				jsn.song.body[measure][beat].chord = chord_name;
			}
		}

		/*
		if (document.getElementById('chords-container') !== null) {
			document.getElementById('chords-container').style.visibility = 'visible';
		}

		if (parent_el.id === 'chords-family') {
			console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): chords-family =', parent_el.id);
			if (document.getElementById(jsn.meta.selected_cell) !== null) {
				let chord_name = event.target.id.substring(6);
				chord_name = chord_name.replace(/(.*?)\smaj/, '$1'); // We'll remove "maj" string from name of major chords.
				chord_name = chord_name.replace(/(\w)\smin/, '$1m'); // Standardize the chord names.
				document.getElementById(jsn.meta.selected_cell).innerHTML = chord_name; 
				document.getElementById('chords-container').style.visibility = 'hidden';
				jsn.meta.selected_cell = '';
			}
		}
		else if (parent_el.id === 'chords-additional') {
			console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): chords-additional =', parent_el.id);
		}
		else {
			jsn.meta.selected_cell = event.target.id
			console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): ELSE chord parent =', parent_el.id);
		}

			let measure = div_id.replace(/chord-div_bar([\d]+)-.*$/, replacer);
			let beat = div_id.substring(13, 1);

			//jsn.song.body[
		}

		/*
		if (document.getElementById('chords-container') !== null) {
			document.getElementById('chords-container').style.visibility = 'visible';
		}

		if (parent_el.id === 'chords-family') {
			console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): chords-family =', parent_el.id);
			if (document.getElementById(jsn.meta.selected_cell) !== null) {
				let chord_name = event.target.id.substring(6);
				chord_name = chord_name.replace(/(.*?)\smaj/, '$1'); // We'll remove "maj" string from name of major chords.
				chord_name = chord_name.replace(/(\w)\smin/, '$1m'); // Standardize the chord names.
				document.getElementById(jsn.meta.selected_cell).innerHTML = chord_name; 
				document.getElementById('chords-container').style.visibility = 'hidden';
				jsn.meta.selected_cell = '';
			}
		}
		else if (parent_el.id === 'chords-additional') {
			console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): chords-additional =', parent_el.id);
		}
		else {
			jsn.meta.selected_cell = event.target.id
			console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): ELSE chord parent =', parent_el.id);
		}

			function replace_measure(match, p1, offset, str) {
				return [p1];
			}

			let measure = div_id.replace(/chord-div_bar([\d]+)-.*$/, replacer);
			let beat = div_id.substring(13, 1);

			//jsn.song.body[
		}

		/*
		if (document.getElementById('chords-container') !== null) {
			document.getElementById('chords-container').style.visibility = 'visible';
		}

		if (parent_el.id === 'chords-family') {
			console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): chords-family =', parent_el.id);
			if (document.getElementById(jsn.meta.selected_cell) !== null) {
				let chord_name = event.target.id.substring(6);
				chord_name = chord_name.replace(/(.*?)\smaj/, '$1'); // We'll remove "maj" string from name of major chords.
				chord_name = chord_name.replace(/(\w)\smin/, '$1m'); // Standardize the chord names.
				document.getElementById(jsn.meta.selected_cell).innerHTML = chord_name; 
				document.getElementById('chords-container').style.visibility = 'hidden';
				jsn.meta.selected_cell = '';
			}
		}
		else if (parent_el.id === 'chords-additional') {
			console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): chords-additional =', parent_el.id);
		}
		else {
			jsn.meta.selected_cell = event.target.id
			console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): ELSE chord parent =', parent_el.id);
		}
		*/
	}
}

