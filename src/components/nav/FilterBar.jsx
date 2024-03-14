import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import {Navbar,Nav, Button, Form,Row, Col,} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const FilterBar = ({onFilterChange}) => {


  const [selectedOptions, setSelectedOptions] = useState({
    ville: '',
    zoneCyclable: false,
    espaceVerts: false,
    arretBus: false,
    placesPubliques: false,
    permisTravaux: false
  });
  
  const handlePropertyTypeChange = (ville) => {
    setSelectedOptions({ ...selectedOptions, ville });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedOptions({ ...selectedOptions, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Options sélectionnées :', selectedOptions);
    // Ajoutez ici la logique pour déclencher un événement avec les valeurs sélectionnées
    dispatchEvent(new CustomEvent('filterChanged', { detail: selectedOptions }));
  };

  return (
    <>
      <Navbar bg="light" className="my-2 mx-3 p-2">
        <Navbar.Collapse id="basic-navbar-nav">
          <Container>
          <Nav className="mr-auto space-between">
          <Row>
            <Col className="col-12">
              <Form onSubmit={handleSubmit} >
                <Form.Group>
                  <Row>
                    <Col className="m-2">
                      <Form.Select aria-label="ville" onChange={(e) => handlePropertyTypeChange(e.target.value)}>
                        <option>{selectedOptions.ville || 'Ville'}</option>
                        <option value="Montreal" onClick={() => handlePropertyTypeChange('Montréal')}>Montréal</option>
                        <option value="Shawinigan" onClick={() => handlePropertyTypeChange('Shawinigan')}>Shawinigan</option>
                        <option value="Sherbrooke"onClick={() => handlePropertyTypeChange('Sherbrooke')}>Sherbrooke</option>
                      </Form.Select>
                    </Col>
                    <Col className="col-3 m-2">
                      <Form.Check
                        type="checkbox"
                        label="Zone Cyclable"
                        name="zoneCyclable"
                        onChange={handleCheckboxChange}
                      />
                    </Col>
                    <Col className="col-3 m-2">
                      <Form.Check
                        type="checkbox"
                        label="Espace Verts"
                        name="espaceVerts"
                        onChange={handleCheckboxChange}
                      />
                    </Col>
                    <Col className="col-3 m-lg-2">
                      <Form.Check
                        type="checkbox"
                        label="Arret Bus"
                        name="arretBus"
                        onChange={handleCheckboxChange}
                      />
                    </Col>
                    <Col className="col-4 m-lg-2">
                      <Form.Check
                        type="checkbox"
                        label="Places publiques"
                        name="placesPubliques"
                        onChange={handleCheckboxChange}
                      />
                    </Col>
                    <Col className="m-lg-2">
                      <Form.Check
                        type="checkbox"
                        label="Permis de travaux"
                        name="permisTravaux"
                        onChange={handleCheckboxChange}
                      />
                    </Col>
                    <Col>
                    <button className="btn btn-info m-2" type="submit"><FontAwesomeIcon icon={faSearch} /> Recherche</button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Col>
            <Col>
            </Col>
          </Row>
          </Nav>
          </Container>
        </Navbar.Collapse>    
      </Navbar>
   
    </>
  );
};

export default FilterBar