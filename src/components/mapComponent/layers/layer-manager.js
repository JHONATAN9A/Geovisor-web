import L from 'leaflet';


export const LayerManager = L.Control.extend({
  options: {
    position: 'topright',
    title: 'Capas',
    baseLayers: [],
    overlayLayers: []
  },

  onAdd(map) {
    this._map = map;

    // Contenedor principal para botón + panel
    const container = L.DomUtil.create('div', 'leaflet-control-layers leaflet-bar layer-manager shadow p-0');
    container.style.position = 'relative';

    // Botón que siempre está visible
    const button = L.DomUtil.create('button', 'btn btn-light btn-sm layer-manager-btn', container);
    button.title = this.options.title;
    button.innerHTML = `<i class="fas fa-layer-group fa-2x"></i>`;
    button.style.width = '50px';
    button.style.height = '50px';
    button.style.borderRadius = '0.25rem';
    button.style.color = "#688497";

    // Panel oculto inicialmente
    const panel = L.DomUtil.create('div', 'layer-manager-panel shadow bg-white p-3');
    container.appendChild(panel);

    // Evitar que clicks dentro del panel cierren el panel
    L.DomEvent.disableClickPropagation(panel);
    L.DomEvent.disableScrollPropagation(panel);

    // Construcción del contenido del panel
    const title = L.DomUtil.create('div', 'text-muted', panel);
    title.style.display = 'flex';
    title.style.alignItems = 'center';
    title.style.gap = '0.5rem';
    title.style.fontSize = '1.1rem';
    title.style.fontWeight = '600';
    title.style.color = '#333';
    title.style.borderBottom = '1px solid #eee';
    title.style.paddingBottom = '0.5rem';
    title.style.marginBottom = '1rem';

    // Icono FontAwesome
    const icon = document.createElement('i');
    icon.className = 'fas fa-globe';
    icon.style.fontSize = '1.2rem';
    icon.style.color = '#0d6efd';

    // Texto del título
    const text = document.createElement('span');
    text.textContent = this.options.title;

    // Añadir elementos al contenedor del título
    title.appendChild(icon);
    title.appendChild(text);

    // Capas base
    if (this.options.baseLayers.length) {
      const baseTitle = L.DomUtil.create('div', '', panel);
      baseTitle.textContent = 'Capas base';
      baseTitle.style.fontSize = '0.75rem';
      baseTitle.style.fontWeight = '600';
      baseTitle.style.color = '#6c757d'; // text-muted
      baseTitle.style.marginTop = '1rem';
      baseTitle.style.marginBottom = '0.5rem';

      this.options.baseLayers.forEach((item, index) => {
        const id = `base-layer-${index}`;

        const wrapper = L.DomUtil.create('div', '', panel);
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.gap = '0.5rem';
        wrapper.style.marginBottom = '0.5rem';

        const input = L.DomUtil.create('input', '', wrapper);
        input.type = 'radio';
        input.name = 'base-layer';
        input.id = id;
        input.value = index;
        input.style.margin = '0';

        const label = L.DomUtil.create('label', '', wrapper);
        label.htmlFor = id;
        label.style.display = 'flex';
        label.style.alignItems = 'center';
        label.style.gap = '0.5rem';
        label.style.cursor = 'pointer';
        label.style.fontSize = '0.9rem';
        label.style.color = '#333';

        if (item.icon) {
          const icon = document.createElement('i');
          icon.className = item.icon;
          icon.style.fontSize = '1rem';
          icon.style.color = '#0d6efd';
          label.appendChild(icon);
        }

        const textNode = document.createTextNode(item.name);
        label.appendChild(textNode);

        // Añadir cambio de capa
        input.addEventListener('change', () => {
          this.options.baseLayers.forEach(l => this._map.removeLayer(l.layer));
          this._map.addLayer(item.layer);
        });

        if (index === 0) {
          input.checked = true;
          this._map.addLayer(item.layer);
        }

        wrapper.appendChild(label);
      });
    }

    // Capas temáticas (overlay)
    if (this.options.overlayLayers.length) {
      const overlayTitle = L.DomUtil.create('div', '', panel);
      overlayTitle.textContent = 'Capas temáticas';
      overlayTitle.style.fontSize = '0.75rem';
      overlayTitle.style.fontWeight = '600';
      overlayTitle.style.color = '#6c757d';
      overlayTitle.style.marginTop = '1.5rem';
      overlayTitle.style.marginBottom = '0.5rem';

      this.options.overlayLayers.forEach((item, index) => {
        const id = `overlay-layer-${index}`;

        const wrapper = L.DomUtil.create('div', '', panel);
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.gap = '0.5rem';
        wrapper.style.marginBottom = '0.5rem';

        const input = L.DomUtil.create('input', '', wrapper);
        input.type = 'checkbox';
        input.id = id;
        input.value = index;
        input.style.margin = '0';

        const label = L.DomUtil.create('label', '', wrapper);
        label.htmlFor = id;
        label.style.display = 'flex';
        label.style.alignItems = 'center';
        label.style.gap = '0.5rem';
        label.style.cursor = 'pointer';
        label.style.fontSize = '0.9rem';
        label.style.color = '#333';

        if (item.icon) {
          const icon = document.createElement('i');
          icon.className = item.icon;
          icon.style.fontSize = '1rem';
          icon.style.color = '#0d6efd';
          label.appendChild(icon);
        }

        const textNode = document.createTextNode(item.name);
        label.appendChild(textNode);

        if (item.active) {
          this._map.addLayer(item.layer);
          input.checked = true;
        }

        input.addEventListener('change', () => {
          if (input.checked) {
            this._map.addLayer(item.layer);
          } else {
            this._map.removeLayer(item.layer);
          }
        });

        wrapper.appendChild(label);
      });
    }

    // Mostrar / ocultar panel con animación al hacer click en botón
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.classList.toggle('active');
    });

    // Evitar que clicks dentro del panel cierren el panel
    panel.addEventListener('click', e => {
      e.stopPropagation();
    });

    // Cerrar panel solo si se hace clic fuera del botón y del panel
    document.addEventListener('click', () => {
      panel.classList.remove('active');
    });

    return container;
  }
});

// Método para soportar capas asincrónicas
LayerManager.include({
  addAsyncOverlayLayer(name, layerPromise, options = {}) {
    layerPromise.then(layer => {
      if (!(layer instanceof L.Layer)) {
        console.error(`❌ La capa recibida para "${name}" no es una instancia válida de L.Layer`);
        return;
      }

      const overlayItem = {
        name,
        layer,
        icon: options.icon || null,
        active: options.active || false
      };

      this.options.overlayLayers.push(overlayItem);

      if (this._map) {
        if (overlayItem.active) {
          this._map.addLayer(overlayItem.layer);
        }

        // Solo si el panel ya está renderizado
        const container = this.getContainer();
        if (!container) return;

        const panel = container.querySelector('.layer-manager-panel');
        if (!panel) return;


        // Crear el wrapper para la nueva capa
        const index = this.options.overlayLayers.length - 1;
        const id = `overlay-layer-${index}`;

        const wrapper = L.DomUtil.create('div', '', panel);
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.gap = '0.5rem';
        wrapper.style.marginBottom = '0.5rem';

        const input = L.DomUtil.create('input', '', wrapper);
        input.type = 'checkbox';
        input.id = id;
        input.value = index;
        input.style.margin = '0';
        input.checked = overlayItem.active;

        const label = L.DomUtil.create('label', '', wrapper);
        label.htmlFor = id;
        label.style.display = 'flex';
        label.style.alignItems = 'center';
        label.style.gap = '0.5rem';
        label.style.cursor = 'pointer';
        label.style.fontSize = '0.9rem';
        label.style.color = '#333';

        if (overlayItem.icon) {
          const icon = document.createElement('i');
          icon.className = overlayItem.icon;
          icon.style.fontSize = '1rem';
          icon.style.color = '#0d6efd';
          label.appendChild(icon);
        }

        label.appendChild(document.createTextNode(overlayItem.name));

        input.addEventListener('change', () => {
          if (input.checked) {
            this._map.addLayer(overlayItem.layer);
          } else {
            this._map.removeLayer(overlayItem.layer);
          }
        });

        wrapper.appendChild(label);
      }
    }).catch(err => {
      console.error(`❌ Error al cargar capa "${name}":`, err);
    });
  }
});

// Factory
export function layerManager(options) {
  return new LayerManager(options);
}