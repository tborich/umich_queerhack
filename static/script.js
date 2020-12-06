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

async function initMap() {

  //Event Database
  var db = firebase.firestore();

  //Initialize Map
  const center = { lat: 42.277424, lng: -83.738246};
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: center,
    disableDefaultUI: true,
    scaleControl: true,
    zoomControl: true,
  });

  //Single InfoWindow
  infoWindow = new google.maps.InfoWindow;
  //QUERY ALL EVENTS
  await db.collection("events").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var lat = doc.get('lat');
        var lng = doc.get('lng');
        var disc = doc.get('discription');
        var name = doc.get('event_name');
        var time = doc.get('time').toDate().toLocaleString([], 
          {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});

        const loc = { lat: lat, lng: lng };

        const contentString = '<div class="info-box-wrap">'+
          '<div class="info-box-text-wrap">'+
          '<h6 class="name">'+name+'</h6>'+
          '<p class="disc">'+disc+'</p>'+
          '<p class="date">'+time+'</p>'+
        '</div>'+
        '</div>';

        // The marker, positioned at umich
        const marker = new google.maps.Marker({
          position: loc,
          map: map,
          animation: google.maps.Animation.DROP,
        });
      marker.addListener("click", toggleBounce);
    
      function toggleBounce(){
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(4);
        }
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
        google.maps.event.addListener(map, 'click', function() {
          infoWindow.close();
      });
      }

    });
  });
    // Locations
    
}