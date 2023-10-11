import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Mapa from "./components/Map";
import Home from "./components/Home";
import LoginSignup from "./components/LoginSignup/LoginSignup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/map" element={ <Mapa/> }/>
        <Route path="/relatorio" element={ <Home/> }/>
        <Route path="/" element={ <LoginSignup/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
