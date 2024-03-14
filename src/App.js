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

  return (
    <div className="App">
      <NavBar />
      <FilterBar onFilterChange={handleFilterChange} />
      <Body />
    </div>
  );
}

export default App;
