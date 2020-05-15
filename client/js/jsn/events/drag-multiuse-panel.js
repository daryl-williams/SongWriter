/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/events/drag-multiuse-panel.js
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

export function dragSplitter(event) {

	console.log('jsn:/client/js/jsn/events/drag-file-browser.js:dragSplitter() event =', event);

	// Make the DIV element draggable:
	let splitter = document.querySelector(".splitter");
	dragElement(splitter);

	function dragElement(elmnt) {
		var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

		elmnt.onmousedown = dragMouseDown;

		function dragMouseDown(e) {
			e = e || window.event;
			e.preventDefault();

			// get the mouse cursor position at startup:
			pos3 = e.clientX;
			pos4 = e.clientY;
			console.log('jsn:/client/js/jsn/events/drag-file-browser.js:dragSplitter() starting X =', pos3);
			console.log('jsn:/client/js/jsn/events/drag-file-browser.js:dragSplitter() starting Y =', pos4);

			document.onmouseup = closeDragElement;
			// call a function whenever the cursor moves:
			document.onmousemove = elementDrag;
		}

		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();

			// calculate the new cursor position:
			pos1 = pos3 - e.clientX;
			pos2 = pos4 - e.clientY;
			pos3 = e.clientX;
			pos4 = e.clientY;

			//console.log('jsn:/client/js/jsn/events/drag-file-browser.js:dragSplitter() new X =', pos1);
			console.log('jsn:/client/js/jsn/events/drag-file-browser.js:dragSplitter() new Y =', pos2);

			// set the element's new position:
			//elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
			elmnt.style.left = (elmnt.left - pos1) + "px";
		}

		function closeDragElement() {
			// stop moving when mouse button is released:
			document.onmouseup = null;
			document.onmousemove = null;
		}
	}
}

