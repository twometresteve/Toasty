

function isUrl(needle) {
  return window.location.href.indexOf(needle) > -1 ? true : false;
}
/*
function SwitchToDarkSide(){
  var elem = document.body;
  elem.classList.toggle('dark-mode')
}*/

$(document).ready(function() {
  var map = L.map('map', { crs: L.CRS.Simple, maxZoom: 5 })

  var bounds = [[-375, -375], [375, 375]];
  L.imageOverlay('/api/map.jpg', bounds).addTo(map);
  map.fitBounds([[-375, -375], [375, 375]])
  map.setMaxBounds([[-375, -375], [375, 375]])

  map.on('drag', function () {
    map.panInsideBounds([[-375, -375], [375, 375]], { animate: false })
  })

  $.ajax({
    type: "GET",
    url: "/api/geo.json",
    dataType: "json",
    success: function (geojson) {
      console.log('aywhoo')
      new L.GeoJSON(geojson, { onEachFeature: onEachFeature }).addTo(map);
    }
  });
});

function onEachFeature(feature, layer) {
  if (layer instanceof L.Marker) {
    console.log('yoooo im hereeeeeee')
    layer.bindPopup(layer.feature.properties.popup)
    var customIcon = L.icon({
      iconUrl: '/images/icons/'+layer.feature.properties.icon.icon,
      iconSize: [layer.feature.properties.icon.dimension, layer.feature.properties.icon.dimension],
      iconAnchor: [(layer.feature.properties.icon.dimension / 2), (layer.feature.properties.icon.dimension/2)],
      popupAnchor: [0, -10]
    })
    layer.setIcon(customIcon)
    console.log(layer)
  }
};