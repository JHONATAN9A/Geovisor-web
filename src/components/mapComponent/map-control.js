import 'jquery/dist/jquery.min.js';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import 'leaflet-minimap/dist/Control.MiniMap.min.css';
import 'leaflet-minimap/dist/Control.MiniMap.min.js';
import 'leaflet-geoserver-request/src/L.Geoserver.js';
import './controls/L.Crosshairs.js';
import 'geojson/geojson.js';
import 'ajax/lib/ajax.js';
import './map.scss';

//importar scripts para plugins de leaflet.
import {minimapa} from './controls/minimap.js'
import {crosshairs} from './controls/Crosshairs.js'
import {options} from './controls/Crosshairs.js'
import {dynamicMarker} from './controls/markers.js'

//import las url de los mapas base.
import {standard_osm2} from './layers/control-layers'
import {standard_osm_mm2} from './layers/control-layers'


const L =require ('leaflet');

//Crear el objeto para el puntero.
var crosshair = L.crosshairs(options());

//Genera el mapa base dentro del html, con la unbicación de yopal. 
var map = new L.map('map');
var osmAttrib='Map data & copy; OpenStreetMap contributors';
var osm = new L.TileLayer(standard_osm2, {minZoom: 2, maxZoom: 17, attribution: osmAttrib, layers:crosshair});
map.addLayer(osm);
map.setView(new L.LatLng(5.34023, -72.3923),13);

//Genera un marcador en las coordenadas especificadas.
var Icono = L.icon({
    iconUrl: 'https://image.flaticon.com/icons/svg/854/854866.svg',
  iconSize: [50, 50],
  iconAnchor: [25, 50]
});

const marker = dynamicMarker(Icono,map.getCenter(),5);
marker.addTo(map); 

//Genera el menu de opciones para el puntero. 
const Optionslayer = crosshairs(osm,crosshair);
map.addControl(Optionslayer);

//Genera un mini mapa para el mapa general. 
const minimap = minimapa(standard_osm_mm2);
minimap.addTo(map);

//Conexion con geoserver wms.
var layer_per = L.Geoserver.wms('http://34.132.27.64:8080/geoserver/wms', {
    layers: 'yopal:u_perimetro',
});
layer_per.addTo(map);



//conexion geoserver wfs
var urlgeojson = 'http://34.132.27.64:8080/geoserver/yopal/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=yopal%3Au_terreno&outputFormat=application%2Fjson';
 
            
$.ajax({
    url: urlgeojson,
    success: function (data) {
        var geojson = new L.geoJson(data, {
            style: { 
            'color': "#20b0d8",
            'weight': 0.7,
            'opacity': 0.9},
            onEachFeature: function(feature, layer){
                layer.bindPopup ("</h3><li>Codigo: " +feature.properties.codigo+"</li><li>Area: "+feature.properties.shape_area+"</li></ul>");
            }}
        );
        geojson.addTo(map);
        map.fitBounds(geojson.getBounds());
    }
});




new L.control.scale({imperial: false}).addTo(map);

// scale control
L.control.zoom({position: 'topright'}).addTo(map);



/*import {standard_osm} from './layers/control-layers'

export var map = L.map('map', {
    center: [5.340230106263151, -72.39237451296074],
    zoom: 11,
    layers: [standard_osm]
});


L.control.zoom({position: 'topright'}).addTo(map);

// scale control
new L.control.scale({imperial: false}).addTo(map);*/

