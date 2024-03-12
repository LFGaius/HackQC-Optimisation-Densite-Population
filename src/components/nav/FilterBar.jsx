import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import {
  Navbar,
  Nav,
  Dropdown,Modal, Button, Form,
} from "react-bootstrap";

const FilterBar = ({onFilterChange}) => {
////////////////////////////////

  const [show, setShow] = useState(false);
  const [property, setProperty] = useState({
    buildingType: '',
    unitsAvailable: '',
    state: '',
    deliveryDate: '',
    address: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleSave = () => {
    // Logique de validation et sauvegarde des données ici
    console.log(property);
    // Réinitialiser le formulaire après la sauvegarde
    setProperty({
      buildingType: '',
      unitsAvailable: '',
      state: '',
      deliveryDate: '',
      address: ''
    });
    setShow(false);
  };

  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handlePropertyTypeChange = (type) => {
    setPropertyType(type);
    onFilterChange({ propertyType: type, priceRange });
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
    onFilterChange({ propertyType, priceRange: range });
  };

  return (
    <>
    <Container>
      <Navbar bg="light" className="my-2 p-2">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto d-flex ">
            <Dropdown className="mx-2">
              <Dropdown.Toggle variant="light">
                {propertyType || 'Ville'}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handlePropertyTypeChange('Appartement')}>Appartement</Dropdown.Item>
                <Dropdown.Item onClick={() => handlePropertyTypeChange('Maison')}>Maison</Dropdown.Item>
                <Dropdown.Item onClick={() => handlePropertyTypeChange('Terrain')}>Terrain</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <a href="#" className="btn btn-secondary" onClick={handleShow}>Ajouter une propriete</a>
            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>

    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Ajouter une propriété</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
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
          <Form.Control type="text" name="unitsAvailable" value={property.unitsAvailable} onChange={handleChange} />
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
          <Form.Control type="text" name="address" value={property.address} onChange={handleChange} />
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