import React, { Component } from "react";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import L from "leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "leaflet-easyprint";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { SelectButton } from "primereact/selectbutton";
import SerieUm from "./Assets/images/512464599.jpeg";
import SerieDois from "./Assets/images/512601235.jpeg";
import SerieTres from "./Assets/images/512686590.jpeg";
import SerieQuatro from "./Assets/images/513263585.jpeg";
import SerieCinco from "./Assets/images/513591041.jpeg";
import GlebaDataService from "../data_service/GlebaDataService.tsx";
import "./Assets/styles/App.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import TimeSeries from "./TimeSeries.jsx";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;

const search = new GeoSearchControl({
  provider: new OpenStreetMapProvider({
    params: {
      countrycodes: "BR",
    },
  }),
  autoComplete: true,
  style: "bar",
  notFoundMessage: "Endereço não encontrado!",
  searchLabel: "Buscar endereço",
  showMarker: false,
  showPopup: false,
  autoClose: true,
});

const exportPrint = L.easyPrint({
  title: "Imprimir Mapa",
  position: "topleft",
  sizeModes: ["A4Landscape"],
  filename: "mapa",
  exportOnly: true,
  hideControlContainer: true,
});

class Mapa extends Component {
  state = {
    plotarGlebas: false,
    selectedOption: "informacoes",
    coordenadasPoligono: [],
  };

  componentDidMount() {
    this.initializeMap();
  }

  initializeMap() {
    setTimeout(() => {
      this.leafletMap.addControl(search);
      this.leafletMap.addControl(exportPrint);
      this.addCustomZoomResetControl();
      this.plotarGlebasFunction();
      this.plotarGlebasMockFunction();
    }, 100);
  }

  plotarGlebasMockFunction() {
    const glebasMock = [
      { "nu_identificador": 512464599,
        "coordenadas": [
          [-22.942556, -50.201018], [-22.942922, -50.200771], [-22.943218, -50.200353], 
          [-22.943594, -50.199934], [-22.94388, -50.199559], [-22.944167, -50.199065], 
          [-22.944384, -50.198765], [-22.944552, -50.198754], [-22.944315, -50.19928], 
          [-22.943589, -50.20017], [-22.943164, -50.200809], [-22.942497, -50.201254], 
          [-22.942329, -50.20149], [-22.943036, -50.201662], [-22.943406, -50.201715], 
          [-22.943762, -50.201715], [-22.94389, -50.201715], [-22.943791, -50.201383], 
          [-22.94389, -50.201072], [-22.944266, -50.20046], [-22.944513, -50.199838], 
          [-22.944651, -50.199376], [-22.94477, -50.198829], [-22.94476, -50.198164], 
          [-22.944503, -50.197306], [-22.944236, -50.196705], [-22.944088, -50.196447], 
          [-22.943653, -50.196297], [-22.942922, -50.198947], [-22.942299, -50.201544]
        ],
        "data_emissao": "05/08/2021",
        "data_fim_colheita": "22/02/2022",
        "data_plantio": "12/10/2021",
        "estado": "São Paulo",
        "juros_investimentos": "4.5",
        "tipo_grao": "Grão/Consumo",
        "tipo_irrigacao": "Não Irrigado",
        "tp_seguro": "Outro seguro",
        "valor_aliquota": ""
      },
      {
        "nu_identificador": 512601235,
        "coordenadas": [
          [-22.671798, -50.378945], [-22.67455, -50.384846], [-22.675243, -50.384245], 
          [-22.674912, -50.3841], [-22.674753, -50.383698], [-22.674951, -50.383478], 
          [-22.675065, -50.383542], [-22.675204, -50.383467], [-22.675273, -50.383564], 
          [-22.675565, -50.383494], [-22.675689, -50.383413], [-22.675719, -50.383236], 
          [-22.675629, -50.382974], [-22.6756, -50.382882], [-22.675199, -50.38241], 
          [-22.675045, -50.382228], [-22.674709, -50.381702], [-22.674293, -50.381262], 
          [-22.673455, -50.379834], [-22.672808, -50.378237]
        ],
        "data_emissao": "23/08/2021",
        "data_fim_colheita": "10/03/2022",
        "data_plantio": "10/11/2021",
        "estado": "São Paulo",
        "juros_investimentos": "4.5",
        "tipo_grao": "Grão/Consumo",
        "tipo_irrigacao": "Não Irrigado",
        "tp_seguro": "Outro seguro",
        "valor_aliquota": ""
      },
      {
        "nu_identificador": 512686590,
        "coordenadas": [
          [-22.870165, -50.565015], [-22.869087, -50.565348], [-22.868415, -50.565552], 
          [-22.86802, -50.5645], [-22.868633, -50.564393], [-22.869473, -50.564253], 
          [-22.8715, -50.563953], [-22.873842, -50.563556], [-22.87404, -50.563942], 
          [-22.871579, -50.56464]
        ],
        "data_emissao": "03/09/2021",
        "data_fim_colheita": "10/03/2022",
        "data_plantio": "10/11/2021",
        "estado": "São Paulo",
        "juros_investimentos": "4.5",
        "tipo_grao": "Grão/Consumo",
        "tipo_irrigacao": "Não Irrigado",
        "tp_seguro": "Outro seguro",
        "valor_aliquota": ""
      },
      {
        "nu_identificador": 513263585,
        "coordenadas": [
          [-22.865995, -50.566237], [-22.865887, -50.564813], [-22.869302, -50.564365], 
          [-22.869734, -50.564228], [-22.869752, -50.565203]
        ],
        "data_emissao": "20/12/2021",
        "data_fim_colheita": "22/08/2022",
        "data_plantio": "31/03/2022",
        "estado": "São Paulo",
        "juros_investimentos": "3.0",
        "tipo_grao": "Grão/Consumo",
        "tipo_irrigacao": "Não Irrigado",
        "tp_seguro": "Outro seguro",
        "valor_aliquota": ""
      },
      {
        "nu_identificador": 513591041,
        "coordenadas": [
          [-22.867901, -50.219509], [-22.869325, -50.224557], [-22.870086, -50.224401], 
          [-22.868302, -50.220941], [-22.86848, -50.220973], [-22.869863, -50.222846], 
          [-22.869621, -50.221269], [-22.868653, -50.221006], [-22.868826, -50.221033], 
          [-22.868321, -50.221033], [-22.868979, -50.22107], [-22.86932, -50.221118], 
          [-22.869626, -50.221177], [-22.868924, -50.216698], [-22.868648, -50.217074], 
          [-22.868509, -50.217127], [-22.868395, -50.217127], [-22.868339, -50.217197], 
          [-22.868386, -50.21731], [-22.868349, -50.217487], [-22.868161, -50.217497], 
          [-22.867983, -50.21768], [-22.86757, -50.218125]
        ]
      }
    ]
    
    return glebasMock.map((gleba, index) => (
      <Polygon
        key={index}
        positions={gleba.coordenadas}
        color={"blue"}
        fillColor={"blue"}
        weight={2}
      >
        <Popup ref={(ref) => (this.popupRef = ref)}>
          <div>
            <center>
              <SelectButton
                value={this.state.selectedOption}
                options={[
                  { label: "Informações", value: "informacoes" },
                  { label: "Série Temporal", value: "temporal" },
                ]}
                onChange={(e) => this.toggleOption(e.value)}
                placeholder="Selecione uma opção"
              />
            </center>
            <br />
            <center>
              <h3
                style={{
                  fontFamily: "system-ui",
                  color: "darkgreen",
                  marginTop: "10px",
                }}
              >
                {this.state.selectedOption === "informacoes"
                  ? "INFORMAÇÕES DA GLEBA"
                  : ""}
              </h3>
            </center>
            <div
              style={{
                marginTop: "15px",
                fontSize: 15,
                fontFamily: "system-ui",
              }}
            >
              {this.state.selectedOption === "informacoes" && (
                <>
                  {gleba.nu_identificador}
                  Estado: {gleba.estado}
                  <br />
                  Tipo Seguro: {gleba.tp_seguro}
                  <br />
                  Data plantio: {gleba.data_plantio}
                  <br />
                  Tipo irrigação: {gleba.tipo_irrigacao}
                  <br />
                  Tipo grão: {gleba.tipo_grao}
                  <br />
                  Data do fim da colheita: {gleba.data_fim_colheita}
                  <br />
                  <br />
                </>
              )}
            </div>
            {this.state.selectedOption === "temporal" && (
              <>
                {gleba.nu_identificador === 512464599 && (
                  <TimeSeries nu_identificador={512464599}/>
                )}
                {gleba.nu_identificador === 512601235 && (
                  <TimeSeries nu_identificador={512601235}/>
                )}
                {gleba.nu_identificador === 512686590 && (
                  <TimeSeries nu_identificador={512686590}/>
                )}
                {gleba.nu_identificador === 513263585 && (
                  <TimeSeries nu_identificador={513263585}/>
                )}
                {gleba.nu_identificador === 513591041 && (
                  <TimeSeries nu_identificador={513591041}/>
                )}
                {gleba.nu_identificador === 512719157 && (
                  <TimeSeries nu_identificador={512719157}/>
                )}
                {gleba.nu_identificador === 512720768 && (
                  <TimeSeries nu_identificador={512720768}/>
                )}
                {gleba.nu_identificador === 512734716 && (
                  <TimeSeries nu_identificador={512734716}/>
                )}
                {gleba.nu_identificador === 512748868 && (
                  <TimeSeries nu_identificador={512748868}/>
                )}
                {gleba.nu_identificador === 512752862 && (
                  <TimeSeries nu_identificador={512752862}/>
                )}
                {gleba.nu_identificador === 512758002 && (
                  <TimeSeries nu_identificador={512758002}/>
                )}
                {gleba.nu_identificador === 512763981 && (
                  <TimeSeries nu_identificador={512763981}/>
                )}
                {gleba.nu_identificador === 512775645 && (
                  <TimeSeries nu_identificador={512775645}/>
                )}
                {gleba.nu_identificador === 512776188 && (
                  <TimeSeries nu_identificador={512776188}/>
                )}
                {gleba.nu_identificador === 512781334 && (
                  <TimeSeries nu_identificador={512781334}/>
                )}
              </>
            )}
          </div>
        </Popup>
      </Polygon>
    ));
    
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
      ).then((resp) => {
        this.setState({ coordenadasPoligono: resp.data });
        setTimeout(() => {
          this.setState({ plotarGlebas: true });
        }, 2000);
      });
    } catch (error) {
      console.error({ error });
    }
  }

  addCustomZoomResetControl() {
    if (!this.customZoomResetControl) {
      this.customZoomResetControl = L.control({ position: "topleft" });

      this.customZoomResetControl.onAdd = () => {
        const container = L.DomUtil.create(
          "div",
          "leaflet-bar leaflet-control"
        );
        const zoomResetButton = L.DomUtil.create(
          "a",
          "leaflet-control-zoom-reset leaflet-bar-part",
          container
        );

        zoomResetButton.href = "#";
        zoomResetButton.title = "Redefinir Zoom";
        zoomResetButton.innerHTML = "↻";

        L.DomEvent.on(zoomResetButton, "click", this.handleZoomReset);

        return container;
      };

      this.customZoomResetControl.addTo(this.leafletMap);
    }
  }

  handleZoomReset = () => {
    this.leafletMap.setView([-21, -49], 7);
  };

  baixarRelatorio(gleba) {
    const doc = new jsPDF();
    doc.setFontSize(16)
    doc.setTextColor("darkblue")
    doc.setFont(undefined, "bold")
    doc.text(75, 15, "RELATÓRIO DA GLEBA")
    doc.setFontSize(13)
    doc.setTextColor("black")
    doc.text(15, 30, `Identificador: ${gleba.nu_identificador}`)
    doc.text(15, 38, `Data de emissão: ${gleba.data_emissao}`)
    doc.text(15, 46, `Estado: ${gleba.estado}`)
    doc.text(15, 54, `Data de plantio: ${gleba.data_plantio}`)
    doc.text(15, 62, `Data do fim da colheita: ${gleba.data_fim_colheita}`)
    doc.text(15, 70, `Tipo do grão: ${gleba.tipo_grao}`)
    doc.text(15, 78, `Tipo da irrigação: ${gleba.tipo_irrigacao}`)
    doc.save(`gleba-${gleba.nu_identificador}.pdf`)
  }

  renderizarGlebas() {
    return this.state.coordenadasPoligono.map((gleba, index) => (
      <Polygon
        key={index}
        positions={gleba.coordenadas}
        color={"green"}
        fillColor={"darkgreen"}
        weight={2}
      >
        <Popup ref={(ref) => (this.popupRef = ref)} style={{ display: "none", position: "fixed" }}>
          <div>
            <center>
              <SelectButton
                value={this.state.selectedOption}
                options={[
                  { label: "Informações", value: "informacoes" },
                  { label: "Série Temporal", value: "temporal" },
                ]}
                onChange={(e) => this.toggleOption(e.value)}
                placeholder="Selecione uma opção"
              />
            </center>
            <br />
            <center>
              <h3
                style={{
                  fontFamily: "system-ui",
                  color: "darkgreen",
                  marginTop: "10px",
                }}
              >
                {this.state.selectedOption === "informacoes"
                  ? "INFORMAÇÕES DA GLEBA"
                  : ""}
              </h3>
            </center>
            <div
              style={{
                marginTop: "15px",
                fontSize: 18,
                fontFamily: "system-ui",
              }}
            >
              {this.state.selectedOption === "informacoes" && (
                <>
                  {gleba.nu_identificador}
                  <h5> Estado: {gleba.estado} </h5>
                  <br />
                  Tipo Seguro: {gleba.tp_seguro}
                  <br />
                  Data plantio: {gleba.data_plantio}
                  <br />
                  Tipo irrigação: {gleba.tipo_irrigacao}
                  <br />
                  Tipo grão: {gleba.tipo_grao}
                  <br />
                  Data do fim da colheita: {gleba.data_fim_colheita}
                  <br />
                  <br />
                  <center>
                    <Button
                      icon="pi pi-download"
                      severity="success"
                      size="small"
                      label="Baixar relatório"
                      onClick={(e) => {this.baixarRelatorio(gleba, e)}}
                    />
                  </center>
                  
                </>
              )}
            </div>
            {this.state.selectedOption === "temporal" && (
              <>
                <h3
                  style={{
                    fontFamily: "system-ui",
                    color: "RED",
                    marginTop: "10px",
                  }}
                >
                  SEM INFORMAÇÕES DE SÉRIE TEMPORAL
                </h3>
              </>
            )}
          </div>
        </Popup>
      </Polygon>
    ));
  }

  toggleOption = (option) => {
    this.setState({ selectedOption: option });

    if (option === "temporal") {
      this.popupRef.options.minWidth = "750px";
    }
  };

  render() {
    return (
      <div id="mapa">
        <MapContainer
          center={[-21, -49]}
          zoom={7}
          style={{ height: "100vh" }}
          ref={(ref) => (this.leafletMap = ref)}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {this.state.plotarGlebas && this.renderizarGlebas()}
          {this.plotarGlebasMockFunction()}
        </MapContainer>
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "93%",
            zIndex: 1000,
          }}
        >
          <Link to="/">
            <Button
              label="Sair"
              icon="pi pi-sign-out"
              severity="info"
              aria-label="Sair"
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default Mapa;
