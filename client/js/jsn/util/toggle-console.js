/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/util/toggle-console.js
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

export function toggleConsole(event) {
	console.log('jsn:/client/js/util/toggle-console.jstoggleConsole(): TOGGLE!');

	//if (event.target.id === 'button-toggle-console') 
	if ((event.target.classList.contains('fa-toggle-on') || event.target.classList.contains('fa-toggle-off')) || (event.target.classList.contains('console-toggle'))) {
		if (document.getElementById('button-toggle-console') !== null) {
			let el = document.getElementById('button-toggle-console');
			console.log('jsn:/client/js/util/toggle-console.jstoggleConsole(): button-toggle-console =', el);
			console.log('jsn:/client/js/util/toggle-console.jstoggleConsole(): el.innerHTML =', el.innerHTML);
			if (/Hide Console/.test(el.innerHTML)) {
				// Hide the console.
				document.querySelector('#app-console').classList.toggle('hide');
//				document.querySelector('#song-metadata').classList.toggle('closed');

				// Change the labels of the toggle items.
				document.getElementById('button-toggle-console').innerHTML = '<i class="fa fa-toggle-on"></i> Show Console';
				document.getElementById('viewmenu-toggle-console').innerHTML = 'Show Console';
			}
			else if (/Show Console/.test(el.innerHTML)) {
				// Show the console.
				//document.querySelector('.app-console').style.display = 'flex';
				document.querySelector('#app-console').classList.toggle('hide');
//				document.querySelector('#song-metadata').classList.toggle('closed');
				// Change the labels of the toggle items.
				document.getElementById('button-toggle-console').innerHTML = '<i class="fa fa-toggle-off"></i> Hide Console';
				document.getElementById('viewmenu-toggle-console').innerHTML = 'Hide Console';
			}
		}
	}
	else if (event.target.id === 'viewmenu-toggle-console') {
		if (document.getElementById('viewmenu-toggle-console') !== null) {
			let el = document.getElementById('viewmenu-toggle-console');
			console.log('jsn:/client/js/util/toggle-console.jstoggleConsole(): viewmenu-toggle-console =', el);
			console.log('jsn:/client/js/util/toggle-console.jstoggleConsole(): el.innerHTML =', el.innerHTML);
			if (/Hide Console/.test(el.innerHTML)) {
				// Hide the console.
				//document.querySelector('.app-console').style.display = 'none';
				document.querySelector('#app-console').classList.toggle('hide');
				// Change the labels of the toggle items.
				document.getElementById('viewmenu-toggle-console').innerHTML = 'Show Console';
//				document.getElementById('button-toggle-console').value = 'Show Console';
//				document.getElementById('button-toggle-console').innerHTML = '<i class="fa fa-toggle-on"></i> Show Console';
			}
			else if (/Show Console/.test(el.innerHTML)) {
				// Hide the console.
				//document.querySelector('.app-console').style.display = 'flex';
				// Change the labels of the toggle items.
				document.getElementById('viewmenu-toggle-console').innerHTML = 'Hide Console';
//				document.getElementById('button-toggle-console').value = 'Hide Console';
//				document.getElementById('button-toggle-console').innerHTML = '<i class="fa fa-toggle-off"></i> Hide Console';
				//document.querySelector('.app-console').style.display = 'flex';
				document.querySelector('#app-console').classList.toggle('hide');
			}
		}
	}
	else {
		console.log('jsn:/client/js/util/toggle-console.jstoggleConsole(): ERROR: unknown event.target =', event.target);
	}

	return;
}

