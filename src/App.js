// import logo from './logo.svg';
import React, { useState } from 'react';
import NavBar from "./components/nav/NavBar";
import Body from './components/body/Body';
import FilterBar from './components/nav/FilterBar';

function App() {

  const [filters, setFilters] = useState({ propertyType: '', priceRange: '' });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Vous pouvez effectuer d'autres opérations en fonction des nouveaux filtres sélectionnés
    console.log('Nouveaux filtres sélectionnés :', newFilters);
  };

  // const handleTypeSelect = (type) => {
  //   console.log(`Type de Propriété sélectionné : ${type}`);
  //   // Implémentons la logique de filtrage ici
  // };

  // const handleLocationSelect = (location) => {
  //   console.log(`Emplacement sélectionné : ${location}`);
  //   // Implémentons la logique de filtrage ici
  // };

  return (
    <div className="App">
      <NavBar />
      {/* <FiltreBar onTypeSelect={handleTypeSelect} onLocationSelect={handleLocationSelect} /> */}
      <FilterBar onFilterChange={handleFilterChange} />
      <Body />
    </div>
  );
}

export default App;
