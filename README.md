# Visor Geográfico - Municipio de Repelón

Descripción:  
Este proyecto usa Node.js y Leaflet.js para visualizar información geoespacial  
del municipio de Repelón. Incluye funcionalidades avanzadas para manejo y  
visualización de capas, gráficas interactivas y herramientas de impresión.

## Características principales

- Mapa centrado en el municipio de Repelón.  
- Cambio del mapa base por uno distinto al predeterminado.  
- Mapa ocupa el 100% del área visible.  
- Plugin MiniMap para mapa pequeño de contexto.  
- Control de capas para activar o desactivar capas geográficas.  
- Gráfica interactiva con cantidad de predios por área en hectáreas.  
  Al seleccionar una barra, se resaltan los predios relacionados en el mapa.  
- Marcador (marker) en el centro del municipio.  
- Conexión a GeoServer remoto.  
- Carga de capas:  
  * repelon:lc_terreno  
  * repelon:cc_sectorrural
  * repelon:av_zonahomogeneafisicarural 
- Al hacer clic en un predio de lc_terreno:  
  Se resalta el terreno.  
  Se muestra un modal con los atributos:  
  - etiqueta  
  - area_terreno  
- Herramienta para imprimir en PDF la vista actual del mapa.  
- Código refactorizado, comentado y reutilizable.  
- Diseño responsive para móviles y escritorio.

## Instalación y ejecución

1. Clonar repositorio:  
   `git clone https://github.com/JHONATAN9A/MAP-Leaflet-Node.js`  
   `cd MAP-Leaflet-Node.js`

2. Instalar dependencias:  
   `npm install`

3. Ejecutar servidor de desarrollo:  
   `npm run dev`

4. Abrir navegador en:  
   http://localhost:3000

---