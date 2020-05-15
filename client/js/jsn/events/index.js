/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/events/index.js
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

import { metronome } from "./metronome.js";
import { selectSong } from "./select-song.js";
import { selectTag } from "./select-tag.js";
import { formHandler } from "./form-handler.js";
import { dragSplitter } from "./drag-multiuse-panel.js";
import { dragWindow } from "./drag-window.js";
//import { openFile } from "./openfile.js";
import { dropDownHover } from "./dropdown-hover.js";
import { setAction } from "./select-action.js";
import { setView }   from "./select-view.js";
import { getHelp }   from "./help.js";

//import { setSongName } from "./select-song.js";
import { editFormBlur } from "./editform-blur.js";
import { editFormSubmit } from "./editform-submit.js";
import { selectChordClickHandler }   from "./select-chord-click-handler.js";
import { selectedChordClickHandler } from "./selected-chord-click-handler.js";
import { lyricsClickHandler } from "./lyrics-click-handler.js";

class Events {
	constructor() {
		//console.log('jsn://client/js/events/index.js:constructor() this =', this);

		if (!Events.instance) {
			this.metronomeHandler = metronome;
			this.selectSong = selectSong;
			this.selectTag = selectTag;
			this.formHandler = formHandler;
			this.dragSplitter = dragSplitter;
			this.dragWindow = dragWindow;
//			this.openFile = openFile;
			this.dropDownHover = dropDownHover;
			this.setView = setView;
			this.setAction = setAction;
			this.getHelp = getHelp;

//			this.setSongName = setSongName;
			this.editFormBlur = editFormBlur;
			this.selectChordClickHandler = selectChordClickHandler;
			this.selectedChordClickHandler = selectChordClickHandler;
			this.lyricsClickHandler = lyricsClickHandler;
		}
	}
}

var events = new Events();
//console.log('jsn://client/js/events/index.js:constructor() events =', events);

export { events };

