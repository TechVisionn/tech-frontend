import React, { useEffect, useState } from "react";
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button';
import { Route } from 'react-router-dom';

import "../components/Assets/styles/Login.css";
import 'primeicons/primeicons.css';
import "../components/Assets/styles/App.css";

import LoginDataService from "../data_service/LoginDataService.tsx";
import CadastroDataService from "../data_service/CadastroDataService.tsx";

const LoginSignup = () => {
  const [currentRoute, setCurrentRoute] = useState("Login");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordInputFocused, setPasswordInputFocused] = useState(false);
  const [disabledTermo, setDisabledTermo] = useState(false);
  const [usuario, setUsuario] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [termo, setTermo] = useState(false);

  useEffect(() => {
    if(currentRoute === "Login") {
      setPasswordStrength("");
      setPasswordInputFocused(false);
    }
  }, [passwordStrength, passwordInputFocused])

  const evaluatePasswordStrength = (inputPassword) => {
    if (currentRoute === "Cadastro" && passwordInputFocused) {
      let strength = "Nível de Senha = Fraca";

      if (inputPassword.length >= 8) {
        strength = "Nível de Senha = Média";
      }

      if (inputPassword.match(/[A-Z]/) && inputPassword.match(/[a-z]/) && inputPassword.match(/[0-9]/)) {
        strength = "Nível de Senha = Forte";
      }

      setPasswordStrength(strength);
    } else {
      setPasswordStrength("");
    }
  };

  const clickEntrar = async () => {
    LoginDataService.login(usuario, senha, termo).then(resp => {
      console.log(resp)
      if (resp.data.message === "Invalid username or password") {
        console.log("Invalid username or password")
      } else if (resp.data.message === "User needs to update terms" && disabledTermo === true && termo === false) {
        console.log("Concorde com os termos");
      } else if (resp.data.message === "User needs to update terms") {
        setDisabledTermo(true);
      } else {
        console.log("Login com sucesso");
        setUsuario("");
        setSenha("");
        window.location.href="/map";
      }
    });
  };

  const clickCadastrar = async () => {
    CadastroDataService.cadastro(usuario, senha).then(resp => {
      console.log(resp.data);
    })
    
    /*console.log(cadastro.response.status);
    if (cadastro.response.status === 403) {
      setDisabledTermo(true);
    }
    setUsuario("");
    setSenha("");
    setEmail("");*/
  };

  return (
    <div className="background-container">
      <div className="background-overlay">
        <div className="container">
          <div className="header">
          </div>
          <div className="inputs">
            <div className="input">
              <span className="pi pi-user" />
              <input type="text" placeholder="Usuário" id="user" value={usuario} onChange={e => setUsuario(e.currentTarget.value)}/>
            </div>
            {currentRoute === "Cadastro" && (
              <div className="input">
                <span className="pi pi-envelope" />
                <input type="email"  placeholder="Email" aria-label="Email" id="email" value={email} onChange={e => setEmail(e.currentTarget.value)}/>
              </div>
            )}
            <div className={`input ${passwordInputFocused ? "focused" : ""}`}>
             <span className="pi pi-lock" />
              <input
                type="password"
                placeholder="Senha"
                onChange={(e) => { 
                  evaluatePasswordStrength(e.target.value)
                  setSenha(e.currentTarget.value)
                }}
                onFocus={() => setPasswordInputFocused(true)}
                onBlur={() => setPasswordInputFocused(false)}
                id="senha"
                value={senha}
              />
              {passwordInputFocused && passwordStrength && (
                <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
                  {passwordStrength}
                </div>
              )}
            </div>
            {currentRoute == "Login" && disabledTermo && (
              <div className="input">
                <input type="checkbox" id="termo" name="terms" value={termo} onChange={e => setTermo(e.target.checked)}/>
                <label htmlFor="terms">Eu concordo com os Termos e Condições</label>
              </div>
            )}
          </div>
          <div className="submit-container">
            <div className="submit-container">
              <SelectButton
                options={[
                  { label : 'Login', value: 'Login' },
                  { label: 'Cadastro', value: 'Cadastro' },
                ]}
                value={currentRoute}
                onChange={(e) => setCurrentRoute(e.value)}
                className="custom-select-button"
                style={{
                  position: 'fixed', 
                  top: '165px', 
                  left: '50%',
                  transform: 'translateX(-55%)',
                }}
              />
            </div>
            <div className="button-container">
              {currentRoute === "Login" ? (
                <center>
                  <Button label="Entrar" className="p-button-raised p-button-primary login-button" onClick={clickEntrar} />
                </center>
              ) : (
                <center>
                <Button label="Cadastrar" className="p-button-raised p-button-primary signup-button" onClick={clickCadastrar} />
                </center>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
