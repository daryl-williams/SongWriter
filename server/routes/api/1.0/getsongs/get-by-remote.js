/*
 * Song Writer, A song notation and editing tool.
 *
 * jsn:/server/routes/api/v1.0/getsongs/get-by-remote.js
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

async function getTagsByRemote() {
  //console.log('JSN:/server/routes/api/1.0/getsongs/get-by-remote.js: this =', this);

  const uri = 'http://weblane.com:5253/api/tags';

  try {
    let res = await axios.get(uri);
    let data = res.data;
    console.log('JSN:/server/routes/api/1.0/getsongs/get-by-remote.js: Returning data =', data.result);
   return res.data.result;
  }
  catch(error) {
    console.log('JSN:/server/routes/api/1.0/getsongs/get-by-remote.js: axios get ERROR =', error);
  }



/*
  async function makeGetRequest() {
    let res = await axios.get(uri).then(function (response) {
      //console.log(`Status code: ${response.status}`);
      //console.log(`Status text: ${response.statusText}`);
      //console.log(`Request method: ${response.request.method}`);
      //console.log(`Path: ${response.request.path}`);
      //console.log(`Date: ${response.headers.date}`);
      //console.log(`Data: ${response.data}`);
      //let song_data = JSON.stringify(response.data.result);
      let song_data = response.data.result;
      console.log('RETURNING song_data: ', song_data);
      return song_data;
    })
    .catch(function (error) {
      console.log('JSN:/server/routes/api/1.0/getsongs/get-by-remote.js: axios ERROR =', error);
    });
    return res;
  }

  let result = makeGetRequest();
  console.log('RESULT =', result);
*/
}

module.exports = getTagsByRemote;

