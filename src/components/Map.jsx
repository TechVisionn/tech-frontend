import React, { Component } from "react";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";

import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
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

const coordenadasPoligono = [
  [-23.2237, -45.9009],
  [-23.2140, -45.9090],
  [-23.2153, -45.9217],
  [-23.2243, -45.9264],
  [-23.2276, -45.9178]
];

class Mapa extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.leafletMap.addControl(search);
    }, 100);
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
        </MapContainer>
      </div>
    );
  }
}

export default Mapa;
