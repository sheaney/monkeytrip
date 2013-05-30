var initLat = 29.4241219;
var initLng = -98.49362819999999;
var initZoom = 4;
var map;
var projection;
var userMarker;
var markers = [];

var locations = [
  new google.maps.LatLng(17.987557, -92.929147),
  new google.maps.LatLng(19.4326077, -99.13320799999997),
  new google.maps.LatLng(21.158964, -86.84593699999999),
  new google.maps.LatLng(22.8905327, -109.91673709999998),
  new google.maps.LatLng(22.7708555, -102.5832426),
  new google.maps.LatLng(19.046795, -98.20922300000001),
  new google.maps.LatLng(16.0981746, -93.75170830000002),
  new google.maps.LatLng(28.345331, -101.66817100000003),
  new google.maps.LatLng(20.719148, -105.20912599999997),
  new google.maps.LatLng(20.97, -89.62),
  new google.maps.LatLng(42.3584308, -71.0597732),
  new google.maps.LatLng(42.366667, -72.51666699999998),
  new google.maps.LatLng(40.7143528, -74.0059731),
  new google.maps.LatLng(25.7889689, -80.22643929999998),
  new google.maps.LatLng(30.267153, -97.74306079999997),
  new google.maps.LatLng(41.2523634, -95.99798829999997),
  new google.maps.LatLng(32.7801399, -96.80045109999998),
  new google.maps.LatLng(41.8781136, -87.62979819999998)
];
var places = [
  "villahermosa, mexico", "mexico city, mexico", "cancun, mexico",
  "cabo san lucas, mexico", "zacatecas, mexico", "puebla, mexico",
  "tuxtla gutierrez, mexico", "rosita,mexico", "ixtapa zihuatanejo, mexico", "merida, mexico",
  "boston, usa", "amherst, usa", "new york, usa", "miami, usa",
  "austin, usa", "omaha, usa","dallas, usa", "chicago, usa"
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
    center: new google.maps.LatLng(initLat, initLng),
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

  marker = createMarker(new google.maps.LatLng(20.6596492, -103.34962510000003), "guadalajara, mexico",
                        pastLocation);

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

  google.maps.event.addListener(marker, 'click', function() {
    $('#modalGuadalajara').modal({
      keyboard: true
    });
  });

  markers.push(marker);

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
}

function geoError() {
  place = "san francisco, usa";
  userMarker = createMarker(new google.maps.LatLng(37.7749295, -122.41941550000001), place,
                            currentLocation);
  showModal(userMarker, place);
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
  google.maps.event.addListener(marker, 'click', function() {
    $('#myModal').modal({
      keyboard: true
    });
    $('#myModalLabel').html(place);
  });
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

