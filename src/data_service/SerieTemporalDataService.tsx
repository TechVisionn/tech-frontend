import axios from "axios";

class SerieTemporalDataService {
  STEMPORAL_API_URL = "http://localhost:5000/stemporal";

  buscarSerieTemporal(ref) {
    return axios.get(`${this.STEMPORAL_API_URL}`);
  }
}

export default new SerieTemporalDataService;