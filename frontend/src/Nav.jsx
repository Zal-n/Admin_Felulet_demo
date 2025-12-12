import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Home from './Home';
import Products from './Products';
import Login from './Login';
import Upload from './Upload';

function NavbarComponent({ user, setUser }) {

  async function handleLogout(){
    const res = await fetch('http://localhost:3000/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser();
    
  }
  return (
    <BrowserRouter>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={NavLink} to='/'>Admin Felület Demó</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {
                user ? (<Nav.Link as={NavLink} to='/products'>Termékek</Nav.Link>) : null
              }

              {
                (user && user.rights == 1) ?
                  (
                    <Nav.Link as={NavLink} to='/upload'>Termék feltöltése</Nav.Link>
                  ) : null
              }
              {!user ?
                (
                  <>
                    <Nav.Link as={NavLink} to='/login'>Bejelentkezés</Nav.Link>
                  </>
                ) : null
              }
            </Nav>
            {user ?
              (
                <div className="ms-auto">
                  <Button className="bg-danger" onClick={handleLogout}>Kijelentkezés</Button>
                </div>
              ) : null
            }


          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={user ? <Products /> : <Navigate to='/login' />} />
        <Route path='/upload' element={(user && user.rights == 1) ? <Upload /> : <Navigate to='/login' />} />
        <Route path='/login' element={!user ? <Login setUser={setUser}/> : <Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  )
}

export default NavbarComponent;