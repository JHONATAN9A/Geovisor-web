export function CreateLayerGeojson(geojson, attributes, styles) {
  if (!geojson || !geojson.features) {
    console.error("GeoJSON inválido:", geojson);
    return null;
  }

  const highlightStyle = {
    color: styles.color,
    weight: 4,
    fillColor: styles.fillcolor,
    fillOpacity: 0.7,
  };

  let selectedLayer = null;

  // Capa GeoJSON completa
  const geojsonLayer = L.geoJSON(geojson, {
    style: {
      color: styles.color,
      weight: 2,
      fillColor: styles.fillcolor,
      fillOpacity: 0.3,
    },
    onEachFeature: (feature, layer) => {
      if(attributes.active){
        const props = feature.properties;
        let popup = '';
        attributes.atribute.forEach(item => {
          popup += `<strong>${item}:</strong> ${props[item] || "Sin información"}<br>`
        });
        layer.bindPopup(popup);

        layer.on('click', () => {
          if (selectedLayer && selectedLayer !== layer) {
            geojsonLayer.resetStyle(selectedLayer);
          }
          layer.setStyle(highlightStyle);
          selectedLayer = layer;
        });
      }
      
    }
  });

  return geojsonLayer;
}