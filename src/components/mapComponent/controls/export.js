import L from 'leaflet';
import domtoimage from 'dom-to-image'; // asegúrate de tener dom-to-image instalado
import jsPDF from 'jspdf';

export const ExportPdfControl = L.Control.extend({
  options: {
    position: 'topright',
    title: 'Exportar vista a PDF',
  },

  onAdd(map) {
    this._map = map;

    const container = L.DomUtil.create('div', 'leaflet-control-layers leaflet-bar layer-manager shadow p-0');
    container.style.position = 'relative';

    const button = L.DomUtil.create('button', 'btn btn-light btn-sm layer-manager-btn', container);
    button.title = this.options.title;
    button.innerHTML = `<i class="fas fa-file-pdf fa-2x"></i>`; 
    button.style.width = '50px';
    button.style.height = '50px';
    button.style.borderRadius = '0.25rem';
    button.style.color = '#688497';

    L.DomEvent.disableClickPropagation(button);
    L.DomEvent.disableScrollPropagation(button);

    L.DomEvent.on(button, 'click', async (e) => {
      L.DomEvent.stopPropagation(e);
      L.DomEvent.preventDefault(e);
      await this._exportMapToPDF();
    }, this);

    this._container = container;
    return container;
  },

  async _exportMapToPDF() {
    const loadingDiv = L.DomUtil.create('div', 'pdf-export-loading');
    Object.assign(loadingDiv.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000,
      color: 'white',
      fontSize: '40px',
      fontFamily: 'Inconsolata, monospace',
    });
    loadingDiv.innerText = 'Exportando PDF...';
    document.body.appendChild(loadingDiv);

    try {
      const mapContainer = this._map.getContainer();

      const dataUrl = await domtoimage.toPng(mapContainer, {
        quality: 1,
        width: mapContainer.offsetWidth,
        height: mapContainer.offsetHeight
      });

      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        const imgWidthPx = img.width;
        const imgHeightPx = img.height;

        const pxToMm = px => px * 0.264583;
        const pdfWidthMm = pxToMm(imgWidthPx);
        const pdfHeightMm = pxToMm(imgHeightPx);

        const pdf = new jsPDF({
          orientation: pdfWidthMm > pdfHeightMm ? 'landscape' : 'portrait',
          unit: 'mm',
          format: [pdfWidthMm, pdfHeightMm]
        });

        pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidthMm, pdfHeightMm);
        pdf.save('map-leaflet-export.pdf');

        document.body.removeChild(loadingDiv);
      };

    } catch (error) {
      console.error('Error exportando a PDF:', error);
      const existingOverlay = document.querySelector('.pdf-export-loading');
      if (existingOverlay) existingOverlay.remove();
      alert('Hubo un error al generar el PDF. Revisa la consola para más detalles.');
    }
  },

  onRemove() {
    if (this._container) {
      const button = this._container.querySelector('.layer-manager-btn');
      if (button) {
        L.DomEvent.off(button);
      }
    }
  }
});

export function exportPdfControl(options) {
  return new ExportPdfControl(options);
}