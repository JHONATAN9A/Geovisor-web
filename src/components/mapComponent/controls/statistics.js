import L from 'leaflet';

export const StatisticsModal = L.Control.extend({
  options: {
    position: 'bottomleft',
    title: 'Predios Clasificados por Superficie en Hectáreas',
  },

  onAdd(map) {
    this._map = map;

    // Contenedor principal para el botón
    const container = L.DomUtil.create('div', 'leaflet-control leaflet-bar toggle-bottom-modal-control');
    container.style.position = 'relative';

    // Botón que abre/cierra modal
    const button = L.DomUtil.create('button', 'btn btn-light btn-sm toggle-modal-btn', container);
    button.title = this.options.title;
    button.innerHTML = `<i class="fas fa-chart-line fa-2x"></i>`;
    button.style.width = '50px';
    button.style.height = '50px';
    button.style.borderRadius = '0.25rem';
    button.style.color = '#688497';

    L.DomEvent.disableClickPropagation(button);
    L.DomEvent.disableScrollPropagation(button);

    // Modal (vacío por ahora, se monta al abrir)
    this._modalContainer = null;

    L.DomEvent.on(button, 'click', (e) => {
      L.DomEvent.stopPropagation(e);
      L.DomEvent.preventDefault(e);
      this._toggleModal();
    }, this);

    this._button = button;
    this._container = container;
    this._showModal();

    return container;
  },

  _createModal() {
    if (this._modalContainer) return; // Ya existe

    const container = L.DomUtil.create('div', 'leaflet-control bottom-modal shadow p-3');
    container.style.position = 'absolute';
    container.style.left = '10px';
    container.style.right = '10px';
    container.style.bottom = '10px';
    container.style.background = 'rgba(255, 255, 255, 0.95)';
    container.style.zIndex = '9999';
    container.style.borderTop = '1px solid #ccc';
    container.style.width = '90%';
    container.style.maxWidth = '600px';
    container.style.height = 'auto';
    container.style.maxHeight = '70vh';
    container.style.overflowY = 'auto';
    container.style.borderRadius = '5px';
    container.style.padding = '1rem';
    container.style.boxSizing = 'border-box';

    container.innerHTML = `
      <div class="d-flex justify-content-between align-items-center mb-2">
        <strong class="text-muted" style="font-size:18px;">${this.options.title}</strong>
        <button id="modal-close-btn" class="btn btn-sm btn-outline-secondary">&times;</button>
      </div>
      <div id="modal-content" style="min-height: 40vh;">
        <div style="width: 100%; height: 40vh;">
          <canvas id="myChart" style="max-width: 100%; height: auto;"></canvas>
        </div>
      </div>
    `;

    L.DomEvent.disableClickPropagation(container);
    L.DomEvent.disableScrollPropagation(container);

    this._map.getContainer().appendChild(container);

    const closeBtn = container.querySelector('#modal-close-btn');
    closeBtn.style.height = '35px';
    closeBtn.style.width = '35px';
    closeBtn.style.borderRadius = '50%';

    L.DomEvent.on(closeBtn, 'click', (e) => {
      L.DomEvent.stopPropagation(e);
      this._hideModal();
    });

    this._modalContainer = container;
  },

  _toggleModal() {
    if (this._modalContainer && this._modalContainer.style.display !== 'none') {
      this._hideModal();
    } else {
      this._showModal();
    }
  },

  _showModal() {
    if (!this._modalContainer) {
      this._createModal();
    }
    this._modalContainer.style.display = 'block';
    this._button.style.backgroundColor = '#d0e7ff'; // Cambio visual botón activo
  },

  _hideModal() {
    if (this._modalContainer) {
      this._modalContainer.style.display = 'none';
      this._button.style.backgroundColor = ''; // Reset color botón
    }
  },

  /**
   * Método para insertar contenido HTML dinámico en el modal
   * @param {string} html 
   */
  setContent(html) {
    if (!this._modalContainer) {
      this._createModal();
    }
    const contentDiv = this._modalContainer.querySelector('#modal-content');
    contentDiv.innerHTML = html;
  },

  onRemove() {
    if (this._modalContainer) {
      this._modalContainer.remove();
      this._modalContainer = null;
    }
    if (this._button) {
      L.DomEvent.off(this._button);
    }
  }
});

export function statisticsModal(options) {
  return new StatisticsModal(options);
}