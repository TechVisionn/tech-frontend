import React, { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
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

class Mapa extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.leafletMap.addControl(search);
    }, 100);
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
