/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/util/dropdown-menu.js
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

class dropDownMenu {
	constructor() {
		//console.log('jsn:/client/js/util/dropdown-menu.js:constructor(): this =', this);
		self = this;
	}

	toggleClass(elem,className) {
		if (elem.className.indexOf(className) !== -1){
			elem.className = elem.className.replace(className,'');
		}
		else {
			elem.className = elem.className.replace(/\s+/g,' ') + 	' ' + className;
		}
		return elem;
	}

	toggleDisplay(elem) {
		const curDisplayStyle = elem.style.display;			
		if (curDisplayStyle === 'none' || curDisplayStyle === ''){
			elem.style.display = 'block';
		}
		else {
			elem.style.display = 'none';
		}
	}

	toggleMenuDisplay(e) {
		const dropdown = e.currentTarget.parentNode;
		const menu = dropdown.querySelector('.menu');
		const icon = dropdown.querySelector('.fa-angle-right');
		self.toggleClass(menu,'hide');
		self.toggleClass(icon,'rotate-90');
	}

	handleOptionSelected(e) {
		self.toggleClass(e.target.parentNode, 'hide');			

		const id = e.target.id;
		const newValue = e.target.textContent + ' ';
		const titleElem = document.querySelector('.dropdown .title');
		const icon = document.querySelector('.dropdown .title .fa');

		titleElem.textContent = newValue;
		titleElem.appendChild(icon);
										
		// Trigger custom event.
		document.querySelector('.dropdown .title').dispatchEvent(new Event('change'));
		//setTimeout is used so transition is properly shown
		setTimeout(() => self.toggleClass(icon,'rotate-90',0));
	}

	handleTitleChange(e) {
		const result = document.getElementById('result');
		//result.innerHTML = 'The result is: ' + e.target.textContent;
	}
}

var dropdownMenu = new dropDownMenu();
export { dropdownMenu };

