/**
 * Copyright 2018, Google LLC
 * Licensed under the Apache License, Version 2.0 (the `License`);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an `AS IS` BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
// [START gae_python38_log]

let map, popup, Popup;

function initMap() {
    // Locations
    const umich = { lat: 42.276877, lng: -83.738235 };
    // The map, centered at umich
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: umich,
    });

    //Content for Infowindow that pops up on click
    const contentString =
    '<div id="content">' +
    '<div id="siteNotice">' +
    "</div>" +
    '<h1 id="firstHeading" class="firstHeading">Diag Picnic</h1>' +
    '<div id="bodyContent">' +
    "<p>Join us for a relaxing picnic on the UofM diag! Please bring your own dish to pass.</p>" +
    "</div>" +
    "</div>";

    //Infowindow that pops up on click
  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });

    // The marker, positioned at umich
    const marker = new google.maps.Marker({
      position: umich,
      map: map,
      animation: google.maps.Animation.DROP,
    });
  marker.addListener("click", toggleBounce);

  function toggleBounce(){
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
      infowindow.open(map, marker);
    }
  }
}