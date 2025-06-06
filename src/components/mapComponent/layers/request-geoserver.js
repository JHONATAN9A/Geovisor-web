import { CreateLayerGeojson } from './create-layer'
import { createGraphBar } from '../../statistics/graph-bar'

export async function GetLayerGeoserverWFS(nameLayer, attributes, styles, graph) {
  const url = new URL(process.env.URL_GEOSERVER);

  url.searchParams.set("service", "WFS");
  url.searchParams.set("version", "1.0.0");
  url.searchParams.set("request", "GetFeature");
  url.searchParams.set("typeName", nameLayer);
  url.searchParams.set("outputFormat", "application/json");
  url.searchParams.set("authkey", process.env.AUTHKEY);
  url.searchParams.set("srsName", "EPSG:4326");

  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const geojson = await response.json();
    //console.log("Datos recibidos:", geojson);
    let layer = CreateLayerGeojson(geojson, attributes, styles);
    
    if(graph) createGraphBar(layer)
    
    return layer

  } catch (error) {
    console.error("Error al obtener la capa WFS:", error);
  }
}