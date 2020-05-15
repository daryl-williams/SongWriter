/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/events/selected-chord-click-handler.js
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

export function selectedChordClickHandler(event) {
	/*
	 * This method is called when ...
	 */
	console.log('jsn:/client/js/events/select-action.js:selectedChordClickHandler(): event =', event.target.id);

	event.preventDefault();

	jsn.meta.selected_cell = event.target.id

//			function(event) {
					console.log('jsn:/client/js/events/select-action.js:selectedChordClickHandler(): event =', event.target.id);
					let id = event.target.id;
					if (document.getElementById(id) !== null) {
						//let parent_id = document.getElementById('chords-family');
						let chord_svg = event.target;
						let chord_name = id.substring(6);
						// We'll remove "maj" string from name of major chords.
						chord_name = chord_name.replace(/(.*?)\smaj/, '$1');

						// Standardize the chord names.
						chord_name = chord_name.replace(/(\w)\smin/, '$1m');

						let selected_cell = jsn.meta.selected_cell;

						if (document.getElementById(selected_cell) !== null) {
							document.getElementById(selected_cell).innerHTML = chord_name;
						}

						//let chord_el = Raphael.chord(parent_id, chord_name, chord_name).element.setSize(75, 75);
						//document.getElementById(parent_id).innerHTML = chord_name;
						//document.getElementById('chords-container').style.display = 'none';
						document.getElementById('chords-container').style.visibility = 'hidden';
					}
//			});
}

