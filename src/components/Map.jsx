import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import { Chart } from "primereact/chart";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet-easyprint";
import "../components/Assets/styles/App.css";
import "leaflet-geosearch/dist/geosearch.css";

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
  [-23.2237, -45.9400],
  [-23.2140, -45.9420],
  [-23.2153, -45.9410],
  [-23.2243, -45.9330],
  [-23.2276, -45.9340]
];

const exportPrint = L.easyPrint({
  title: 'Imprimir Mapa',
  position: 'topleft',
  sizeModes: ['A4Landscape'],
  filename: 'mapa',
  exportOnly: true,
  hideControlContainer: true,
});

const chartData = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    {
      label: "Sales",
      data: [540, 325, 702, 620],
      backgroundColor: [
        "rgba(255, 159, 64, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgb(255, 159, 64)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
      ],
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

class Mapa extends Component {
  constructor(props) {
    super(props);
    this.handleZoomReset = this.handleZoomReset.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.leafletMap.addControl(search);
      this.leafletMap.addControl(exportPrint);
      this.addCustomZoomResetControl();
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
    this.leafletMap.setView([-21, -49], 7);
  }

  render() {
    return (
      <div id="mapa">
        <MapContainer center={[-21, -49]} zoom={7} style={{ height: "100vh" }} ref={ref => this.leafletMap = ref}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Polygon positions={coordenadasPoligono} color="green" fillColor="darkgreen" weight={2}>
            <Popup>
              {coordenadasPoligono}
            </Popup>
          </Polygon>
          <Marker position={[-23.2200, -45.8000]}>
            <Popup>
              <Chart type="bar" data={chartData} options={chartOptions} />
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
}

export default Mapa;
