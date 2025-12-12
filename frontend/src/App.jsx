import './App.css';
import NavbarComponent from './Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


function App() {
  const [user, setUser] = useState({});

  return (
    <>
<NavbarComponent/>

    </>
  )
}

export default App
