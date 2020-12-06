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

  //Event Database
  var db = firebase.firestore();

  //Initialize Map
  const center = { lat: 42.277424, lng: -83.738246};
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: center,

    //Disable most of google map features such as streetview
    disableDefaultUI: true,
    scaleControl: true,
    zoomControl: true,

    //Night Mode!
    styles: [
      { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
      {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#263c3f" }],
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#6b9a76" }],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#38414e" }],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [{ color: "#212a37" }],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9ca5b3" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#746855" }],
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#1f2835" }],
      },
      {
        featureType: "road.highway",
        elementType: "labels.text.fill",
        stylers: [{ color: "#f3d19c" }],
      },
      {
        featureType: "transit",
        elementType: "geometry",
        stylers: [{ color: "#2f3948" }],
      },
      {
        featureType: "transit.station",
        elementType: "labels.text.fill",
        stylers: [{ color: "#d59563" }],
      },
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#17263c" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#515c6d" }],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#17263c" }],
      },
    ],
  });

  //Single InfoWindow
  infoWindow = new google.maps.InfoWindow;

/*Quick Add Events to Database (edit timestamp on firebase website)
db.collection("events").add({
    discription: "We are having people over for Christmas Dinner! If you don't have anywhere to go, stop on by!",
    duration: "180",
    event_name: "Christmas Dinner",
    host: "Steve (He/Him)",
    lat: 42.291076, 
    lng: -83.777737,
    time: 0
})
*/

  //QUERY ALL EVENTS
  db.collection("events").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var lat = doc.get('lat');
        var lng = doc.get('lng');
        var disc = doc.get('discription');
        var name = doc.get('event_name');
        var time = doc.get('time')
        if (time > 0)
          time = time.toDate().toLocaleString([], 
          {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});
        var host = doc.get('host');
        const loc = { lat: lat, lng: lng };

        const contentString = '<div>'+
          '<div class="info-box-text-wrap">'+
          '<h6 class="name">'+name+'</h6>'+
          '<p class="host">'+host+'</p>'+
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

