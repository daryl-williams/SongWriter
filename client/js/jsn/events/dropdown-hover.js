/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/events/dropdown-hover.js
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

export function dropDownHover(event) {
	/*
	 * This method is called when a change event has occured on the select-action element with id=select-action.
	 */
	//console.log('jsn:/client/js/events/dropdown-hover.js:dropDownHover(): event =', event);

//	let str = event.target.children[1].children[2].textContent.trim().substring(0, 4);
//	if (!str == 'Open') {
//		return;
//	}

	event.preventDefault();

	if (event.type === 'mouseenter') {
		event.target.children[1].classList.replace('hide', 'show');
	}
	else if (event.type === 'mouseleave') {
		event.target.children[1].classList.replace('show', 'hide');
	}
	else {
		console.log('jsn:/client/js/events/dropdown-hover.js:dropDownHover(): ERROR: unknown mouse event =', event.type);
	}
}

