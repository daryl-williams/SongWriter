/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/util/openfile.js
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

export function openFile(song_name) {
	/*
	 * This method is called when a file has been selected from the
	 * file-browser menu as well as from the recently opened file menu option.
	 */
	console.log('jsn:/client/js/util/openfile.js:openFile(): song_name =', song_name);

	if (song_name == '' || song_name == null) {
		alert('Please select a song to open.');
		return;
	}

	// Make sure the selected song is in local storage
	// so it can be used by the Recent Files submenu.
	let recent_songs = [];

	if (localStorage.getItem('songs') !== null) {
		recent_songs = JSON.parse(localStorage.getItem('songs'));
		console.log('jsn:/client/js/jsn/util/openfile.js:openFile:getsong(): number of recent_songs titles in local storage =', recent_songs.length);
	}
	if (recent_songs.includes(song_name) === false) {
		recent_songs.push(song_name);
	}
	localStorage.setItem('songs', JSON.stringify(recent_songs));

	let recent_files_div = document.getElementById('recent-files-opened');
	if (recent_files_div.classList.contains('disabled')) {
		recent_files_div.classList.remove('disabled');
	}

//	let recent_songs = JSON.parse(localStorage.getItem('songs'));
	//console.log('jsn:/client/js/jsn/events/openfile.js:openFile:getsong(): number of songs titles in local storage =', recent_songs.length);

//	for (let ndx=0; ndx<recent_songs.length; ndx++) {
//		let song_name = recent_songs[ndx];
		//console.log('JSN:/client/js/index.js:window.onload(): >>> GOT RECENT FILE['+i+'] =', song_name);

		let recent_song_elist = [];

		let child_nodes = document.querySelector('.dropdown-submenu').childNodes;
		if (child_nodes.length) {
			for (let i=0, ilen=child_nodes.length; i<ilen; ++i) {
				if (child_nodes[i].childNodes.length) {
					for (let j=0, jlen=child_nodes[i].childNodes.length; j<jlen; ++j) {
						console.log('JSN:/client/js/index.js:window.onload(): child_nodes['+i+'] =', child_nodes[i].childNodes[j].nodeValue);
						recent_song_elist.push(child_nodes[i].childNodes[j].nodeValue);
					}
				}
			}

			if (!recent_song_elist.includes(song_name)) {
				let li = document.createElement('li');
				li.className = 'recent-file-item';
				li.innerText = song_name;
				li.addEventListener('click', jsn.events.selectSong);

				if (document.querySelector('.dropdown-submenu') !== null) {
					document.querySelector('.dropdown-submenu').appendChild(li);
					//console.log('JSN:/client/js/index.js:window.onload(): >>> APPENDED =', li);
				}
			}
		}
		else {
			let li = document.createElement('li');
			li.className = 'recent-file-item';
			li.innerText = song_name;
			li.addEventListener('click', jsn.events.selectSong);

			if (document.querySelector('.dropdown-submenu') !== null) {
				document.querySelector('.dropdown-submenu').appendChild(li);
				//console.log('JSN:/client/js/index.js:window.onload(): >>> APPENDED =', li);
			}
		}

/*
		if (recent_songs.includes(song_name) === false) {
			recent_songs.push(song_name);
			let li = document.createElement('li');
			li.className = 'recent-file-item';
			li.innerText = song_name;
			li.addEventListener('click', jsn.events.selectSong);

			if (document.querySelector('.dropdown-submenu') !== null) {
				document.querySelector('.dropdown-submenu').appendChild(li);
				//console.log('JSN:/client/js/index.js:window.onload(): >>> APPENDED =', li);
			}
		}
*/
//	}

	let recent_file_el = null;

	// The getsong function executes an ajax request for the song.
	const getsong = async function(url, content_type) {
		let song = await jsn.dispatch.get(url, content_type);
		//console.log('jsn:/client/js/jsn/util/openfile.js:openFile:getsong(): song =', song);

		if (song.statusCode != undefined && song.statusCode != 200) {
			console.log('jsn:/client/js/jsn/util/openfile.js:openFile:getsong(): ERROR: song.statusCode =', song.statusCode);
			alert(JSON.stringify(song));
			return;
		}

		jsn.song = JSON.parse(song);
		console.log('jsn:/client/js/jsn/util/openfile.js:openFile:getsong(): jsn.song =', jsn.song);

		if (jsn.meta.fileBrowser) {
			// Hide the file-browser until it's needed again.
			jsn.meta.fileBrowser.style.visibility = 'hidden';
		}
//		else if (recent_file_el !== null) {
//			if (recent_file_el.classList.contains('selected-song')) {
//				recent_file_el.classList.remove('selected-song')
//			}
//			let parent_classlist = recent_file_el.parentElement.parentElement.parentElement.classList;
//			if (parent_classlist.contains('visible')) {
////				parent_classlist.replace('visible', 'hidden')
//			}
//		}

		// Now that we have a song we can turn on the Print file menu option.
		if (document.getElementById('print-menu-option') !== null) {
			if (document.getElementById('print-menu-option').classList.contains('disabled')) {
				document.getElementById('print-menu-option').classList.toggle('disabled');
			}
		}

		// And the view menu options.
		const view_menu_items = document.querySelectorAll('.view-menu-item');
		for (let i=0, len=view_menu_items.length; i<len; ++i) {
			view_menu_items[i].classList.toggle('disabled');
			if (view_menu_items[i].classList.contains('disabled')) {
				view_menu_items[i].classList.toggle('disabled');
			}
			view_menu_items[i].addEventListener('click', jsn.events.setView);
		}

		// Now that we have a song we can turn on the metronome.
		if (document.getElementById('tools-metronome') !== null) {
			if (document.querySelector('#tools-metronome').classList.contains('disabled')) {
				document.getElementById('tools-metronome').classList.toggle('disabled');
			}
		}

		// Now that we have a song we can turn on the save file option.
		if (document.getElementById('save-menu-option') !== null) {
			if (document.getElementById('save-menu-option').classList.contains('disabled')) {
				document.getElementById('save-menu-option').classList.toggle('disabled');
			}
		}

		// This to close the menu.
		if (document.querySelector('.dropdown-submenu') !== null) {
			if (document.querySelector('.dropdown-submenu').classList.contains('show')) {
				document.querySelector('.dropdown-submenu').classList.remove('show');
				document.querySelector('.dropdown-submenu').classList.add('hide');
			}
		}

/*
		if (document.querySelector('.dropdown-menu') !== null) {
			if (document.querySelector('.dropdown-menu').classList.contains('show')) {
				document.querySelector('.dropdown-menu').classList.remove('show');
				document.querySelector('.dropdown-menu').classList.add('hide');
			}
		}
*/

		jsn.display.jsnFormat();
		console.log('jsn:/client/js/jsn/util/openfile.js:openFile:getsong(): >>> jsn.song =', jsn.song);
	}

	let url = '/api/1.0/getsong/' + song_name;
	getsong(url, 'json');
}

