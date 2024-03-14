import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import {Navbar,Nav, Button, Form,Row, Col,} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MultiSelect } from "react-multi-select-component";


const FilterBar = ({onFilterChange}) => {

  const [selected, setSelected] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    city: 'montreal',
    displayZonage: false,
    displayReseauCyclable: false,
    displayParcsEspacesVerts: false,
    displayPointArretBus: false,
    displayPlacesPubliques: false,
    displayPermis: false,
    displayIndiceEquiteMilieuxVie: false
  });
  

  const handlePropertyTypeChange = (city) => {
    setSelectedOptions({ ...selectedOptions, city });
  };

  // const handleCheckboxChange = (e) => {
  //   const { name, checked } = e.target;
  //   setSelectedOptions({ ...selectedOptions, [name]: checked });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(selectedOptions);
  };

  const rebuildSelectedOptions = (elts) => {
    const options = {
      city: selectedOptions.city,
      displayZonage: false,
      displayReseauCyclable: false,
      displayParcsEspacesVerts: false,
      displayPointArretBus: false,
      displayPlacesPubliques: false,
      displayPermis: false,
      displayIndiceEquiteMilieuxVie: false
    }
    elts.forEach(e => {
      options[`${e.value}`] = true;
    });
    setSelectedOptions(options);
  };

  const handleMultiPickChange = (selectedElmts) => {
    debugger
    setSelected(selectedElmts);
    rebuildSelectedOptions(selectedElmts);
  };

  const options = [
    { label: "📜Indice Equite Milieux Vie", value: "displayIndiceEquiteMilieuxVie" },
    { label: "🗺️Zonage", value: "displayZonage" },
    { label: "🚲Zone Cyclable", value: "displayReseauCyclable"},
    { label: "🌲Espace Verts", value: "displayParcsEspacesVerts"},
    { label: "🚍Arret Bus", value: "displayPointArretBus"},
    { label: "🎡Places publiques", value: "displayPlacesPubliques"},
    { label: "📜Permis de travaux", value: "displayPermis"},
  ];

  return (
    <>
      <Navbar bg="light" className="my-2 mx-3 p-2">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto space-between" style={{ width: '100%'}}>
          
                  <Row style={{ width: '100%'}}>
                    <Col className="col-3">
                    <button className="btn btn-info"><FontAwesomeIcon icon={faSearch} onClick={handleSubmit} /></button>
                    </Col>
                    <Col className="col-4">
                      <Form.Select aria-label="city" onChange={(e) => handlePropertyTypeChange(e.target.value)}>
                        <option value="montreal">Montréal</option>
                        <option value="shawinigan">Shawinigan</option>
                        <option value="sherbrooke">Sherbrooke</option>
                      </Form.Select>
                    </Col>
                    <Col className="col-5">
                    <MultiSelect
                      options={options}
                      value={selected}
                      onChange={handleMultiPickChange}
                      labelledBy="Select Features to display"
                    />
                      {/* <Form.Select aria-label="city" onChange={(e) => handlePropertyTypeChange(e.target.value)}>
                        <option value="montreal">Montréal</option>
                        <option value="shawinigan">Shawinigan</option>
                        <option value="sherbrooke">Sherbrooke</option>
                      </Form.Select> */}
                    </Col>
                  {/* </Row>
                  <Row> */}
                    {/* <Col className="col-3 mt-2">
                      <Form.Check
                        type="checkbox"
                        label="Indice Equite Milieux Vie"
                        name="displayIndiceEquiteMilieuxVie"
                        onChange={handleCheckboxChange}
                      />
                    </Col>
                    <Col className="col-3 mt-2">
                      <Form.Check
                        type="checkbox"
                        label="Zonage"
                        name="displayZonage"
                        onChange={handleCheckboxChange}
                      />
                    </Col>
                    <Col className="col-3 mt-2">
                      <Form.Check
                        type="checkbox"
                        label="Zone Cyclable"
                        name="displayReseauCyclable"
                        onChange={handleCheckboxChange}
                      />
                    </Col>
                    <Col className="col-3 mt-2">
                      <Form.Check
                        type="checkbox"
                        label="Espace Verts"
                        name="displayParcsEspacesVerts"
                        onChange={handleCheckboxChange}
                      />
                    </Col>
                    <Col className="col-3 mt-2">
                      <Form.Check
                        type="checkbox"
                        label="Arret Bus"
                        name="displayPointArretBus"
                        onChange={handleCheckboxChange}
                      />
                    </Col>
                    <Col className="col-3 mt-2">
                      <Form.Check
                        type="checkbox"
                        label="Places publiques"
                        name="displayPlacesPubliques"
                        onChange={handleCheckboxChange}
                      />
                    </Col>
                    <Col className="m-lg-2">
                      <Form.Check
                        type="checkbox"
                        label="Permis de travaux"
                        name="displayPermis"
                        onChange={handleCheckboxChange}
                      />
                    </Col> */}
                    
                    
                  </Row>
                
              
            
          
          </Nav>
        </Navbar.Collapse>    
      </Navbar>
   
    </>
  );
};

export default FilterBar