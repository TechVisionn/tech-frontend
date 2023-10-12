import axios from "axios";

class CadastroDataService {
  LOGIN_API_URL = "http://localhost:5000/user";

  cadastro(usuario, senha) {
    return axios.post(`${this.LOGIN_API_URL}`, {
      _user: usuario,
      _pwd: senha
    });
  }
}

export default new CadastroDataService;