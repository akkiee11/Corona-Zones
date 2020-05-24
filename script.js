      let lat,lng;
      window.position = {};
                if('geolocation' in navigator) {
                    console.log('geolocation Available')
                    navigator.geolocation.getCurrentPosition((position) => {
                      lat=position.coords.latitude;
                      lng=position.coords.longitude;
                      window.position = {
                                        lat: lat,
                                        lng: lng
                                      };
                  });
                } 
                else {
                  console.log('geolocation Is not Available')
              }


      
      window.position = {};
       function initMap() {
        var myLatLng = {lat: 19.1239285, lng: 72.90944069999998};

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 17,
          center: myLatLng
        });

        
          if (window.position) {
            map.setCenter(window.position);
          }

        for (var i = 0, length = markers.length; i < length; i++) {
              var data = markers[i],
      latLng = new google.maps.LatLng(data.lat, data.lng); 

  // Creating a marker and putting it on the map
  var marker = new google.maps.Marker({
    position: latLng,
    icon: 'corona.png' ,
    map: map,
    title: data.title
  });

  var infoWindow = new google.maps.InfoWindow();
// Attaching a click event to the current marker
google.maps.event.addListener(marker, "click", function(e) {
  infoWindow.setContent(data.name);
  infoWindow.open(map, marker);
});

// Creating a closure to retain the correct data 
//Note how I pass the current data in the loop into the closure (marker, data)
(function(marker, data) {

// Attaching a click event to the current marker
google.maps.event.addListener(marker, "click", function(e) {
  infoWindow.setContent(data.name);
  infoWindow.open(map, marker);
});

})(marker, data);
}

marker = new google.maps.Marker({
  position: window.position,
  icon: 'location.png',
  map: map,
});

      var radius = 1000;
      var position = marker.getPosition();

      var circle = new google.maps.Circle({
        center: position,
        radius: radius,
        fillColor: "#0000FF",
        fillOpacity: 0.1,
        map: map,
        strokeColor: "#FFFFFF",
        strokeOpacity: 0.1,
        strokeWeight: 2
      });

}