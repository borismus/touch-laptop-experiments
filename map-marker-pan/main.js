function initialize() {
  var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
  var mapOptions = {
    zoom: 4,
    center: myLatlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

  function placeMarker(location) {
    marker = new google.maps.Marker({
      position: location,
      map: map
    });
  }

  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
    document.body.webkitRequestPointerLock();
  });
}

document.addEventListener("mousemove", function(e) {
  var movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
  var movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;

  // Print the mouse movement delta values
  console.log("movementX=" + movementX, "movementY=" + movementY);
  map.panBy(-movementX, -movementY)
}, false);
