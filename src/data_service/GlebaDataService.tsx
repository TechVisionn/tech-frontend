import axios from "axios";

class GlebaDataService {
  GLEBA_API_URL = "http://localhost:5000";

  baixarRelatorioGleba(identificador) {
    return axios.get(`${this.GLEBA_API_URL}/gleba`);
  }

  plotarGlebas(
    lowest_latitude,
    lowest_longitude,
    greatest_latitude,
    greatest_longitude
  ) {
    return axios.post(`${this.GLEBA_API_URL}/gleba`, {
      lowest_latitude: lowest_latitude,
      lowest_longitude: lowest_longitude,
      greatest_latitude: greatest_latitude,
      greatest_longitude: greatest_longitude
    });
  }

}

export default new GlebaDataService;
