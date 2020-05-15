/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/events/form-handler.js
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

export function formHandler(event) {
	/*
	 * This method is called when a change event has occured on the select input with id=select-song.
	 */
	event.preventDefault();
	console.log('jsn:/client/js/events/form-handler.js:formHandler(): jsn.song.body =', jsn.song.body);

	if (!jsn.meta.formData.includes(event.target.id)
		&& event.target.id !== 'song[tags]'
		&& event.target.id !== 'song[capo-at-fret]') {
		jsn.meta.formData.push(event.target.id);
	}

	if (event.target.id === 'song[title]') {
		jsn.song.header.title = event.target.value;
	}

	if (event.target.id === 'song[composer]') {
		jsn.song.header.composer = event.target.value;
	}

	if (event.target.id === 'song[key]') {
		const ndx = event.target.options.selectedIndex;
		const key = event.target.options[ndx].value;
		jsn.song.header.key = key;
		jsn.addToChordsContainer();
	}

	if (event.target.id === 'song[time-signature]') {
		const ndx = event.target.options.selectedIndex;
		const time_signature = event.target.options[ndx].value;
		jsn.song.header.time_signature = time_signature;
		jsn.song.header.beats_per_bar = parseInt(time_signature.substring(0, 1), 10);;
	}

	if (event.target.id === 'song[number-of-bars]') {
		const number_of_bars = parseInt(event.target.value, 10);
		jsn.song.header.number_of_bars = number_of_bars;
	}

	if (event.target.id === 'song[capo-at-fret]') {
		const capo_at_fret = event.target.value;
		jsn.song.header.capo_at_fret = capo_at_fret;
	}

	if (event.target.id === 'song[tags]') {
		jsn.song.header.tags = event.target.value;
	}

	if (jsn.meta.formData.length >= 5 && jsn.meta.formDataIsReady == true) {
		for (let i=0, len=jsn.meta.formData.length; i<len; ++i) {
			console.log('jsn:/client/js/events/form-handler.js:formHandler(): REQUIRED DATA:', jsn.meta.formData[i]);
		}

		// Now that we have a song we can turn on the save file option.
		if (document.getElementById('save-menu-option') !== null) {
			document.getElementById('save-menu-option').classList.toggle('disabled');
		}

		// And the rest of the view menu options.
		const view_menu_items = document.querySelectorAll('.view-menu-item');
		for (let i=0, len=view_menu_items.length; i<len; ++i) {
			if (view_menu_items[i].id != 'viewmenu-toggle-console') {
				view_menu_items[i].classList.toggle('disabled');
			}
		}

console.log('jsn:/client/js/events/form-handler.js:formHandler(): jsn.song.body =', jsn.song.body);
//		jsn.display.jsnFormat();
	}
}

