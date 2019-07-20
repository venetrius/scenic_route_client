console.log('hello everyone')

var map;
var pointMap = {}
var pointTarget = null
var newPointListener = null;
var startPoint = {}
var endPoint = {}
var routeChangeHandler = null;

const getGoogleMarker = function(coord){
  let marker = new google.maps.Marker({
    position: coord,
    icon: "https://img.icons8.com/doodle/30/000000/filled-flag.png",
    map: map,
  });
  return marker;
}

function setStartingPoint(event) {
  setPointMarker(event, startPoint)
}

function setDestinationPoint(event) {
  setPointMarker(event, endPoint)
}

function setPointMarker(event, target) {
  marker = getGoogleMarker(event.latLng);
  if(target.marker){
    target.marker.setMap(null);
  }
  target.marker = marker
  let infowindow = new google.maps.InfoWindow({
    content: `<div>Start point</div>`
  });
 marker.addListener('click', function () {
    infowindow.open(map, marker);
  });
}

const addStart = function(){
  google.maps.event.removeListener(newPointListener);
  newPointListener = map.addListener('click', setStartingPoint);
}

const addDestination = function(){
  google.maps.event.removeListener(newPointListener);
  newPointListener = map.addListener('click', setDestinationPoint);
}

// call back function for Google API call
function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 51.0356, lng: -114.0708} 
  });
  directionsDisplay.setMap(map);
  routeChangeHandler = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };

  poly = new google.maps.Polyline({  });
  poly.setMap(map);
  
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: startPoint.marker.position,
    destination: endPoint.marker.position,
    travelMode: 'DRIVING'
  }, function(response, status) {
    if (status === 'OK') {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}



$( document ).ready(function() {

});