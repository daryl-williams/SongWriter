/**
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/client/js/jsn/util/dispatch.js
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

class Dispatch {
	constructor() {
		//console.log('/client/js/jsn/util/dispatch.js:constructor(): this =', this);
	}

	async dispatchRequest(url, request_type, content_type, options) {
		//console.log('/client/js/jsn/util/dispatch.js:dispatchRequest(): REQUEST url =', url);

		let response = null;

		if (request_type === 'GET') {
			response = await fetch(url);
		}
		else if (request_type === 'POST') {
			response = await fetch(url, options);
		}
		else {
			console.log('/client/js/jsn/util/dispatch.js:dispatchRequest(): ERROR unknow request_type =', request_type);
		}
		console.log('/client/js/jsn/util/dispatch.js:dispatchRequest(): response =', response);

		if (!response.ok) {
			console.error('/client/js/util/dispatch.js:dispatchRequest(): fetch ERROR, response =', response);
			//throw new Error(response.status);
			let json = {
				"status": "error",
				"details": response.status,
			}
			return json;
		}

		if (content_type === 'json') {
			const json = await response.json();
			//console.log('/client/js/util/dispatch.js:dispatchRequest(): >>> 1. returning JSON =', json);
			return json;
		}
		else if (content_type === 'html') {
			const html = await response.text();
			//console.log('/client/js/util/dispatch.js:dispatchRequest(): >>> 1. returning JSON =', json);
			return html;
		}
		else {
			console.log('/client/js/util/dispatch.js:dispatchRequest(): ERROR: unknow content-type', content_type);
			return null;
		}
	}

	async post(url, content_type, options) {
		console.log('/client/js/util/dispatch.js:post(): url =', url);
		console.log('/client/js/util/dispatch.js:post(): options =', options);

		let response = await this.dispatchRequest(url, 'POST', content_type, options);
		return response;
	}

	async get(url, content_type) {
		//console.log('/client/js/util/dispatch.js:get(): url =', url);
		let response = await this.dispatchRequest(url, 'GET', content_type);
		return response;
	}
}

var dispatch = new Dispatch();
export { dispatch };

