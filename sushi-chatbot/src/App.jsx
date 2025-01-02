import React from "react";
import { BrowserRouter } from "react-router-dom";
import Navigator from "../src/routes/routes"; // Importa el manejador de rutas

const startTransitionFlag = { 
  v7_startTransition: true, 
  v7_relativeSplatPath: true // Habilita el flag de rutas relativas para rutas comodín;
};
function App() {
  return (
    <BrowserRouter future={startTransitionFlag}>
      {/* Usamos Navigator como el sistema principal de rutas */}
      <Navigator />
    </BrowserRouter>
  );
}

export default App;
