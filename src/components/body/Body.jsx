import React, {useState} from 'react';
import { Row, Col } from 'react-bootstrap';
import MapComponent from './MapComponent';
import { SideBar } from './SideBar';
import FilterBar from '../nav/FilterBar';

const Body = () => {

  const [filters, setFilters] = useState({ propertyType: '', priceRange: '' });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Nouveaux filtres sélectionnés :', newFilters);
  };
  return (
    <> 
      <FilterBar onFilterChange={handleFilterChange} />
    <Row>
      <Col xs={12} lg={9}> 
        <MapComponent />
      </Col>
      <Col xs={12} lg={3}> 
        <SideBar />
      </Col>
    </Row>
    </>
  );
};

export default Body;
