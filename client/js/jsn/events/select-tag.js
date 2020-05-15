/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/events/select-tag.js
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

export function selectTag(event) {
	/*
	 * This method is called when <TODO>
	 */
	console.log('jsn:/client/js/events/select-action.js:selectTag(): event.target.id =', event.target.id);

	event.preventDefault();

	console.log('jsn:/client/js/jsn/display/file-browser.js:fileBrowser(): TAG CLICKED =', event.target.innerText);

	// Remove any existing selected song-tag-item.
	if (document.getElementsByClassName('selected-tag song-tag-item') !== null) {
		let len = document.getElementsByClassName('selected-tag song-tag-item').length;
		for (let sel_ndx=0; sel_ndx<len; ++sel_ndx) {
			document.getElementsByClassName('selected-tag song-tag-item')[sel_ndx].classList.remove('selected-tag');
		}
	}

	// Add the selected-tag class to the song-tag-element element so it gets highlighted.
	event.target.classList.add('selected-tag');

	let html = '<ul id="song-list">';
	if (document.getElementById('file-browser-files') !== null) {
		for (let tags_ndx=0; tags_ndx<jsn.meta.tagList.length; ++tags_ndx) {
			let tagname = jsn.meta.tagList[tags_ndx].id;
			//console.log('jsn:/client/js/jsn/display/file-browser.js:fileBrowser(): TAGNAME =', tagname);
			if (tagname === event.target.innerText) {
				let filelist = jsn.meta.tagList[tags_ndx].filelist;
				//console.log('jsn:/client/js/jsn/display/file-browser.js:fileBrowser(): FILELIST =', filelist);
				for (let file_ndx=0; file_ndx<filelist.length; ++file_ndx) {
					let fq_filename = filelist[file_ndx];
					let fname = fq_filename.substring(fq_filename.lastIndexOf('/')+1);
					html += '<li class="song-list-item">' + fname + '</li>\n';
				}
			}
		}
		html += '</ul>\n';
		document.getElementById('file-browser-files').innerHTML = html;
		console.log('jsn:/client/js/jsn/display/file-browser.js:fileBrowser(): HTML =', html);

		// Add event handlers for the new songs.
		let songlist = document.querySelectorAll('.song-list-item');
		for (let ndx=0; ndx<songlist.length; ++ndx) {
			songlist[ndx].addEventListener('click', jsn.events.selectSong);
			songlist[ndx].addEventListener('dblclick', jsn.events.selectSong);
		}
	}
}

