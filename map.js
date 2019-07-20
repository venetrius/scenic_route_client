console.log('hello everyone')

var map;
var pointMap = {}
var pointTarget = null
var newPointListener = null;


var nonPersistentMarker;
var activePoint;
var startPoint = {}
var endPoint = {}

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
  
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 51.0356, lng: -114.0708} 
  });

  poly = new google.maps.Polyline({  });
  poly.setMap(map);
  
}



$( document ).ready(function() {

});