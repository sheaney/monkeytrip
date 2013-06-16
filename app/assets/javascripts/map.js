var initZoom = 3;
var map;
var projection;
var userMarker;
var markers = [];
var tuxtla = "tuxtla gutierrez";
var rio = "rio de janeiro";
var mapIdtoCity = {amsterdam:1, atlanta:2, berlin:3, jerusalem:4, stockholm:5, manila:6, bangkok:7,
antanarivo:8, tuxtla:9, rio:10 };

var locations = [
  new google.maps.LatLng(52.3702157, 4.895167899999933),
  new google.maps.LatLng(33.7489954, -84.3879824),
  new google.maps.LatLng(52.519171, 13.406091199999992),
  new google.maps.LatLng(31.768319, 35.21370999999999),
  new google.maps.LatLng(59.32893000000001, 18.064910000000054),
  new google.maps.LatLng(14.5995124, 120.9842195),
  new google.maps.LatLng(13.7278956, 100.52412349999997),
  new google.maps.LatLng(-18.914872, 47.531611999999996),
  new google.maps.LatLng(16.7478677, -93.1125826),
  new google.maps.LatLng(-22.9035393, -43.20958689999998)
  ];
var places = [
  "amsterdam, netherlands", "atlanta, usa", "berlin, germany", "jerusalem, israel", "stockholm, sweden",
  "manila, philippines", "bangkok, thailand", "antanarivo, madagascar", "tuxtla gutierrez, mexico",
  "rio de janeiro, brazil"
];

var futureLocation = 'assets/red_pin.png';
var currentLocation = 'assets/gray_pin.png';
var pastLocation = 'assets/orange_pin.png';

function initialize() {
  var styles = [
    {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [ { "visibility": "off"} ]
  }, {
    "featureType": "administrative.country",
    "elementType": "geometry",
    "stylers": [ { "visibility": "on" } ]
  }, {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry",
    "stylers": [ { "visibility": "on" } ]
  }, {
    "featureType": "administrative.locality",
    "elementType": "geometry",
    "stylers": [ { "visibility": "on" } ]
  }, {
    "featureType": "administrative.neighborhood",
    "elementType": "geometry",
    "stylers": [ { "visibility": "on" } ]
  }, {
    "featureType": "administrative.province",
    "elementType": "geometry",
    "stylers": [ { "visibility": "on" } ]
  }, {
    "featureType": "landscape.natural.terrain",
    "stylers": [ { "visibility": "off" } ]
  }, {
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [ { "visibility": "off" } ]
  }, {
    "featureType": "water",
    "elementType": "labels",
    "stylers": [ { "visibility": "off" } ]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [ { "visibility": "off" } ]
  }, {
    "featureType": "administrative.province",
    "elementType": "labels",
    "stylers": [ { "visibility": "off" } ]
  }, {
    "featureType": "landscape.natural.landcover", "stylers": [ { "gamma": 0.5 } ]
  }, {
    "featureType": "water", "stylers": [ { "gamma": 0.8 } ]
  }, { "featureType": "administrative.province", "elementType": "geometry", "stylers": [ { "gamma": 0.4 } ] }
  ];
  var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(0, 0),
    zoom: initZoom,
    panControl: false,
    mapTypeControl: false,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  });

  map.mapTypes.set("map", styledMap);
  map.setMapTypeId("map");

  var marker;

  for(var i = 0; i < locations.length; i++) { 
    marker = createMarker(locations[i], places[i], pastLocation);
    showModal(marker, places[i]);
    markers.push(marker);  
  }


  MyOverlay.prototype = new google.maps.OverlayView();
  MyOverlay.prototype.onAdd = function() { }
  MyOverlay.prototype.onRemove = function() { }
  MyOverlay.prototype.draw = function() { }

  function MyOverlay(map) { this.setMap(map); }

  var overlay = new MyOverlay(map);

  // Wait for idle map
  google.maps.event.addListener(map, 'idle', function() {
    // Get projection
    projection = overlay.getProjection();
  });

  showUserLocation();

  new google.maps.places.Autocomplete(document.getElementById('place'), { types: ['(cities)'] });
}


function fromLatLngToPixels(latLng) {
  return projection.fromLatLngToContainerPixel(latLng);
}

function showUserLocation() {
  if (geoPosition.init()) {
    geoPosition.getCurrentPosition(geoSuccess, geoError);
  } else {
    geoError();
  }
}

function geoSuccess(location) {
  var latLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
  userMarker = createMarker(latLng, "", currentLocation);
  reverseGeocode(latLng, userMarker);
  map.setCenter(latLng);
}

function geoError() {
  var latLng = new google.maps.LatLng(37.7749295, -122.41941550000001);
  place = "san francisco, usa";
  userMarker = createMarker(new google.maps.LatLng(latLng), place, currentLocation);
  showModal(userMarker, place);
  map.setCenter(latLng);
}

function reverseGeocode(latLng, marker) {
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({'latLng': latLng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var i;
      for(i = results.length; --i > 0;) {
        if(results[i].types[0] == "locality") {
          var wholePlace = results[i].formatted_address.split(", ");
          var place = wholePlace[0];
          if(wholePlace[wholePlace.length - 1] != place)
            place += ", " + wholePlace[wholePlace.length - 1];
          break;
        }
      }
      if(i == 0)
        place = results[results.length - 3].formatted_address;
      place = place.toLowerCase();
      marker.setTitle(place);
      showModal(userMarker, place);
    }
  });
}

function showModal(marker, place) {
  var city = marker.title;
  if (city.indexOf(",") < city.indexOf(" "))// for cities with spaces in between, e.g Rio de Janeiro
    var justCity = city.substring(0,city.indexOf(","));
  else
    var justCity = city.substring(0,city.indexOf(" "));
  google.maps.event.addListener(marker, 'click', function() {
    $('#myModal'+mapIdtoCity[justCity]).modal({
      keyboard: true
    });
    $('#myModalLabel'+mapIdtoCity[justCity]).html(place);
  });
}

function displayModal(marker) {
  $('#modalGuadalajara').modal({
    keyboard: true
  });
  $('#myModalLabel').html(marker.place);
}

function hideModal() {
  $('#modalGuadalajara').modal('hide');
}

function createMarker(location, title, image) {
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    title: title,
    icon: image
  });
  return marker;
}

function placeMarker(e) {
  var place = document.getElementById("place").value;
  if (e.keyCode == 13 || e.type == 'click' && place != "") {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': place}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        new google.maps.Marker({
          position: new google.maps.LatLng(
            results[0].geometry.location.lat(), results[0].geometry.location.lng()),
            map: map,
            title: place,
            animation: google.maps.Animation.DROP,
            icon: futureLocation
        });
      }
    });
  }
}

google.maps.event.addDomListener(window, 'load', initialize);

