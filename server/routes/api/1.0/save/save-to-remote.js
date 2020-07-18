/*
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/server/routes/api/v1.0/save/save-to-remote.js
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

const axios = require('axios');

function saveToRemote(songdata) {
  //console.log('JSN:/server/routes/api/1.0/save/save-to-remote.js: songdata =', songdata);

  const uri = 'http://weblane.com:5253/api/save';

  async function makePostRequest() {
    let options = {
      data: songdata,
      headers: {
      }
    };

    axios.post(uri, songdata).then(function (response) {
      //resultElement.innerHTML = generateSuccessHTMLOutput(response);
      console.log(`Status code: ${response.status}`);
      console.log(`Status text: ${response.statusText}`);
      console.log(`Request method: ${response.request.method}`);
      console.log(`Path: ${response.request.path}`);
      console.log(`Date: ${response.headers.date}`);
      console.log(`Data: ${response.data}`);
    })
    .catch(function (error) {
      //resultElement.innerHTML = generateErrorHTMLOutput(error);
      console.log('/server/routes/api/v1.0/save/save-to-remote.js: axios ERROR =', error);
    });
  }

  makePostRequest();

}

module.exports = saveToRemote;

