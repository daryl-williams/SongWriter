/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/events/select-action.js
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

export function setAction(event) {
  /*
   * This method is called when a change event has occured on the select-action element with id=select-action.
   */
  //console.log('jsn:/client/js/events/select-action.js:setAction(): event =', event);

  event.preventDefault();

  if (event.target.classList.contains('disabled')) {
    return;
  }

  // We only want to handle file menu actions and not actual song selection
  // so here we check if the target is song selection or recent file item.
  if (event.target.classList.contains('song-list-item') || event.target.classList.contains('recent-file-item')) {
    return;
  }

  // Close the File menu.
  let el = event.target.parentElement;
  el.classList.replace('show', 'hide');

  if (event.target.textContent.substring(0, 3) === 'New') {
    jsn.meta.previous_action = jsn.meta.action;
    jsn.meta.action = 'new song'
    jsn.controlPanel.action = 'new';
    jsn.display.newSong();
  }
  else if (event.target.textContent.substring(0, 4) === 'Open') {
    jsn.meta.previous_action = jsn.meta.action;
    jsn.meta.action = 'edit';
    jsn.controlPanel.action = 'edit';
    jsn.display.fileBrowser();
  }
  else if (event.target.textContent.substring(0, 4) === 'Save') {
    jsn.meta.previous_action = jsn.meta.action;
    jsn.meta.action = 'save';
    jsn.controlPanel.action = 'save';
    jsn.saveSong();
  }
  else if (event.target.textContent.substring(0, 6) === 'Export') {
    console.log('jsn:/client/js/events/select-action.js:setAction(): EXPORT ACTION =', event.target.textContent);
  }
  else if (event.target.textContent.substring(0, 5) === 'Print') {
    jsn.meta.previous_action = jsn.meta.action;
    jsn.meta.action = 'print';
    jsn.controlPanel.action = 'print';

    if (jsn.meta.displayFormat === 'jsn') {
      jsn.display.jsnFormat();
    }
    else if (jsn.meta.displayFormat === 'lmss') {
      jsn.display.lmssFormat();
    }
    else {
      console.log('jsn:/client/js/events/select-action.js:setAction(): print ERROR: displat format =', event.meta.displayFormat);
    }
  }
  else {
    if (event.target.id == 'recent-files-opened') {
      // No harm, no foul. The recent open files event
      // is handled by the select-song event handler.
      return;
    }
    console.log('jsn:/client/js/events/select-action.js:setAction(): ERROR: unknown file menu action =', event.target.textContent);
    alert('Unknown File action = ' + event.target.textContent);
    return;
  }

  /*
  //event.target.parentElement.style.color = ":hover";
  let sheet = document.styleSheets[2];
  console.log('jsn:/client/js/events/select-action.js:setAction(): sheet =', sheet);
  let selector = '.dropdown-menu:hover .dropdown-options';
  let style = 'visibility: visible';

  if ( 'insertRule' in sheet ) {
    sheet.insertRule(selector + '{' + style + '}', 1);
  }
  else if ( 'addRule' in sheet ) {
    sheet.addRule(selector, style, 1);
  }
  */
  //el.classList.replace('visible', 'hidden');

  //if (jsn.controlPanel.action === 'new') {
  //  jsn.display.newSong();
  //}
  //else if (jsn.controlPanel.action === 'edit') {
  //  jsn.display.fileBrowser();
  //}
  //else if (jsn.controlPanel.action === 'save') {
  //  jsn.saveSong();
  //}
}

