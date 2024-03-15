import React, { useState } from "react";
import {Navbar,Nav, Form,Row, Col,} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { MultiSelect } from "react-multi-select-component";
const OPTIONS = {
  'montreal' : [
    { label: "🕵️‍♂️Indice Equite Milieux Vie ( intensité du 🔴)", value: "displayIndiceEquiteMilieuxVie" },
    { label: "🚲Zone Cyclable", value: "displayReseauCyclable"},
    { label: "🌲Espace Verts", value: "displayParcsEspacesVerts"},
    { label: "🎡Places publiques", value: "displayPlacesPubliques"},
    { label: "📜Permis de travaux", value: "displayPermis"}
  ],
  'shawinigan' : [
    { label: "🗺️Zonage", value: "displayZonage" },
    { label: "🚲Zone Cyclable", value: "displayReseauCyclable"},
    { label: "🌲Espace Verts", value: "displayParcsEspacesVerts"},
    { label: "🚍Arret Bus", value: "displayPointArretBus"},
  ],
  'sherbrooke' : [
    { label: "🗺️Zonage", value: "displayZonage" }
  ]
};

const FilterBar = ({onFilterChange}) => {

  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState(OPTIONS['montreal']);
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
    setSelectedOptions({ displayZonage: false,
      displayReseauCyclable: false,
      displayParcsEspacesVerts: false,
      displayPointArretBus: false,
      displayPlacesPubliques: false,
      displayPermis: false,
      displayIndiceEquiteMilieuxVie: false, city });
    setOptions(OPTIONS[`${city}`])
    setSelected([])
  };

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
    setSelected(selectedElmts);
    rebuildSelectedOptions(selectedElmts);
  };

  return (
    <>
      <Navbar bg="light" className="my-2 mx-3 p-2">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto space-between" style={{ width: '100%'}}>
            <Row style={{ width: '100%'}}>
              <Col className="col-4">
                <span style={{color:'#535353'}}>Ville</span>
                <Form.Select aria-label="city" onChange={(e) => handlePropertyTypeChange(e.target.value)}>
                  <option value="montreal">Montréal</option>
                  <option value="shawinigan">Shawinigan</option>
                  <option value="sherbrooke">Sherbrooke</option>
                </Form.Select>
              </Col>
              <Col className="col-5">
                <span style={{color:'#535353'}}>Eléments à afficher</span>
              <MultiSelect
                options={options}
                value={selected}
                onChange={handleMultiPickChange}
                labelledBy="Select Features to display"
              />
              </Col>
              <Col className="col-3 d-flex justify-content-end">
                <button className="btn btn-info mt-4"  style={{ color: 'white', height:'40px'}}><FontAwesomeIcon style={{ color: 'white'}} icon={faSearch} onClick={handleSubmit} /></button>
              </Col>
            </Row>
          </Nav>
        </Navbar.Collapse>    
      </Navbar>
    </>
  );
};

export default FilterBar