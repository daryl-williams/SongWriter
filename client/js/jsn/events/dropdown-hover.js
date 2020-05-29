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
	console.log('jsn:/client/js/events/dropdown-hover.js:dropDownHover(): event =', event.target.classList);

	let handleEvent = function(event_type, element, x, y) {
		if (event_type === 'mouseenter') {
			element.classList.replace('hide', 'show');
			if (x && y) {
				x += 'px';
//				y = (y+20) + 'px';
				y += 'px';
//				element.style.top = -10px;
//				element.style.left = y;
			}
		}
		else if (event_type === 'mouseleave') {
			element.classList.replace('show', 'hide');
		}
	}

	if (event.target.classList.contains('dropdown-menu-container')) {
		// We are hovering over a top-level toolbar menu item, i.e. File, View, etc.
		console.log('jsn:/client/js/events/dropdown-hover.js:dropDownHover(): stop here to debug child dropdown-menu =', event.target.children[1].classList);
		handleEvent(event.type, event.target.children[1]);
	}
	else if (event.target.classList.contains('submenu-parent')) {
		console.log('jsn:/client/js/events/select-view.js:setView(): stop here to debug submenu-parent =', event.target.classList);
		handleEvent(event.type, event.target.children[0], event.pageX, event.pageY);
	}
}

