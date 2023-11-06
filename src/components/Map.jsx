import React, { Component } from "react";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import { SelectButton } from 'primereact/selectbutton';
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import L from "leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet-easyprint";
import 'primeicons/primeicons.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import GlebaDataService from "../data_service/GlebaDataService.tsx";
import "./Assets/styles/App.css";

import SerieUm from "./Assets/images/512464599.jpeg";
import SerieDois from "./Assets/images/512601235.jpeg";
import SerieTres from "./Assets/images/512686590.jpeg";
import SerieQuatro from "./Assets/images/513263585.jpeg";
import SerieCinco from "./Assets/images/513591041.jpeg";

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
      plotarGlebas: false,
      selectedOption: 'informacoes',
      coordenadasPoligono: []
    };
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

  plotarGlebasFunction() {
    const bounds = this.leafletMap.getBounds();
    const lowest_latitude = bounds._southWest.lat;
    const lowest_longitude = bounds._southWest.lng;
    const greatest_latitude = bounds._northEast.lat;
    const greatest_longitude = bounds._northEast.lng;
    try { 
      GlebaDataService.plotarGlebas(
        lowest_latitude,
        lowest_longitude,
        greatest_latitude,
        greatest_longitude
      ).then(resp => {
        this.setState({ coordenadasPoligono : resp.data });
        this.setState({ plotarGlebas: true });
        console.log(resp.data)
      })
    } catch(error) {
      console.error({ error })
    }
  }

  handleZoomChange = (event) => {
    const currentZoom = event.target.getZoom();
    if (currentZoom >= 10) {
      console.log("PLOT")
      //this.plotarGlebasFunction();
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

  baixarRelatorio(gleba) {
    console.log(gleba)
  }

  renderizarGlebas() {
    this.setState({ plotarGlebas: true });
    const glebasParaPlotar = [];
    /*this.state.coordenadasPoligono.map(gleba => {
      if (gleba.nu_identificador !== 512679288 && gleba.nu_identificador !== 512517989) {
        glebasParaPlotar.push(gleba);
      }
    })*/
    glebasParaPlotar.push({
      "nu_identificador": 513591041,
      "coordenadas": [
        [-22.867901, -50.219509], 
        [-22.869325, -50.224557], [-22.870086, -50.224401], [-22.868302, -50.220941], 
        [-22.86848, -50.220973], [-22.869863, -50.222846], [-22.869621, -50.221269], 
        [-22.868653, -50.221006], [-22.868826, -50.221033], [-22.868321, -50.221033], 
        [-22.868979, -50.22107], [-22.86932, -50.221118], [-22.869626, -50.221177], 
        [-22.868924, -50.216698], [-22.868648, -50.217074], [-22.868509, -50.217127], 
        [-22.868395, -50.217127], [-22.868339, -50.217197], [-22.868386, -50.21731], 
        [-22.868349, -50.217487], [-22.868161, -50.217497], [-22.867983, -50.21768], 
        [-22.86757, -50.218125]
      ]
    }, 
    {
      "data_emissao": "12/08/2021",
      "data_fim_colheita": "10/03/2022",
      "data_plantio": "10/11/2021",
      "estado": "São Paulo",
      "juros_investimentos": "5.5",
      "nu_identificador": 512517989,
      "receita_bruta": 218847.97,
      "tipo_grao": "Grão/Consumo",
      "tipo_irrigacao": "Não Irrigado",
      "tp_seguro": "Outro seguro",
      "coordenadas": [
        [-22.859093, -50.516446], [-22.859785, -50.515287], [-22.859142, -50.514836],
        [-22.858401, -50.514332], [-22.857649, -50.513871], [-22.857299, -50.513651],
        [-22.856839, -50.51335], [-22.856344, -50.513066], [-22.855692, -50.512658],
        [-22.854347, -50.511811], [-22.854061, -50.512133], [-22.853903, -50.512444],
        [-22.853734, -50.512776], [-22.854842, -50.513613], [-22.855954, -50.514364],
        [-22.856646, -50.514831], [-22.857037, -50.515094], [-22.857373, -50.515308],
        [-22.858015, -50.515748], [-22.858569, -50.516092], [-22.859093, -50.516446]
      ]
    })
    
    return glebasParaPlotar.map((gleba, index) => {
      let color = "green";
      let fillColor = "darkgreen";
      if (gleba.nu_identificador === 512464599 ||
        gleba.nu_identificador === 512601235 ||
        gleba.nu_identificador === 512686590 ||
        gleba.nu_identificador === 513263585 ||
        gleba.nu_identificador === 513591041
      ) {
        color = "blue";
        fillColor = "blue";
      }
      return(
        <Polygon
          key={index}
          positions={gleba.coordenadas}
          color={ color }
          fillColor={ fillColor }
          weight={2}
        >
          <Popup ref={(ref) => (this.popupRef = ref)}>
              <center>
                <SelectButton
                  value={this.state.selectedOption}
                  options={[
                    { label: 'Informações', value: 'informacoes' },
                    { label: 'Série Temporal', value: 'temporal' },
                  ]}
                  onChange={(e) => this.toggleOption(e.value)}
                  placeholder="Selecione uma opção"
                />
              </center>
            <br/>
            <center>
              <h3 style={{ fontFamily: "system-ui", color: "darkgreen", marginTop: '10px' }}>
                {this.state.selectedOption === 'informacoes' ? 'INFORMAÇÕES DA GLEBA' : ''}
              </h3>
            </center>
            <div style={{ marginTop: '15px', fontSize: 15, fontFamily: "system-ui" }}>
              {this.state.selectedOption === 'informacoes' && (
                <>
                  { gleba.nu_identificador }
                  Estado: { gleba.estado }
                  <br/>
                  Tipo Seguro: { gleba.tp_seguro }
                  <br/>
                  Data plantio: { gleba.data_plantio }
                  <br/>
                  Tipo irrigação: { gleba.tipo_irrigacao }
                  <br/>
                  Tipo grão: { gleba.tipo_grao }
                  <br/>
                  Data do fim da colheita: { gleba.data_fim_colheita }
                  <br/>
                  Receita Bruta: R${ gleba.receita_bruta }
                  <br/>
                  <br/>
                  <center>
                    <Button icon="pi pi-download" severity="success" size="small" label="Baixar relatório" />
                  </center>
                </>
              )}
            </div>
              {this.state.selectedOption === 'temporal' && (
                <>
                    {gleba.nu_identificador === 512464599 &&
                      <img src={SerieUm} alt="Serie Temporal" width="700" height="300"/>
                    }
                    {gleba.nu_identificador === 512464599 &&
                      <img src={SerieDois} alt="Serie Temporal" width="700" height="300"/>
                    }
                    {gleba.nu_identificador === 512464599 &&
                      <img src={SerieTres} alt="Serie Temporal" width="700" height="300"/>
                    }
                    {gleba.nu_identificador === 512464599 &&
                      <img src={SerieQuatro} alt="Serie Temporal" width="700" height="300"/>
                    }
                    {gleba.nu_identificador === 513591041 &&
                      <img src={SerieCinco} alt="Serie Temporal" width="700" height="300"/>
                    }
                    {gleba.nu_identificador !== 512464599 &&
                      gleba.nu_identificador !== 512601235 &&
                      gleba.nu_identificador !== 512686590 &&
                      gleba.nu_identificador !== 513263585 &&
                      gleba.nu_identificador !== 513591041 &&
                      <h3 style={{ fontFamily: "system-ui", color: "RED", marginTop: '10px' }}>
                        SEM INFORMAÇÕES DE SÉRIE TEMPORAL
                      </h3>
                    }
                    <center>
                      <Button icon="pi pi-file-pdf" severity="success" size="small" label="Gerar Imagem" />
                    </center>
                </>
              )}
          </Popup>
        </Polygon>
    )});
  }

  toggleOption = (option) => {
    this.setState({ selectedOption: option });
    if (option === 'temporal') {
      this.popupRef.options.minWidth = "750px";
    }
  };

  render() {
    return (
      <div id="mapa">
        <MapContainer center={[-21, -49]} zoom={7} style={{ height: "100vh" }} ref={(ref) => (this.leafletMap = ref)}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {this.renderizarGlebas()}
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