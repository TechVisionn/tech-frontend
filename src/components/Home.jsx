import { Component, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import GlebaDataService from "../data_service/GlebaDataService.tsx";

import "../components/Assets/styles/App.css";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";                                    

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      identificador: ""
    }
  }

  baixarRelatorio() {
    GlebaDataService.baixarRelatorioGleba(this.state.identificador);
    this.setState({ identificador: "" })
  }

  render() {
    return (
      <div>
        <div className="home" />
        <div className="alinhar">
          <InputText
            type="text"
            placeholder="Identificador da gleba"
            style={{ marginRight: "20px" }}
            onChange={e => {
              this.setState({ identificador: e.currentTarget.value });
            }}
            value={ this.state.identificador }
          />
          <Button
            className="buttonBusca"
            tooltip="Baixar relatório da gleba"
            tooltipOptions={{ position: "top" }}
            onClick={() => this.baixarRelatorio()}
          > Baixar </Button>
        </div>
      </div>
    );
  }
}

export default Home;
