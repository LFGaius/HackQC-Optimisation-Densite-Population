import React, {useState} from 'react';
import { Row, Col, Container} from 'react-bootstrap';
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
        <Col xs={12} lg={8} className='ml-2'> 
          <Container>
            <MapComponent />
          </Container>
        </Col>
        <Col xs={12} lg={4} className='border'> 
          <SideBar />
        </Col>
      </Row>
    </>
  );
};

export default Body;
