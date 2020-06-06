/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/events/select-view.js
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

export function setView(event) {
	/*
	 * This method is called when a change event has occured on the select-action element with id=select-action.
	 */
	console.log('jsn:/client/js/events/select-view.js:setView(): event =', event);

	event.preventDefault();
	event.stopPropagation();

	if (event.target.innerText.substring(0, 7 )=== 'Display' || event.target.innerText.substring(0, 7 )=== 'Preview') {
		return;
	}

	let innerText = event.target.innerText;

console.log('jsn:/client/js/events/select-view.js:setView(): FOOBAR =', event.target.parentElement);

	if (event.target.parentElement.classList.contains('dropdown-submenu')) {
		console.log('jsn:/client/js/events/select-view.js:setView(): stop here to debug submenu =', innerText);
	}

	if (event.target.parentElement.classList.contains('show')) {
		// Close the submenu parent.
		event.target.parentElement.classList.replace('show', 'hide');
	}

	if (innerText === 'JSN Format' || innerText === 'LMSS Format') {
		console.log('jsn:/client/js/events/select-view.js:setView(): preview =', innerText);

		jsn.meta.previous_action = jsn.meta.action;
		jsn.meta.action = 'preview';

		if (document.getElementById('song-content') !== null) {
			document.getElementById('song-content').style.width = '8.5in';
			document.getElementById('song-content').style.height = '11in';
		}

		if (innerText === 'JSN Format') {
			jsn.meta.displayFormat = 'jsn';
			jsn.display.jsnFormat();
		}
		else if (innerText === 'LMSS Format') {
			jsn.meta.displayFormat = 'lmss';
			jsn.display.lmssFormat();
		}
		else {
			console.log('jsn:/client/js/events/select-view.js:setView(): ERROR - Unknown display format: ' + innerText);
			alert('Unknown display format: ' + innerText);
		}
	}
	else if (innerText.substring(0, 4) === 'Hide' || innerText.substring(0, 4) === 'Show') {
		jsn.meta.previous_action = jsn.meta.action;
		jsn.meta.action = innerText.toLowerCase();
		jsn.toggleConsole(event);
	}
	else if (innerText.substring(0, 4) === 'Auto') {
		jsn.meta.previous_action = jsn.meta.action;
		jsn.meta.action = 'display';
		jsn.controlPanel.view = 'auto-layout';
		jsn.meta.displayLayout = 'auto-layout';
		document.getElementById('song-grid').style.gridTemplateColumns='repeat(auto-fit, minmax(2in, auto))';
	}
	else if (innerText === '4 Columns') {
		jsn.meta.previous_action = jsn.meta.action;
		jsn.meta.action = 'display';
		jsn.controlPanel.view = '4-column';
		jsn.meta.displayLayout = '4-column';
		document.getElementById('song-grid').style.gridTemplateColumns='repeat(4, auto)';
	}
	else if (innerText === '5 Columns') {
		jsn.meta.previous_action = jsn.meta.action;
		jsn.meta.action = 'display';
		jsn.controlPanel.view = '5-column';
		jsn.meta.displayLayout = '5-column';
		document.getElementById('song-grid').style.gridTemplateColumns='repeat(5, auto)';
	}
	else if (innerText === '6 Columns') {
		jsn.meta.previous_action = jsn.meta.action;
		jsn.meta.action = 'display';
		jsn.controlPanel.view = '6-column';
		jsn.meta.displayLayout = '6-column';
		document.getElementById('song-grid').style.gridTemplateColumns='repeat(6, auto)';
	}
	else if (innerText === '8 Columns') {
		jsn.meta.previous_action = jsn.meta.action;
		jsn.meta.action = 'display';
		jsn.controlPanel.view = '8-column';
		jsn.meta.displayLayout = '8-column';
		document.getElementById('song-grid').style.gridTemplateColumns='repeat(8, auto)';
	}
	else {
		jsn.meta.previous_action = jsn.meta.action;
		console.log('jsn:/client/js/events/select-view.js:setView(): ERROR: unknown action =', innerText);
		alert('Unknown View action = ' + innerText);
		return;
	}

	console.log('jsn:/client/js/events/select-view.js:setView(): jsn.controlPanel.view =', jsn.controlPanel.view);
}

