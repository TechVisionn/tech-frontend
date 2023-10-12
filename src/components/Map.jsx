import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import { Chart } from "primereact/chart";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet-easyprint";
import "../components/Assets/styles/App.css";
import "leaflet-geosearch/dist/geosearch.css";
import 'primeicons/primeicons.css';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const search = new GeoSearchControl({
  provider: new OpenStreetMapProvider({
    params: {
      countrycodes: 'BR',
    },
  }),
  autoComplete: true,
  style: 'bar',
  notFoundMessage: 'Endereço não encontrado!',
  searchLabel: 'Buscar endereço',
  showMarker: false,
  showPopup: false,
  autoClose: true
});

const coordenadasPoligono = [
  {
    nu_identificador: 12458727,
    data_emissao: "29/11/2022",
    tp_seguro: 9,
    altitude: 598,
    coordenadas: [
      [-23.2237, -45.9400],
      [-23.2140, -45.9420],
      [-23.2153, -45.9410],
      [-23.2243, -45.9330],
      [-23.2276, -45.9340]
    ],
  },
  {
    nu_identificador: 12458728,
    data_emissao: "06/08/2021",
    tp_seguro: 9,
    altitude: 598,
    coordenadas: [
      [-23.2240, -45.8596],
      [-23.2180, -45.8475],
      [-23.2146, -45.8369],
      [-23.2279, -45.8475],
      [-23.2210, -45.8322]
    ],
  },
  {
    nu_identificador: 12458729,
    data_emissao: "14/04/2023",
    tp_seguro: 9,
    altitude: 598,
    coordenadas: [
      [-23.2763, -45.8596],
      [-23.2745, -45.8475],
      [-23.2862, -45.8369]
    ],
  }
];

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
    this.state = {
      plotarGlebas: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.leafletMap.addControl(search);
      this.leafletMap.addControl(exportPrint);
      this.addCustomZoomResetControl();
      this.leafletMap.on('zoom', this.handleZoomChange);
      this.leafletMap.on('moveend', this.handleZoomChange);
    }, 100);
  }

  handleZoomChange = (event) => {
    const currentZoom = event.target.getZoom();
    if (currentZoom >= 13) {
      this.setState({ plotarGlebas: true });
      console.log('plot')
    } else {
      this.setState({ plotarGlebas: false });
    }
  };

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
    this.leafletMap.setView([-21, -49], 7);
  }

  renderizarGlebas() {
    const glebasParaPlotar = [];
    coordenadasPoligono.map(gleba => {
      if (this.leafletMap.getBounds().contains(gleba.coordenadas)) {
        glebasParaPlotar.push(gleba);
      }
    })
    return glebasParaPlotar.map((gleba, index) => (
      <Polygon
        key={index}
        positions={gleba.coordenadas}
        color="green"
        fillColor="darkgreen"
        weight={2}
      >
        <Popup>
          <center><h3 style={{ fontFamily: "system-ui", color: "darkgreen" }}>INFORMAÇÕES DA GLEBA</h3></center>
          <div style={{ fontSize: 15, fontFamily: "system-ui" }}>
            Número Referência: { gleba.nu_identificador }
            <br/>
            Data emissão: { gleba.data_emissao }
            <br/>
            Tipo Seguro: { gleba.tp_seguro }
            <br/>
            Altitude: { gleba.altitude }
            <br/>
            Coordenadas: { gleba.coordenadas }
          </div>
          <br/>
          <center><Button icon="pi pi-download" severity="success" size="small" label="Baixar relatório" /></center>
        </Popup>
      </Polygon>
    ));
  }

  render() {
    return (
      <div id="mapa">
        <MapContainer center={[-21, -49]} zoom={7} style={{ height: "100vh" }} ref={ref => this.leafletMap = ref}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          { this.state.plotarGlebas && this.renderizarGlebas() }
        </MapContainer>
        <div style={{ position: 'absolute', top: '10px', left: "93%", zIndex: 1000 }}>
          <Link to="/">
          <Button label="Sair" icon="pi pi-sign-out" severity="info" aria-label="Sair" />
          </Link>
        </div>
      </div>
    );
  }
}

export default Mapa;
