// NavbarComponent.js
import React from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';

const NavbarComponent = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home" className='text-info' style={{ fontWeight: 'bold' }}>STRATIOTES</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className=' justify-content-center'>
          <Nav className="mr-auto">
            <Nav.Link href="#link">A LOUER</Nav.Link>
            <Nav.Link href="#link">À PROPOS</Nav.Link>
            <Nav.Link href="#link">SE CONNECTER</Nav.Link>
            <Nav.Link href="#link">S'INSCRIRE</Nav.Link>
            <NavDropdown title="USER" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profil</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Profil</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Déconnexion</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
