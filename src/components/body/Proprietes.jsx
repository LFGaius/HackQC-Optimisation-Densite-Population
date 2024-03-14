import React,{useState, useEffect} from 'react';
import { validateProperty, saveProperty } from './ProprieteAction';
import {Card, Modal, Button, Form,Row, Col,} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { database } from '../../firebase-config';
import { ref, set, onValue } from 'firebase/database';

export const Proprietes = () => {

  const [show, setShow] = useState(false);
  const [proprieteEtendue, setProprieteEtendue] = useState(null);
  const [propriete, setPropriete] = useState([]);

  useEffect(() => {
    onValue(ref(database, 'properties'), (snapshot) => {debugger
      const data = snapshot.val();
      setPropriete(data);
    });
  }, []); // The empty array ensures this effect runs only once after the initial render 
  
  // fonctio pour gérer l'affichage de la suite du texte
  const toggleAfficherSuite = (id) => {
    setProprieteEtendue(proprieteEtendue === id ? null : id); // Inverser l'état d'affichage de la suite du texte
  };

  const [property, setProperty] = useState({buildingType: '',unitsAvailable: '',status: '',deliveryDate: '',address: '',contact: ''});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleSave = async () => {
    const validationResult = validateProperty(property);
    if (validationResult.isValid) {
      const savedProperty = saveProperty(property);
      setProperty(savedProperty);
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(property.address)}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
      try {debugger
          const response = await fetch(url);
          const data = await response.json();
          if (data.status === 'OK') {
            const { lat, lng } = data.results[0].geometry.location;
            property.city = 'montreal';
            property.id = propriete.length;
            property.lng = lng;
            property.lat = lat;
            property.user = 'General';
            set(ref(database, 'properties/'+propriete.length+''), property);
          } else {
            console.error('Geocoding failed:', data.status);
          }
        } catch (error) {
          console.error('Geocoding error:', error);
        }

      // alert("Donnees enregistre avec succes")
      
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
        <button  className="btn btn-info  w-10 my-2" onClick={handleShow} style={{ fontWeight: 'bold', color : 'white' }}><FontAwesomeIcon icon={faPlus} />Ajouter Annonces</button>
        <Row className="justify-content-center">
          {propriete.map((proprieteItem) => (
            <Col key={proprieteItem.id} xs={12} md={12} lg={12} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className='text-primary'>{proprieteItem.user}</Card.Title>
                  <Card.Text>Contact: {proprieteItem.contact}</Card.Text>
                  <Card.Text>Adresse: {proprieteItem.address}</Card.Text>
                  <Card.Text>Type de proprieté: {proprieteItem.buildingType}</Card.Text>
                  <Card.Text>Nombre Unités: {proprieteItem.unitsAvailable}</Card.Text>
                  <Card.Text>Status: {proprieteItem.status}</Card.Text>
                  <h5>
                    Description
                    <Button variant="link" onClick={() => toggleAfficherSuite(proprieteItem.id)}>
                      <FontAwesomeIcon icon={faChevronDown} />
                    </Button>
                  </h5>
                  <Card.Text>
                    {proprieteEtendue === proprieteItem.id ? proprieteItem.comment : `${proprieteItem.comment?.slice(0, 100)}...`}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Annonce de location</Modal.Title>
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

                <Form.Group controlId="status">
                  <Form.Label>État</Form.Label>
                  <Form.Control as="select" name="status" value={property.status} onChange={handleChange}>
                    <option value="">Sélectionner...</option>
                    <option value="En construction">En construction</option>
                    <option value="Fonctionnel">Fonctionnel</option>
                  </Form.Control>
                </Form.Group>

                {property.status === 'En construction' && (
                  <Form.Group controlId="deliveryDate">
                    <Form.Label>Date de livraison du chantier</Form.Label>
                    <Form.Control type="date" name="deliveryDate" value={property.deliveryDate} onChange={handleChange} />
                  </Form.Group>
                )}

                <Form.Group controlId="address">
                  <Form.Label>Adresse</Form.Label>
                  <Form.Control type="address" name="address" value={property.address} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="contact">
                  <Form.Label>Contact</Form.Label>
                  <Form.Control type="text" name="contact" value={property.contact} onChange={handleChange} />
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



