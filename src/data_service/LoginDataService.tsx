class LoginDataService {
  Login(user, senha, termo) {
    return `Usuário: ${user}, Senha: ${senha}, Termo: ${termo}`;
  }
}

export default new LoginDataService;
