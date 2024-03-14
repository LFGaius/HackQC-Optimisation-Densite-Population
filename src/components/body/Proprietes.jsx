import React,{useState} from 'react';
import { validateProperty, saveProperty } from './ProprieteAction';
import {Card, Modal, Button, Form,Row, Col,} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faChevronDown } from '@fortawesome/free-solid-svg-icons';

export const Proprietes = () => {
  
  const [show, setShow] = useState(false);
  const [proprieteEtendue, setProprieteEtendue] = useState(null);

  const propriete = [
    { id: 1, user: 'Jedeon',contact:'(514) 567 567', adress:'1 Ville-Marie',buildingType:'Duplex',unitsAvailable:'9',state:'Fonctionnel', commentaire: "Ceci est une description  ReactJS est très populaire, car c'est un framework idéal pour la création de tout type de plateforme" },
    { id: 2, user: 'Halime', contact:'(514) 566 566', adress:'2 rue Berri-UQAM',buildingType:'Triplex',unitsAvailable:'4',state:'En Construction', commentaire: 'Ceci est une description  A.Ceci est une description  A.Ceci est une description  A.Ceci est une description  A.Ceci est une description  A.Ceci est une description  A.' },
    { id: 3, user: 'Galius', contact:'(514) 565 565', adress:'30 Pierre-Tétreaut',buildingType:'Triplex',unitsAvailable:'12',state:'Fonctionnel', commentaire: " Il couvre tous les domaines, principalement le développement mobile, Web et natif. Les développeurs ReactJS sont facilement capables de gérer divers contextes de développement d'interface utilisateur."},
    { id: 4, user: 'Samuel', contact:'(514) 564 564', adress:'4040 Rue Ontario Est',buildingType:'Duplex',unitsAvailable:'5',state:'En Construction', commentaire: "React est une bibliothèque JavaScript open-source qui est utilisée pour construire des interfaces utilisateur spécifiquement pour des applications d'une seule page. Elle est utilisée pour gérer la couche d'affichage des applications web et mobiles" },
  ]; 
  
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



