import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const NavBar = ({ onTypeSelect, onLocationSelect }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    onTypeSelect(type);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    onLocationSelect(location);
  };

  const handleSearch = () => {
    console.log("Recherche effectuée avec la query :", searchQuery);
    // Implémentez votre logique de recherche ici
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">STRATIOTES</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="flex justify-content-center"
        >
          <Nav className="mr-auto flex">
            <Nav.Link href="#">Accueil</Nav.Link>
            <NavDropdown
              title={selectedType || "Ville"}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => handleTypeSelect("Montréal")}>
                Montréal
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleTypeSelect("Shawinigan")}>
                Shawinigan
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleTypeSelect("SherBrooke")}>
                SherBrooke
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title={selectedLocation || "Annonces"}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                onClick={() => handleLocationSelect("Annonce A")}
              >
                Annonce A
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => handleLocationSelect("Annonce B")}
              >
                Annonce B
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => handleLocationSelect("Annonce C")}
              >
                Annonce C
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
