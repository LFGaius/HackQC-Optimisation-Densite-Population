import React,{useState} from 'react';
import { validateProperty, saveProperty, propertys } from './ProprieteAction';
import {Card, Modal, Button, Form,Row, Col,} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons';

export const Proprietes = () => {
  
  const propriete = propertys();

  const [show, setShow] = useState(false);
  const [proprieteEtendue, setProprieteEtendue] = useState(null);

  // fonctio pour gérer l'affichage de la suite du texte

  const toggleAfficherSuite = (id) => {
    setProprieteEtendue(proprieteEtendue === id ? null : id); // Inverser l'état d'affichage de la suite du texte
  };
  ////
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

      alert("Donnees enregistre avec succes")
      
      setShow(false);
    } else {
      console.error("Erreur de validation :", validationResult.errorMessage);
      // Gérer les erreurs de validation ici, par exemple afficher un message d'erreur à l'utilisateur
      alert("Veillez remplir tout les champs")
    }
  };
  return (
    <>
      <div className='p-2 pt-0'>
        <h3 className="mt-5">Annonces des propriétaires</h3>
        <button  className="btn btn-light text-info  w-10 my-2" onClick={handleShow} style={{ fontWeight: 'bold' }}><FontAwesomeIcon icon={faPlus} />Ajouter Annonces</button>
        <Row className="justify-content-center">
          {propriete.map((proprieteItem) => (
            <Col key={proprieteItem.id} xs={12} md={12} lg={12} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className='text-primary'>{proprieteItem.user}</Card.Title>
                  <Card.Text>Contact: {proprieteItem.contact}</Card.Text>
                  <Card.Text>Adresse: {proprieteItem.adress}</Card.Text>
                  <Card.Text>Type de proprieté: {proprieteItem.buildingType}</Card.Text>
                  <Card.Text>Nombre Unités: {proprieteItem.unitsAvailable}</Card.Text>
                  <Card.Text>Status: {proprieteItem.state}</Card.Text>
                  <h5>
                    Description
                    <Button variant="link" onClick={() => toggleAfficherSuite(proprieteItem.id)}>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </Button>
                  </h5>
                  <Card.Text>
                    {proprieteEtendue === proprieteItem.id ? proprieteItem.commentaire : `${proprieteItem.commentaire.slice(0, 100)}...`}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Annonce</Modal.Title>
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



