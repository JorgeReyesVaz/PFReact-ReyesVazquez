import { CartWidget } from "./CartWidget";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

export  const Navbar1 = () => {
    return(
    
          <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
              <Container>
                <Navbar.Brand  as={NavLink} to="/">PanelStore</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link  as={NavLink} to="/">Inicio</Nav.Link>
                    <NavDropdown title="Catalogo" id="basic-nav-dropdown">
                      <NavDropdown.Item as={NavLink} to="/category/Paneles">Paneles</NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/category/Inversores">
                        Inversores
                      </NavDropdown.Item>
                      <NavDropdown.Item as={NavLink} to="/category/Estructuras">Estructura</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Container>
              <CartWidget />
            </Navbar>
            
    );
}