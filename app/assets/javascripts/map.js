var initLat = 29.4241219;
var initLng = -98.49362819999999;
var initZoom = 4;
var map;

var guadalajaraPos = new google.maps.LatLng(20.6596492, -103.34962510000003);
var villahermosaPos = new google.maps.LatLng(17.987557, -92.929147);
var mexicoCityPos = new google.maps.LatLng(19.4326077, -99.13320799999997);
var cancunPos = new google.maps.LatLng(21.158964, -86.84593699999999);
var caboPos = new google.maps.LatLng(22.8905327, -109.91673709999998);
var monterreyPos = new google.maps.LatLng(25.6732109, -100.30920100000003);
var zacatecasPos = new google.maps.LatLng(22.7708555, -102.5832426);
var pueblaPos = new google.maps.LatLng(19.046795, -98.20922300000001);
var tuxtlaPos = new google.maps.LatLng(16.0981746, -93.75170830000002);
var rositaPos = new google.maps.LatLng(28.345331, -101.66817100000003);
var ixtapaPos = new google.maps.LatLng(20.719148, -105.20912599999997);
var meridaPos = new google.maps.LatLng(20.97, -89.62);
var bostonPos = new google.maps.LatLng(42.3584308, -71.0597732);
var amherstPos = new google.maps.LatLng(42.366667, -72.51666699999998);
var nyPos = new google.maps.LatLng(40.7143528, -74.0059731);
var miamiPos = new google.maps.LatLng(25.7889689, -80.22643929999998);
var austinPos = new google.maps.LatLng(30.267153, -97.74306079999997);
var omahaPos = new google.maps.LatLng(41.2523634, -95.99798829999997);
var dallasPos = new google.maps.LatLng(32.7801399, -96.80045109999998);
var chicagoPos = new google.maps.LatLng(41.8781136, -87.62979819999998);
var futurePos = 'pin_green.png';
var currentPos = 'pin_black.png';
var pastPos = 'pin_teal.png';

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
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [ { "lightness": 30 } ] }
  ];
  var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

  map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(initLat, initLng),
    zoom: initZoom,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  });

  map.mapTypes.set("map", styledMap);
  map.setMapTypeId("map");

  new google.maps.Marker({
    position: guadalajaraPos,
    map: map,
    title: "Guadalajara",
    icon: pastPos
  });
  new google.maps.Marker({
    position: villahermosaPos,
    map: map,
    title: "Villahermosa",
    icon: pastPos
  });
  new google.maps.Marker({
    position: cancunPos,
    map: map,
    title: "Cancun",
    icon: pastPos
  });
  new google.maps.Marker({
    position: monterreyPos,
    map: map,
    title: "Monterrey",
    icon: currentPos
  });
  new google.maps.Marker({
    position: caboPos,
    map: map,
    title: "Cabo San Lucas",
    icon: pastPos
  });
  new google.maps.Marker({
    position: tuxtlaPos,
    map: map,
    title: "Tuxtla Gutiérrez",
    icon: pastPos
  });
  new google.maps.Marker({
    position: ixtapaPos,
    map: map,
    title: "Ixtapa Zihuatanejo",
    icon: pastPos
  });
  new google.maps.Marker({
    position: mexicoCityPos,
    map: map,
    title: "Mexico City",
    icon: pastPos
  });
  new google.maps.Marker({
    position: pueblaPos,
    map: map,
    title: "Puebla",
    icon: pastPos
  });
  new google.maps.Marker({
    position: rositaPos,
    map: map,
    title: "Rosita",
    icon: pastPos
  });
  var bostonMarker = new google.maps.Marker({
    position: bostonPos,
    map: map,
    title: "Boston",
    icon: pastPos
  });
  new google.maps.Marker({
    position: nyPos,
    map: map,
    title: "New York",
    icon: pastPos
  });
  new google.maps.Marker({
    position: austinPos,
    map: map,
    title: "Austin",
    icon: pastPos
  });
  new google.maps.Marker({
    position: omahaPos,
    map: map,
    title: "Omaha",
    icon: pastPos
  });
  new google.maps.Marker({
    position: dallasPos,
    map: map,
    title: "Dallas",
    icon: pastPos
  });
  new google.maps.Marker({
    position: miamiPos,
    map: map,
    title: "Miami",
    icon: pastPos
  });
  new google.maps.Marker({
    position: amherstPos,
    map: map,
    title: "Amherst",
    icon: pastPos
  });
  new google.maps.Marker({
    position: zacatecasPos,
    map: map,
    title: "Zacatecas",
    icon: pastPos
  });
  new google.maps.Marker({
    position: chicagoPos,
    map: map,
    title: "Chicago",
    icon: pastPos
  });
  new google.maps.Marker({
    position: meridaPos,
    map: map,
    title: "Mérida",
    icon: pastPos
  });

  google.maps.event.addListener(bostonMarker, 'click', function() {
	  $('#myModal').modal({
          keyboard: true
      })
  });

  new google.maps.places.Autocomplete(document.getElementById('place'), { types: ['(cities)'] });
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
            icon: futurePos
        });
      }
    });
  }
}

google.maps.event.addDomListener(window, 'load', initialize);
