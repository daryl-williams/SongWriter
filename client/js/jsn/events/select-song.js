/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/events/select-song.js
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

export function selectSong(event) {
	/*
	 * This method is called when <TODO>
	 */
	console.log('jsn:/client/js/events/select-action.js:selectSong(): event.type =', event.type);
	console.log('jsn:/client/js/jsn/display/file-browser.js:fileBrowser(): SONG CLICKED =', event.target.innerText);

	event.preventDefault();

	let get_songtitle = function(el) {
		if (el.innerText === '') {
			alert('Please select a song to open.');
			return;
		}
		else {
			return el.innerText;
		}
	}

	jsn.meta.action = 'edit';
	let song_name = undefined;

	if (event.type == 'click') {
		// The submit button was pressed now we want
		// to find the element with class: selected-song.
		if (event.target.type == 'submit') {
			// The submit button was pressed now we want
			// to find the element with class: selected-song.
			if (document.querySelector('.selected-song')) {
				// We found it, so continue on...
				song_name = get_songtitle(document.querySelector('.selected-song'));
			}
			else {
				alert('You must first select a song to open.');
				return;
			}
		}
		else {
			if (event.target.classList.contains('song-list-item')) {
				event.target.classList.add('selected-song');
				return;
			}
			else {
				song_name = get_songtitle(event.target);
			}
		}
	}
	else if (event.type == 'dblclick') {
		if (event.target.type != 'submit') {
			song_name = get_songtitle(event.target);
		}
	}

	// By now we should have our song_name.
	console.log('jsn:/client/js/events/openfile.js:openFile(): song_name =', song_name);

	//event.target.parentElement.classList.replace('show', 'hide');
	event.target.parentElement.style.visibility = 'hidden';

	jsn.openFile(song_name);
}

