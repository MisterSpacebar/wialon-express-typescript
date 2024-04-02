import React, { useMemo, useState, useEffect, createContext } from 'react'
import { Routes, useNavigate, BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';

import './styles/titleCard.css';

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import User from './components/User';
import Login from './components/Login';

type User = {
  session_id: string;
  name: string;
  user_id: number;
};

export const server = { port: 'http://localhost:3000' };
export const DataContext = createContext<{ data: User | null, setData: React.Dispatch<React.SetStateAction<User | null>> }>({ data: null, setData: () => {} });

function App() {

  const [count, setCount] = useState(0)
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    const handleLoginSuccess = (event: MessageEvent) => {
      console.log('event:', event.data);
      
      if (event.data === 'login-success') {
        console.log(event.data);
        window.location.href = '/user'; // replace with your page URL
        window.removeEventListener('message', handleLoginSuccess); // Stop listening for message events
      } else {
        try {
          let userData = JSON.parse(event.data);
          // console.log('raw data:', event.data);
          console.log("post message data: " + JSON.stringify(userData));
          setData(userData);
          window.location.href = '/user';
          window.removeEventListener('message', handleLoginSuccess); // Stop listening for message events
        } catch (error) {
          // The message is not a JSON string. Ignore it.
          // console.log('The message is not a JSON string. Ignore it.\n Error:', error);
          // console.log(event.data)
        }
      }
    };
  
    window.addEventListener('message', handleLoginSuccess);
  
    return () => {
      window.removeEventListener('message', handleLoginSuccess);
    };
  }, []);

  const handleLogin = () => {
    let height = 500;
    let width = 500;
    let left = (screen.width - width) / 2;
    let top = (screen.height - height) / 2;
    window.open('https://hosting.wialon.us/login.html?access_type=-1&activation_time=0&duration=0&lang=en&flags=0&response_type=token&redirect_uri=http://localhost:5173/redirect','Login', `width=${width},height=${height},left=${left},top=${top}`);
  };

  const value = useMemo(() => ({ data, setData }), [data, setData]);

  return (
    <DataContext.Provider value={value}>
      <Router>
        <Routes>
          <Route path="/" element={
            <div className="jumbotron jumbotron-fluid main-jumbo">
              <Card className='main-page title-card band-card'>
                <Card.Body>
                  <Card.Title className='title'>
                    <h1>Wialon Portal</h1>
                    </Card.Title>
                  <br></br>
                  <Card.Text>
                    <div className='login-buttons'>
                      <Button className='login-button' variant="info" onClick={handleLogin}>
                        Login
                      </Button>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          } />
          <Route path="/redirect" element={<Login />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Router>
    </DataContext.Provider>
  );
}

export default App;