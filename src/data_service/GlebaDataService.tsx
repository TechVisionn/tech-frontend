import axios from "axios";

class GlebaDataService {
  GLEBA_API_URL = "http://localhost:5000/";

  baixarRelatorioGleba(identificador) {
    /*return axios.get(`${this.GLEBA_API_URL}/relatorio`, {
      params: {
        identificador: identificador,
      },
    });*/
    console.log(identificador)
  }
}

export default new GlebaDataService;
