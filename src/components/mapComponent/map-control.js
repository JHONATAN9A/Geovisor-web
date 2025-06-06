import 'leaflet/dist/leaflet.css';
import './map.scss';

const L =require ('leaflet');
import { standard_osm } from './layers/control-layers'
import { minimap } from './controls/minimap'
import { controlLayersMap } from './layers/control-layers'
import { exportPdfControl } from './controls/export'
import { statisticsModal } from './controls/statistics'


// Map
export var map = L.map('map', {
    center: [10.497022774155928, -75.12593698356005],
    zoom: 14,
    layers: [standard_osm]
});

// Add Plugins 
minimap.addTo(map) // Minimap
map.addControl(exportPdfControl()); // Export PDF
map.addControl(statisticsModal()); // Statistics
controlLayersMap(map) // Control Layers
