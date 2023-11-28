import axios from "axios";

class SerieTemporalDataService {
  STEMPORAL_API_URL = "http://localhost:5000/stemporal";
  API_TOKEN = "8f1948d1-34a2-4e40-a832-266280cc8031";

  buscarSerieTemporal(ref) {
    return axios.post(this.STEMPORAL_API_URL, { ref_bacen: ref }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.API_TOKEN}`,
      },
    });
  }
}

export default new SerieTemporalDataService();
