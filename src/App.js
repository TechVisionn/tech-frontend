import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Mapa from "./components/Map";
import Home from "./components/Home";
import LoginSignup from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/map" element={ <Mapa/> }/>
        <Route path="/" element={ <Home/> }/>
        <Route path="/login" element={ <LoginSignup/> }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
