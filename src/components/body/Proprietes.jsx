import React,{useState} from 'react';
import { validateProperty, saveProperty } from './ProprieteAction';
import {Card, Modal, Button, Form,Row, Col,} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const Proprietes = () => {
  
  const [show, setShow] = useState(false);

  const propriete = [
    { id: 1, user: 'Jedeon', commentaire: 'Ceci est un avis sur la ville A.' },
    { id: 2, user: 'Halime', commentaire: 'Ceci est un avis sur le Quatier B.' },
    { id: 3, user: 'Galius', commentaire: "Ceci est un avis sur l'Arondicement C.Ceci est un avis sur l'Arondicement C." },
    { id: 3, user: 'Samuel', commentaire: 'Ceci est un avis sur la Rue D.' },
  ];

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
      <div className='p-4 border'>
        <h3 className="mt-5">Avis de la population</h3>
        <button  className="btn btn-info  w-10 my-2" onClick={handleShow} style={{ fontWeight: 'bold' }}><FontAwesomeIcon icon={faPlus} />Ajouter une propriete</button>
       
        <Row className="justify-content-center">
          {propriete.map((proprieteItem) => (
            <Col key={proprieteItem.id} xs={12} md={12} lg={12} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className='text-info'>{proprieteItem.user}</Card.Title>
                  <Card.Text>{proprieteItem.commentaire}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      
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



