/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/events/lyrics-click-handler.js
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

export function lyricsClickHandler(event) {
	/*
	 * This method is called when ...
	 */
	console.log('jsn:/client/js/events/select-action.js:lyricsClickHander(): event =', event);

	if (event.isComposing || event.keyCode === 229) {
		return;
	}
	if (event.shiftKey) {
		return;
	}

	event.preventDefault();

	function replacer(match, measure, beat, offset, str) {
		return [measure-1, beat-1];
	}

	let measure_beat = this.id.replace(/lyrics-bar([\d]+)-beat([\d]+)$/, replacer);
	console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): measure =', measure_beat);

	const mblist = measure_beat.split(',');
	let measure = mblist[0];
	let beat = mblist[1];
	console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): measure =', measure);
	console.log('jsn:/client/js/events/select-action.js:selectChordClickHandler(): beat =', beat);

	jsn.song.body[measure][beat].lyric = this.innerText;

	//console.log('this =', this);
	//console.log('SVG Text =', this.innerText);

	//songHelper.lyric_target_div = event.target.id;
}

