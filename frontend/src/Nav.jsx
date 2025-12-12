import { Navbar, Container, Nav } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import Login from './Login';
import Upload from './Upload';

function NavbarComponent({ user, setUser }) {
  return (
    <BrowserRouter>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Admin Felület Demó</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to='/'>Home</Nav.Link>
              <Nav.Link as={NavLink} to='/products'>Termékek</Nav.Link>
              <Nav.Link as={NavLink} to='/upload'>Termék feltöltése</Nav.Link>
              <Nav.Link as={NavLink} to='/login'>Bejelentkezés</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default NavbarComponent;