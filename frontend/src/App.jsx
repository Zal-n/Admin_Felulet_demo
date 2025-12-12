import './App.css';
import NavbarComponent from './Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';


function App() {
  const [user, setUser] = useState("");

  // Restore user state from cookie on page load
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('http://localhost:3000/me', {
          credentials: 'include',
        });
        
        if (res.ok) {
          const userData = (await res.json()).data;
          setUser(userData);
        }
      } catch (error) {
        console.log('Not authenticated');
      }
    }
    
    checkAuth();
  }, []);

  return (
    <>
      <NavbarComponent user={user} setUser={setUser}/>

    </>
  )
}

export default App
