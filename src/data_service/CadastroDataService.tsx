class CadastroDataService {
  Cadastro(usuario, senha, email) {
    return `Usuário: ${usuario}, Senha: ${senha}, Email: ${email}`;
  }
}

export default new CadastroDataService;
