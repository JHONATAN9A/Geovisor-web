import L from 'leaflet'
import { AwesomeMarkersIcon } from '../controls/icons/famIcon'
import { GetLayerGeoserverWFS } from './request-geoserver'
import { layerManager } from './layer-manager'

// BASEMAPS 
export var standard_osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '©OpenStreetMap, ©Standard',minZoom: 0, maxZoom: 24, subdomains: 'abcd', crossOrigin: true});
export var standard_osm_mm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '©OpenStreetMap, ©Standard',minZoom: 0, maxZoom: 24, subdomains: 'abcd', crossOrigin: true});
export var carto_light = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {attribution: '©OpenStreetMap, ©CartoDB', maxZoom: 24, subdomains: 'abcd', crossOrigin: true});


export var marker_center = L.marker([10.497022774155928, -75.12593698356005], {icon: AwesomeMarkersIcon('fa', 'fa-hand-point-up', 'blue')})


export function controlLayersMap(map){
    const control_layers = layerManager({
    title: 'Control de Capas',
    baseLayers: [
        { name: 'Mapa Clásico', layer: standard_osm, icon: 'fas fa-map' },
        { name: 'Mapa Claro', layer: carto_light, icon: 'fas fa-map' }
    ],
    overlayLayers: [
        { name: 'Marcador Central', layer: marker_center, icon: 'fas fa-location-dot', active: true },
    ]
    }).addTo(map);

    // Layers Geoserver
    control_layers.addAsyncOverlayLayer("Predios Repelon", GetLayerGeoserverWFS("repelon:lc_terreno", {active: true, atribute:['etiqueta', 'area_terreno']}, {color: 'orange', fillcolor: 'yellow'}, true), { icon: 'fas fa-map', active: true });
    control_layers.addAsyncOverlayLayer("Sector Rural", GetLayerGeoserverWFS("repelon:cc_sectorrural", {active: false, atribute:[]} , {color: '#b2cc9f', fillcolor: '#b5ae80'}, false), { icon: 'fas fa-map', active: false });
    control_layers.addAsyncOverlayLayer("Zonas Homogeneas Rural", GetLayerGeoserverWFS("repelon:av_zonahomogeneafisicarural", {active: false, atribute:[]}, {color: '#7d9ffb', fillcolor: '#445daa'}, false), { icon: 'fas fa-map', active: false });

}
