import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MapComponent from './MapComponent';
import { SideBar } from './SideBar';

const Body = () => {
  return (
    <Row>
      <Col xs={12} lg={9}> 
        <MapComponent />
      </Col>
      <Col xs={12} lg={3}> 
        <SideBar />
      </Col>
    </Row>
  );
};

export default Body;
