import { useCallback } from "react";
import { Form, Button, Container } from "react-bootstrap";


function Login({ user, setUser }) {

  async function handleSubmit (e){
    e.preventDefault();

    const formData = new FormData(e.target);

    const data = Object.fromEntries(formData.entries());
    try {

      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (res.ok) {
        const user = (await res.json()).data;
        console.log(user)
        setUser(user);
      }
    } catch(error) {
      console.error(error)
      alert('Sikertelen bejelentkezés');
    }
  }
  return (
    <>
      <h1>Bejelentkezés</h1>
      <Container className="w-50 border border-dark rounded p-5">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicText">
            <Form.Label>Felhasználónév</Form.Label>
            <Form.Control type="text" placeholder="Felhasználónév" name="username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Jelszó</Form.Label>
            <Form.Control type="password" placeholder="*****" name="password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Bejelentkezés
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default Login;