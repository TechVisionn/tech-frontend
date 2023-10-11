import React, { useState } from "react";
import { SelectButton } from 'primereact/selectbutton';
import { Button } from 'primereact/button'

import "../components/Assets/styles/Login.css";
import 'primeicons/primeicons.css';


const LoginSignup = () => {
  const [currentRoute, setCurrentRoute] = useState("Login");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordInputFocused, setPasswordInputFocused] = useState(false);

  const evaluatePasswordStrength = (inputPassword) => {
    if (currentRoute === "Cadastrar" && passwordInputFocused) {
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

  const handleButton1Click = () => {
  };

  const handleButton2Click = () => {
  };

  return (
    <div className="background-container">
      <div className="background-overlay">
        <div className="container">
          <div className="header">
          </div>
          <div className="inputs">
            {currentRoute === "Cadastrar" && (
              <div className="input">
                <span className="pi pi-user" />
                <input type="text" placeholder="Nome Completo" />
              </div>
            )}
            <div className="input">
            <span className="pi pi-envelope" />
              <input type="email"  placeholder="Email" aria-label="Email" />
            </div>
            <div className={`input ${passwordInputFocused ? "focused" : ""}`}>
             <span className="pi pi-lock" />
              <input
                type="password"
                placeholder="Senha"
                onChange={(e) => evaluatePasswordStrength(e.target.value)}
                onFocus={() => setPasswordInputFocused(true)}
                onBlur={() => setPasswordInputFocused(false)}
              />
              {passwordInputFocused && passwordStrength && (
                <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
                  {passwordStrength}
                </div>
              )}
            </div>
            {currentRoute == "Login" && (
              <div className="input">
                <input type="checkbox" id="terms" name="terms" />
                <label htmlFor="terms">Eu concordo com os Termos e Condições</label>
              </div>
            )}
          </div>
          <div className="submit-container">
            <div className="submit-container">
              <SelectButton
                options={[
                  { label : 'Login', value: 'Login' },
                  { label: 'Cadastrar', value: 'Cadastrar' },
                ]}
                value={currentRoute}
                onChange={(e) => setCurrentRoute(e.value)}
                className="custom-select-button"
                style={{
                  position: 'fixed', 
                  top: '165px', 
                  left: '50%',
                  transform: 'translateX(-55%)', // Centralizar horizontalmente
                }}
                />
            </div>
            <div className="button-container">
              {currentRoute === "Login" ? (
                <center>
                  <Button label="Login" className="p-button-raised p-button-primary login-button" onClick={handleButton1Click} />
                </center>
              ) : (
                <center>
                <Button label="Cadastrar" className="p-button-raised p-button-primary signup-button" onClick={handleButton2Click} />
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
