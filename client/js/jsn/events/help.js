/*
 * This file is part of SongWriter, A song notation and editing tool.
 *
 * jsn:/client/js/index.js
 *
 * Copyright (C) 2019,2020,  Daryl P. Williams
 * 
 * SongWriter is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 * 
 * SongWriter is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * 
 * You should have received a copy of the GNU Affero General Public License
 * along with SongWriter.  If not, see <https://www.gnu.org/licenses/>.
 */

'use strict';

import { jsn } from '../index.js';

export function getHelp(event) {
	/*
	 * This method is called when ta help option has been selected.
	 */
	console.log('jsn:/client/js/events/help.js:getHelp(): event =', event);

	event.preventDefault();

	if (event.target.classList.contains('disabled')) {
		return;
	}

	const action = event.target.innerText.toLowerCase();

	if (action === 'about') {
		console.log('jsn:/client/js/events/help.js:getHelp(): help action =', action);
	}
	else if (action === 'documentation') {
		console.log('jsn:/client/js/events/help.js:getHelp(): help action =', action);
	}
	else if (action === 'license') {
		console.log('jsn:/client/js/events/help.js:getHelp(): help action =', action);
	}
	else {
		alert('Unknown Help action = ' + event.target.innerText);
		console.log('jsn:/client/js/events/help.js:getHelp(): ERROR: unknown action =', event.target.innerText);
		return;
	}

	//event.target.parentElement.style.visibility = 'hidden';

	if (document.getElementById('help-window') !== null) {

		const getHelp = async function(url) {
			let options = {
				method: "GET",
			};
			let help = await jsn.dispatch.get(url, 'html', options);
			console.log('jsn:/client/js/jsn/events/help.js:getHelp(): help =', help);
			if (document.getElementById('help-window-content') !== null) {
				document.getElementById('help-window-content').innerHTML = help;
			}
		}

		let url = '/api/1.0/help/' + action;
		getHelp(url);

		let vpy = window.innerWidth;
		let vpy_half_width = vpy / 2;

		let help_window_width = document.getElementById('help-window').offsetWidth;
		let half_width = help_window_width / 2;

		let left = vpy_half_width - half_width;

		if (document.getElementById('help-window-title') !== null) {
			//document.getElementById('help-window-title').innerHTML = 'Help JSON Song Notation';
			let title = 'SongWriter Help';
			if (action === 'about') {
				title = 'About SongWriter';
			}
			else if (action === 'documentation') {
				title = 'SongWriter Documentation';
			}
			else if (action === 'license') {
				title = 'SongWriter License';
			}
			document.getElementById('help-window-title').innerHTML = title;
		}

		document.getElementById('help-window').style.top = '100px';
		document.getElementById('help-window').style.left = left + 'px';
		document.getElementById('help-window').classList.replace('hide', 'show');


		if (document.getElementById('help-window-header') !== null) {
			// An event handler for the user to move the help-window.
			document.getElementById('help-window-header').addEventListener('click', jsn.events.dragWindow);
			console.log('jsn:/client/js/jsn/events/help.js:getHelp(): added click event handler to help-window-header =', document.getElementById('help-window-header'));
		}

		// Setup the click event handler for window close control.
		if (document.getElementById('help-window-close-controls') !== null) {
			document.getElementById('help-window-close-controls').addEventListener('click', function(event) {
				document.getElementById('help-window').classList.replace('show', 'hide');
			});
		}
	}
}

