import React, { useState } from "react";
import "./LoginSignup.css";
import user_icon from "../Assets/user_icon.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";


const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(""); // Inicialmente, não exibe a força da senha
  const [passwordInputFocused, setPasswordInputFocused] = useState(false); // Adicione um estado para controlar o foco do campo de senha

  const evaluatePasswordStrength = (inputPassword) => {
    if (action === "Sign Up" && passwordInputFocused) { // Verifique se a ação é "Sign Up" e o campo de senha está focado
      let strength = "Nivel de Senha = Fraca";

      if (inputPassword.length >= 8) {
        strength = "Nivel de Senha = Média";
      }

      if (inputPassword.match(/[A-Z]/) && inputPassword.match(/[a-z]/) && inputPassword.match(/[0-9]/)) {
        strength = "Nivel de Senha = Forte";
      }

      setPasswordStrength(strength); // Atualize o estado da força da senha
    } else {
      setPasswordStrength(""); // Se o campo de senha não estiver focado ou estiver vazio, não exiba a força da senha
    }
  };

  const handleActionChange = (newAction) => {
    setAction(newAction);

    // Mostra a checkbox somente quando a ação for "Cadastrar"
    if (newAction === "Sign Up") {
      setShowCheckbox(true);
    } else {
      setShowCheckbox(false);
    }
  };

  const handleButton1Click = () => {
    // Lógica para lidar com o clique no "Botão 1"
  };

  const handleButton2Click = () => {
    // Lógica para lidar com o clique no "Botão 2"
  };

  return (
    <div className="background-container">
    <div className="container">
      <div className="header">
        <div className="text">Bem vindo ao Sistema tecVision! realize seu cadastro agora ou efetue seu Login.</div>
        <div className="underline"></div>
   
      </div>
      <div className="inputs">
        {action === "Login" ? <div></div> : <div className="input">
          <img src={user_icon} alt="" />
          <input type="text" placeholder="Nome Completo" />
        </div>}
        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email" />
        </div>
        <div className={`input ${passwordInputFocused ? "focused" : ""}`}>
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => evaluatePasswordStrength(e.target.value)}
            onFocus={() => setPasswordInputFocused(true)} // Define o foco para true quando o campo de senha é focado
            onBlur={() => setPasswordInputFocused(false)} // Define o foco para false quando o campo de senha perde o foco
          />
          {/* Exiba a força da senha apenas quando o campo de senha está ativo e contém texto */}
          {passwordInputFocused && passwordStrength && (
            <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
              {passwordStrength}
            </div>
          )}
        </div>
        {showCheckbox && (
        <div className="input">
        <input type="checkbox" id="terms" name="terms" />
        <label htmlFor="terms">Eu concordo com os Termos e Condições</label>
      </div>      
        )}
      </div>

      <div className="submit-container">
        
        {action === "Login" ? (
          <div className="submit-container" onClick={() => handleActionChange("Sign Up")}>
            Cadastrar
          </div>
        ) : (
          <div className="submit2-container" onClick={() => handleActionChange("Login")}>
              Login.
          </div>
        )}
        <div className="button-container">
          {action === "Login" ? (
            <button className="login-button" onClick={() => handleButton1Click()}>Login</button>

          ) : (
            <button className="Cadastro-button" onClick={() => handleButton2Click()}>Cadastrar</button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginSignup;