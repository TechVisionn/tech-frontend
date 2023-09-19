import React, { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet-easyprint";
import "../App.css";

const search = new GeoSearchControl({
  provider: new OpenStreetMapProvider(),
  autoComplete: true,
  style: 'bar',
  notFoundMessage: 'Endereço não encontrado!',
  searchLabel: 'Buscar endereço',
  showMarker: false,
  showPopup: false,
  autoClose: true
});

const exportPrint = L.easyPrint({
  title: 'Imprimir Mapa',
  position: 'topleft',
  sizeModes: ['A4Landscape'],
  filename: 'mapa',
  exportOnly: true,
  hideControlContainer: true,
});

class Mapa extends Component {
  constructor(props) {
    super(props);
    this.handleZoomReset = this.handleZoomReset.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.leafletMap.addControl(search);
      this.leafletMap.addControl(exportPrint);
      this.addCustomZoomResetControl(); // Adicione o controle personalizado
    }, 100);
  }

  addCustomZoomResetControl() {
    if (!this.customZoomResetControl) {
      this.customZoomResetControl = L.control({ position: 'topleft' });

      this.customZoomResetControl.onAdd = () => {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        const zoomResetButton = L.DomUtil.create('a', 'leaflet-control-zoom-reset leaflet-bar-part', container);
        
        zoomResetButton.href = '#';
        zoomResetButton.title = 'Redefinir Zoom';
        zoomResetButton.innerHTML = '↻';

        L.DomEvent.on(zoomResetButton, 'click', this.handleZoomReset);

        return container;
      };

      this.customZoomResetControl.addTo(this.leafletMap);
    }
  }

  handleZoomReset() {
    this.leafletMap.setView([-16, -55], 5); // Define o centro e o nível de zoom desejados
  }

  render() {
    return (
      <div id="mapa">
        <MapContainer center={[-16, -55]} zoom={5} style={{ height: "100vh" }} ref={ref => this.leafletMap = ref}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>
    );
  }
}

export default Mapa;

