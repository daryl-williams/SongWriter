/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/events/editform-blur.js
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

export function editFormBlur(event) {
	event.preventDefault();
	/*
	 * This method is called when a change event has occured on the select-action element with id=select-action.
	 */
	console.log('jsn:/client/js/events/edit-form-events.js:editFormEventHandler(): event =', event);

	// First we check if we should enable the begin button.
	let element_list =  document.querySelectorAll('[data-type=header]');
	let field_value_list = [];
	for (let j=0; j<element_list.length-1; j++) {
		console.log('lsf:/lachlan.js:window.onload(): element['+j+'].value =', element_list[j].value);
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
		//console.log('lsf:/lachlan.js:window.onload(): error_id =', error_id);
		if (document.getElementById(error_id) !== null) {
			document.getElementById(error_id).style.visibility = 'hidden';
		}
	}
}

