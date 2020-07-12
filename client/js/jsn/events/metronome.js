/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/events/metronome.js
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

export function metronome(event) {
  /*
   * This method is called when <TODO>
   */
  console.log('jsn:/client/js/events/metronome.js:metronome(): event.target =', event.target);

  event.preventDefault();

  if (event.target.children.length > 0) {
    event.target.children[0].classList.remove('disabled')
    event.target.children[0].classList.add('show')
    console.log('jsn:/client/js/events/metronome.js:metronome(): event.target.classList =', event.target.classList);
  }
  else if (event.target.innerText === 'Start') {
    console.log('jsn:/client/js/events/metronome.js:metronome(): event.target.innerText =', event.target.innerText);
    // create a new synth and route the output to master
    const synth = new Tone.MembraneSynth().toMaster();
    // play a note with the synth we setup
    synth.triggerAttackRelease("C2", "8n");
  }
  else if (event.target.innerText === 'Stop') {
    console.log('jsn:/client/js/events/metronome.js:metronome(): event.target.innerText =', event.target.innerText);
  }
  else {
    console.log('jsn:/client/js/events/metronome.js:metronome(): ERROR unknown event.target.Text =', event.target.Text);
  }

}

