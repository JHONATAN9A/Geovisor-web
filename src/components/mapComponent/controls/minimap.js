import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import 'leaflet-minimap/dist/Control.MiniMap.min.css';
import 'leaflet-minimap/dist/Control.MiniMap.min.js';


const L =require ('leaflet');


export function minimapa(capa){
    var osm2 = new L.TileLayer(capa, {minZoom: 2, maxZoom: 10});
    var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true });
    return  miniMap;
}



