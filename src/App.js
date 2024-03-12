// import logo from './logo.svg';

import React, { useState } from 'react';
import MapComponent from "./components/MapComponent";
import NavBar from "./components/NavBar";

function App() {

  const handleTypeSelect = (type) => {
    console.log(`Type de Propriété sélectionné : ${type}`);
    // Implémentons la logique de filtrage ici
  };

  const handleLocationSelect = (location) => {
    console.log(`Emplacement sélectionné : ${location}`);
    // Implémentons la logique de filtrage ici
  };

  return (
    <div className="App">
      <NavBar onTypeSelect={handleTypeSelect} onLocationSelect={handleLocationSelect} />
      <MapComponent googleMapsApiKey="" />
    </div>
  );
}

export default App;
