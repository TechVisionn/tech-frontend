import React, { Component } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "../App.css";

class Mapa extends Component {

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
