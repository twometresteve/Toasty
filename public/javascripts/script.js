

function isUrl(needle) {
  return window.location.href.indexOf(needle) > -1 ? true : false;
}

function queryAllSet(card, listgroup, listgroupitem){
  const cardQuery = document.querySelectorAll(card);
  const listgroupQuery = document.querySelectorAll(listgroup);
  const listgroupitemQuery = document.querySelectorAll(listgroupitem);

  cardQuery.forEach(x=>x.style.setProperty('background-color', '#090909'));
  listgroupQuery.forEach(x=>x.style.setProperty('--bs-list-group-color', '#fff'));
  listgroupQuery.forEach(x=>x.style.setProperty('--bs-list-group-bg', '#171717'));
  listgroupQuery.forEach(x=>x.style.setProperty('--bs-list-group-border-color', 'rgba(255, 255, 255, 0.13)'));
  listgroupitemQuery.forEach(x=>x.style.setProperty('color', '#afe0f3'));
}

function queryAllRemove(card, listgroup, listgroupitem){
  const cardQuery = document.querySelectorAll(card);
  const listgroupQuery = document.querySelectorAll(listgroup);
  const listgroupitemQuery = document.querySelectorAll(listgroupitem);

  cardQuery.forEach(x=>x.style.removeProperty('background-color'));
  listgroupQuery.forEach(x=>x.style.removeProperty('--bs-list-group-color'));
  listgroupQuery.forEach(x=>x.style.removeProperty('--bs-list-group-bg'));
  listgroupQuery.forEach(x=>x.style.removeProperty('--bs-list-group-border-color'));
  listgroupitemQuery.forEach(x=>x.style.setProperty('color', '#000'));
}


function SwitchToDarkSide(){
  if (!localStorage.getItem('isDark')) {
    document.body.classList.toggle('dark-mode')
    queryAllSet('.card', '.list-group', '.list-group-item > a')
    localStorage.setItem('isDark', true)
  } else {
    document.body.classList.toggle('dark-mode')
    queryAllRemove('.card', '.list-group', '.list-group-item > a')
    localStorage.removeItem('isDark')
  }
}

$(document).ready(function() {
  if (localStorage.getItem('isDark')) {
    document.body.classList.toggle('dark-mode')
    queryAllSet('.card', '.list-group', '.list-group-item > a')
  } else document.querySelectorAll('.list-group-item > a').forEach(x=>x.style.setProperty('color', '#000'))

  if (['/silage', '/grain'].includes(window.location.pathname)) {
    var map = L.map('map', { crs: L.CRS.Simple, maxZoom: 5 })

    var bounds = [[-375, -375], [375, 375]];
    L.imageOverlay('/api/map.jpg', bounds).addTo(map);
    map.fitBounds([[-375, -375], [375, 375]])
    map.setMaxBounds([[-375, -375], [375, 375]])

    map.on('drag', function () {
      map.panInsideBounds([[-374, -374], [374, 374]], { animate: false })
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
  }
});

function onEachFeature(feature, layer) {
  if (layer instanceof L.Marker) {
    layer.bindPopup(layer.feature.properties.popup)
    var customIcon = L.icon({
      iconUrl: '/images/icons/'+layer.feature.properties.icon.icon,
      iconSize: [layer.feature.properties.icon.dimension, layer.feature.properties.icon.dimension],
      iconAnchor: [(layer.feature.properties.icon.dimension / 2), (layer.feature.properties.icon.dimension/2)],
      popupAnchor: [0, -10]
    })
    layer.setIcon(customIcon)
  }
};