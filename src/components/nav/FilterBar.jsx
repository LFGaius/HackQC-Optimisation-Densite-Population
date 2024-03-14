import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { validateProperty, saveProperty } from './Propriete';
import {Navbar,Nav,Modal, Button, Form,Row, Col,} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const FilterBar = ({onFilterChange}) => {

  const [show, setShow] = useState(false);

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

  const [property, setProperty] = useState({buildingType: '',unitsAvailable: '',state: '',deliveryDate: '',address: '',contact: ''});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleSave = () => {
    const validationResult = validateProperty(property);
    if (validationResult.isValid) {
      const savedProperty = saveProperty(property);
      setProperty(savedProperty);
      setShow(false);
    } else {
      console.error("Erreur de validation :", validationResult.errorMessage);
      // Gérer les erreurs de validation ici, par exemple afficher un message d'erreur à l'utilisateur
    }
  };

 

  return (
    <>
      <Navbar bg="light" className="my-2 mx-3 p-2">
        <Navbar.Collapse id="basic-navbar-nav">
          <Container>
          <Nav className="mr-auto  space-between">
          <Row>
            <Col className="col-10">
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
              <a href="#" className="btn btn-secondary" onClick={handleShow}>Ajouter une propriete</a>
            </Col>
          </Row>
          </Nav>
          </Container>
        </Navbar.Collapse>    
      </Navbar>
   
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une propriété</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <Form method="POST" >
                <Form.Group controlId="buildingType">
                  <Form.Label>Type de bâtiment</Form.Label>
                  <Form.Control as="select" name="buildingType" value={property.buildingType} onChange={handleChange}>
                    <option value="">Sélectionner...</option>
                    <option value="Duplex">Duplex</option>
                    <option value="Triplex">Triplex</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="unitsAvailable">
                  <Form.Label>Nombre d'unités libres</Form.Label>
                  <Form.Control type="number" name="unitsAvailable" value={property.unitsAvailable} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="state">
                  <Form.Label>État</Form.Label>
                  <Form.Control as="select" name="state" value={property.state} onChange={handleChange}>
                    <option value="">Sélectionner...</option>
                    <option value="En construction">En construction</option>
                    <option value="Fonctionnel">Fonctionnel</option>
                  </Form.Control>
                </Form.Group>

                {property.state === 'En construction' && (
                  <Form.Group controlId="deliveryDate">
                    <Form.Label>Date de livraison du chantier</Form.Label>
                    <Form.Control type="date" name="deliveryDate" value={property.deliveryDate} onChange={handleChange} />
                  </Form.Group>
                )}

                <Form.Group controlId="address">
                  <Form.Label>Adresse</Form.Label>
                  <Form.Control type="adresse" name="address" value={property.address} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="contact">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control type="number" name="contact" value={property.contact} onChange={handleChange} />
                </Form.Group>
              </Form>
            </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FilterBar