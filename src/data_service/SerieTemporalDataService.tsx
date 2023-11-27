import axios from "axios";

class SerieTemporalDataService {
  STEMPORAL_API_URL = "http://localhost:5000/stemporal";

  buscarSerieTemporal(ref) {
    return             {
      data: ["2023-11-21", "2023-11-22", "2023-11-23", "2023-11-24", "2023-11-25", "2023-11-26"],
      ndvi_real: [0.25, 0.35, 0.40, 0.50, 0.70, 0.75],
      ndvi_previsto: [null, null, null, null, 0.60, 0.70]
  }
    //axios.get(`${this.STEMPORAL_API_URL}`);
  }
}

export default new SerieTemporalDataService;