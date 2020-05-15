/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/display/index.js
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

import { newSong }  from "./newsong.js";
import { fileBrowser }  from "./file-browser.js";
import { jsnFormat }  from "./jsn-format.js";
import { lmssFormat } from "./lmss-format.js";
import { printFormat } from "./print-format.js";

const display = {
	newSong,
	fileBrowser,
	jsnFormat,
	lmssFormat,
	printFormat,
};

export { display };

