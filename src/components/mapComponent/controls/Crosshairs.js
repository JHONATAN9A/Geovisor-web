import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/leaflet.js';
import './L.Crosshairs.js'

const L =require ('leaflet');

export function options (){
    var crosshairOptions = {
        style: {
          opacity: 0.3,
          fillOpacity: 0.1,
          weight: 1,
          color: '#B80000',
          radius: 30
        }
    };  

    return crosshairOptions

};


export function crosshairs(capa,capa2){
    
    var baseLayers = {
        'Mapa base': capa
    };
    
    var overlayLayers = {
        'Puntero': capa2
    };

    var controlLayers = new L.Control.Layers(baseLayers, overlayLayers);
    return controlLayers;

};
