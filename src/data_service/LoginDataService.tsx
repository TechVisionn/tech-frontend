import axios from "axios";

class LoginDataService {
  LOGIN_API_URL = "http://localhost:5000/token";

  login(user, senha, termo) {
    return axios.post(`${this.LOGIN_API_URL}`, {
      _user: user,
      _pwd: senha,
      _term: termo
    });
  }
}

export default new LoginDataService;