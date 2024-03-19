import { useState, useEffect } from 'react'
import { Routes, useNavigate, BrowserRouter as Router, Route } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import User from './User';
import Login from './Login';

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const handleLoginSuccess = (event: MessageEvent) => {
      if (event.data === 'login-success') {
        window.location.href = '/user'; // replace with your page URL
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
    const authWindow = window.open('https://hosting.wialon.us/login.html?access_type=-1&activation_time=0&duration=0&lang=en&flags=0&response_type=token&redirect_uri=http://localhost:5173/redirect','Login', `width=${width},height=${height},left=${left},top=${top}`);
  
    // Listen for the message from the auth window
    window.addEventListener('message', (event) => {
      // Make sure the message is from the auth window
      if (event.source === authWindow) {
        const accessToken = event.data;

        // Send the access token to the server
        fetch('http://localhost:3000/auth/redirect', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessToken }),
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          // Handle the response...
          console.log(data);
          console.log('User logged in');
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
      }
    });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <div>
              <a href="https://vitejs.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
              <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
              </button>
              <button onClick={handleLogin}>
                Login
              </button>
              <p>
                Edit <code>src/App.tsx</code> and save to test HMR
              </p>
            </div>
            <p className="read-the-docs">
              Click on the Vite and React logos to learn more
            </p>
          </>
        } />
        <Route path="/redirect" element={<Login />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
  );
}

export default App;