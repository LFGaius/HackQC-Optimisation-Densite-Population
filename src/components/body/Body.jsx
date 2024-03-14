import React, {useState} from 'react';
import { Row, Col, Container} from 'react-bootstrap';
import MapComponent from './MapComponent';
import { SideBar } from './SideBar';
import FilterBar from '../nav/FilterBar';

const Body = () => {

  const [filters, setFilters] = useState({city:"montreal", displayIndiceEquiteMilieuxVie : false, displayZonage : false, displayReseauCyclable : false, displayParcsEspacesVerts : false, displayPointArretBus : false, displayPlacesPubliques : false, displayPermis : false});
  const [childKey, setChildKey] = useState(0);

  const handleFilterChange = (selectedOptions) => {debugger
    setFilters(selectedOptions);
    setChildKey(childKey+1);//just to enforce reload
  };
  return (
    <> 
      <FilterBar onFilterChange={handleFilterChange} />
        
      <Row>
        <Col xs={12} lg={8} className='ml-2'> 
          <Container>
          <MapComponent filtersMap = {filters} key={childKey}/>
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
