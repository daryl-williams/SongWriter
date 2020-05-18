/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/index.js
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

import { jsn } from './jsn/index.js';
import { dropdownMenu } from './jsn/util/dropdown-menu.js';

window.onload = function() {

	//console.log('JSN:/client/js/index.js:window.onload(): >>> jsn =', jsn);
	
	jsn.song.header.key = 'C';
	jsn.addToChordsContainer();

//	Split(['#song-metadata', '.app-multiuse'], {
//		sizes: [20, 80],
//		minSize: 0,
//		direction: 'horizontal',
//	});

/*
	Split(['#preferences-container', '#chords-container'], {
		sizes: [0, 75],
		minSize: 0,
		direction: 'horizontal',
		onDragStart: function(event) {
			console.log('JSN:/client/js/index.js:window.onload()Split(): >>> drag start =', this);
			if (document.querySelector('#preferences-container') !== null) {
				document.querySelector('#preferences-container').style.visibility = 'visible';
			}
		}
	});
*/

	/*
	Split(['#app-console', '#song-content'], { 
		sizes: [23, 77],
		minSize: 0,
		direction: 'vertical',
	});
	*/

/*
	document.getElementById('chord-delete-button').addEventListener('click', function(event) {
		console.log('JSN:/client/js/index.js:window.onload(): chord-delete-button click handler =', event);
		const chord_div = jsn.meta.chord_target_div;
		if (document.getElementById(chord_div)) {
			document.getElementById(chord_div).innerHTML = '';
			const measure = 
		}
	});
*/
	document.getElementById('chord-delete-button').addEventListener('click', jsn.events.selectChordClickHandler);

	if (document.getElementById('song[number-of-bars]') !== null) {
		document.getElementById('song[number-of-bars]').addEventListener('blur', function(event) {
			jsn.meta.formDataIsReady = true;
			if (jsn.meta.formData.length == 5) {
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
					view_menu_items[i].addEventListener('click', jsn.events.setView);
				}
				jsn.display.jsnFormat();
			}
		});
		document.getElementById('song[number-of-bars]').addEventListener('focus', function(event) {
			jsn.meta.formDataIsReady = false;
		});
	}

	if (document.querySelector('#song-metadata-form') !== null) {
		const form = document.getElementById('song-metadata-form');
		for (let i=0, len=form.length; i<len; ++i) {
			form[i].addEventListener("input", jsn.events.formHandler);
//			elem => elem.addEventListener("blur", jsn.events.formHandler, false);
		}
	}

	if (document.querySelector('.splitter') !== null) {
		document.querySelector('.splitter').addEventListener("click", jsn.events.dragSplitter);

		document.querySelector('.fa-hand-o-left').addEventListener('click', function(event) {
			console.log('JSN:/client/js/index.js:window.onload() querySelector(.fa-jand-o-left) event: =',  event);
			document.querySelector('#preferences-container').classList.toggle('closed');
		});

		document.querySelector('.fa-hand-o-right').addEventListener('click', function(event) {
			console.log('JSN:/client/js/index.js:window.onload() querySelector(.fa-jand-o-right) event: =',  event);
			document.querySelector('#chords-container').classList.toggle('closed');
		});
	}

	if (document.getElementById('button-toggle-console') !== null) {
		document.getElementById('button-toggle-console').addEventListener('click', function(event) {
			jsn.toggleConsole();
		});
	}

	if (document.getElementsByClassName('dropdown-menu-container') !== null) {
		let elist = document.getElementsByClassName('dropdown-menu-container');
		for (let i=0, len=elist.length; i<len; i++) {
			elist[i].addEventListener("mouseenter", jsn.events.dropDownHover);
			elist[i].addEventListener("mouseleave", jsn.events.dropDownHover);
		}
	}

	if (document.getElementById('file-browser-open-file-button') !== null) {
		//document.getElementById('file-browser-open-file-button').addEventListener('click', jsn.events.openFile);
		document.getElementById('file-browser-open-file-button').addEventListener('click', jsn.events.selectSong);
	}

	// Get dropdown file-menu elements.
	const file_menu_items = document.querySelectorAll('.file-menu-item');
	//console.log('JSN:/client/js/index.js:window.onload(): >>> file_menu_items =', file_menu_items);
	for (let i=0, len=file_menu_items.length; i<len; i++) {
		//console.log('JSN:/client/js/index.js:window.onload(): >>> FILE_MENU ITEM =', file_menu_items[i]);

		if (typeof file_menu_items[i].id != 'undefined' && file_menu_items[i].id != 'recent-files-opened') {
			// We don't want the recent-files-opened element to respond to a click event
			// as it uses a mouse hover event to open the recent files opened menu.
			file_menu_items[i].addEventListener('click', jsn.events.setAction);
		}

		let submenu = '';
		let recent_songs = [];
		if (file_menu_items[i].innerHTML.indexOf('Open Recent') >= 0) {
			// Get recently opened file titles from local storage
			// and stash them in an unordered list and recent_files..
			let local_recent_songs = localStorage.getItem('songs');
			if (local_recent_songs === null) {
				console.log('JSN:/client/js/index.js:window.onload(): >>> NO song storage =', local_recent_songs);
			}
			else {
				let recent_files_div = document.getElementById('recent-files-opened');
				recent_files_div.classList.toggle('disabled');

				recent_songs = JSON.parse(localStorage.getItem('songs')).sort();
				//console.log('jsn:/client/js/jsn/events/openfile.js:openFile:getsong(): number of songs titles in local storage =', recent_songs.length);

				for (let ndx=0; ndx<recent_songs.length; ndx++) {
					let song_name = recent_songs[ndx];
					//console.log('JSN:/client/js/index.js:window.onload(): >>> GOT RECENT FILE['+i+'] =', song_name);
					let li = document.createElement('li');
					li.className = 'recent-file-item';
					li.innerText = song_name;

					//li.removeEventListener('click', jsn.events.setAction);
					//li.addEventListener('click', jsn.events.openFile);
					li.addEventListener('click', jsn.events.selectSong);
//					li.addEventListener('dblclick', jsn.events.selectSong);

					if (document.querySelector('.dropdown-submenu') !== null) {
						document.querySelector('.dropdown-submenu').appendChild(li);
						//console.log('JSN:/client/js/index.js:window.onload(): >>> APPENDED =', li);
					}
				}
			}

			// Now create the 'Open Recent' submenu...
/*
			if (document.getElementById('recent-files-opened') !== null) {
				document.getElementById('recent-files-opened').addEventListener('click', function(event) {
					console.log('JSN:/client/js/index.js:window.onload(): >>> RECENT FILES CLICKED =', event);

					let coords = file_menu_items[i].getBoundingClientRect();
					//console.log('JSN:/client/js/index.js:window.onload(): >>> COORDNATES =', coords);
					let submenu_x = coords.x + coords.width + 5;
					let submenu_y = coords.y;
					console.log('JSN:/client/js/index.js:window.onload(): >>> submenu_x =', submenu_x);
					console.log('JSN:/client/js/index.js:window.onload(): >>> submenu_y =', submenu_y);
				});
			}
*/
		}
	}

	// Get dropdown view-menu elements and attach an
	// event handler for click and doubleclick events.
	const view_menu_items = document.querySelectorAll('.view-menu-item');
	//console.log('JSN:/client/js/index.js:window.onload(): >>> view_menu_items =', view_menu_items);
	for (let i=0, len=view_menu_items.length; i<len; i++) {
		//console.log('JSN:/client/js/index.js:window.onload(): >>> view_menu_item['+i+'].classList =', view_menu_items[i].classList);
		if ( !view_menu_items[i].classList.contains('disabled') ) {
			//view_menu_items[i].addEventListener('click', jsn.events.setView);
			//view_menu_items[i].addEventListener('click', jsn.events.selectSong);
			//view_menu_items[i].addEventListener('dblclick', jsn.events.selectSong);
			view_menu_items[i].addEventListener('click', jsn.events.openFile);
			view_menu_items[i].addEventListener('dblclick', jsn.events.openFile);
		}
	}

	// Get tools dropdown menu option elements.
	const tools_menu_items = document.querySelectorAll('.tools-menu-item');
	//console.log('JSN:/client/js/index.js:window.onload(): >>> tools_menu_items =', tools_menu_items);
	for (let i=0, len=tools_menu_items.length; i<len; i++) {
		//console.log('JSN:/client/js/index.js:window.onload(): >>> tools_menu_items['+i+'].classList =', tools_menu_items[i].classList);
//		if (! tools_menu_items[i].classList.contains('disabled')) {
			tools_menu_items[i].addEventListener('click', jsn.events.metronomeHandler);
			let coords = tools_menu_items[i].getBoundingClientRect();
			//console.log('JSN:/client/js/index.js:window.onload(): >>> COORDNATES =', coords);
			let submenu_x = coords.x + coords.width + 5;
			let submenu_y = coords.y;
//		}
	}

	// Get dropdown help-menu elements.
	const help_menu_items = document.querySelectorAll('.help-menu-item');
	//console.log('JSN:/client/js/index.js:window.onload(): >>> help_menu_items =', help_menu_items);
	for (let i=0, len=help_menu_items.length; i<len; i++) {
		help_menu_items[i].addEventListener('click', jsn.events.getHelp);
	}

//	if (document.getElementById('select-action') !== null) {
//		document.getElementById('select-action').addEventListener('click', jsn.events.setAction);
//	}

/*
	if (document.getElementById('select-song') !== null) {
		document.getElementById('select-song').addEventListener('change', jsn.events.setSongName);
		// Fetch the list of existing song titles
		// to populate the #select-song select element.
		let url = '/api/1.0/getsongs';
		//console.log('JSN:/client/js/index.js:window.onload(): getsongs url =', url);
		fetch(url)
		.then (function(response) {
			if (response.status !== 200) {
				console.log('JSN:/lachlan.js:window.onload():fetch():Looks like there was a problem. Status Code: ' + response.status);
				return;
			}
			// Examine the text in the response
			response.json().then(function(data) {
				//console.log('JSN:/lachlan.js:window.onload():fetch(): raw SONGLIST =', data);
				if (data.status === 'ok') {
					if (document.getElementById('select-song') !== null) {
						let select = document.getElementById('select-song');
						for (let i=0, len=data.result.length; i<len; i++) {
							let title = data.result[i];
//							select.options[select.options.length] = new Option(title, title);
						}
					}
				}
			});
		})
		.catch(function(err) {
			console.log('JSN:/client/js/index.js:window.onload(): >>> ERROR: fetch error =', err);
		});
	}

	if (document.getElementById('song-format-button') !== null) {
		document.getElementById('song-format-button').addEventListener('click', jsn.events.setSongFormat);
	}

	if (document.getElementById('grid-column-select') !== null) {
		document.getElementById('grid-column-select').addEventListener('change', jsn.events.toggleGridColumns);
	}

	if (document.getElementById('pulse-symbol-button') !== null) {
		document.getElementById('pulse-symbol-button').addEventListener('click', jsn.events.toggleMetric);
	}

	if (document.getElementById('metronome-button') !== null) {
		document.getElementById('metronome-button').addEventListener('click', jsn.events.setMetronome);
	}

	if (document.getElementById('bpm-input') !== null) {
		document.getElementById('bpm-input').addEventListener('click', jsn.events.setBPM);
	}

	if (document.getElementById('metronome-sound-select') !== null) {
		document.getElementById('metronome-sound-select').addEventListener('click', jsn.events.setMetronomeSound);
	}
*/
}

//////////////////////

