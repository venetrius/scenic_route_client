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
  console.log('event....')
  marker = getGoogleMarker(event.latLng);
  if(startPoint.marker){
    startPoint.marker.setMap(null);
  }
  startPoint.marker = marker
  $('#centerlat').text(marker.getPosition().lat());
  $('#centerlong').text(marker.getPosition().lng());
  let infowindow = new google.maps.InfoWindow({
    content: `<div>Start point</div>`
  });
 marker.addListener('click', function () {
    infowindow.open(map, marker);
  });
}

const addStart = function(){
  console.log('adding listener')
  google.maps.event.removeListener(newPointListener);
  newPointListener = map.addListener('click', setStartingPoint);
  event.preventDefault();
}

const addDestination = function(){
  event.preventDefault();

  console.log('adding listener')
  google.maps.event.removeListener(newPointListener);
  newPointListener = map.addListener('click', setStartingPoint);
}



const deletePoint = function(){
  pointMap[activePoint.id].setMap(null);
  delete pointMap[activePoint.id];
  clearPointContainer();
}

const addPoint = function(point) {
  let marker = getGoogleMarker({lng : Number(point.longitude), lat : Number(point.latitude)});
  var infowindow = new google.maps.InfoWindow({
    content: `<div>${point.title}</div>`
  });
  // Onclick show point info
  marker.addListener('click', function () {
    showPointInfo(point.id);
  });

  // Show point title on hover
  marker.addListener('mouseover', function() {
    infowindow.open(map, marker);
  });
  marker.addListener('mouseout', function() {
    infowindow.close();
  });
    pointMap[point.id] = marker;
}

function newPointEvent(event) {
  if(!pointTarget){
    console.log('cougth event')
    return false;
  }
  marker = getGoogleMarker(event.latLng);
  nonPersistentMarker = marker;
  $('#centerlat').text(marker.getPosition().lat());
  $('#centerlong').text(marker.getPosition().lng());
  let infowindow = new google.maps.InfoWindow({
    content: `<div>Add a title</div>`
  });
 marker.addListener('click', function () {
    infowindow.open(map, marker);
  });
  $('#newPointForm').show();
}

const {enableNewPointEvent, disableNewPointEvent} = function(){
  let newPointListener = null;
  return {
    enableNewPointEvent : function (){
      newPointListener = map.addListener('click', newPointEvent);
      $("#toggleEditBtn").html("Cancel add point");
      $("#toggleEditBtn").attr("onclick","disableNewPointEvent()")        
    },
    
    disableNewPointEvent : function(){
      google.maps.event.removeListener(newPointListener);
      newPointListener = null;
      $("#toggleEditBtn").html("Add New Point");
      $("#toggleEditBtn").attr("onclick","enableNewPointEvent()")
    }
  }
}();

const cancelAddNewPoint = function(){
  $('#newPointForm').hide();
  nonPersistentMarker.setMap(null);
  nonPersistentMarker = null;
  disableNewPointEvent();
}

// call back function for Google API call
function initMap() {
  
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: {lat: 51.0356, lng: -114.0708} 
  });

  poly = new google.maps.Polyline({  });
  poly.setMap(map);


 // $("#toggleEditBtn").html("Cancel add point");
 // $("#toggleEditBtn").attr("onclick","disableNewPointEvent()")        
  
}



$( document ).ready(function() {

});