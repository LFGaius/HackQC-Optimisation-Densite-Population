import React,{useState} from 'react';
import { validateReview, saveReview, avisL } from './AvisAction';
import {Card,Modal, Button, Form,Row, Col,} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const Avis = () => {
  
  const [show, setShow] = useState(false);

  const avis = avisL();

  const [review, setReview] = useState({name: '',emailAddress: '',comment: ''});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSave = () => {
    const validationResult = validateReview(review);
    if (validationResult.isValid) {
      const savedReview = saveReview(review);
      setReview(savedReview);

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
      <section className='p-2 pt-0'>
        <h3 className="mt-5">Avis de la population</h3>
        <button  className="btn btn-info  w-10 my-2" onClick={handleShow} style={{ fontWeight: 'bold' }}><FontAwesomeIcon icon={faPlus} />Ajouter une propriete</button>
       
        <Row className="justify-content-center">
          {avis.map((avisItem) => (
            <Col key={avisItem.id} xs={12} md={12} lg={12} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className='text-info'>{avisItem.user}</Card.Title>
                  <Card.Text>{avisItem.commentaire}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un Avis</Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <Form method="POST" >

                <Form.Group controlId="name">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control type="text" name="name" value={review.name} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="emailAddress">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" name="emailAddress" value={review.emailAddress} onChange={handleChange} />
                </Form.Group>

                <Form.Group controlId="comment">
                  <Form.Label>Commentaire</Form.Label>
                  <Form.Control as="textarea" rows={3} name="comment" value={review.comment} onChange={handleChange} placeholder="Ajouter un commentaire"/>
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



