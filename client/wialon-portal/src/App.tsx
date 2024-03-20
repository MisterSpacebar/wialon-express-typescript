import { useState, useEffect } from 'react'
import { Routes, useNavigate, BrowserRouter as Router, Route } from 'react-router-dom';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import User from './User';
import Login from './Login';

//janky way to get the access token from the popup window
const template = {
  session_id: '',
  name: '',
  user_id: ''
};

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const handleLoginSuccess = (event: MessageEvent) => {
      if (event.data === 'login-success') {
        console.log(event.data);
        window.location.href = '/user'; // replace with your page URL
      } else {
        try {
          console.log('raw data:', event.data);
          const data = JSON.parse(event.data);
          console.log(data);

          window.location.href = '/user'; // replace with your page URL
          // IMPORTANT: Do not forget to remove the event listener AND TO SAVE THE USER DATA TO THE STATE
          
        } catch (error) {
          // The message is not a JSON string. Ignore it.
          console.log('The message is not a JSON string. Ignore it.\n Error:', error);
          console.log(event.data)
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            {/* <div>
              <a href="https://vitejs.dev" target="_blank">
                <img src={viteLogo} className="logo" alt="Vite logo" />
              </a>
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div> */}
            <h1>Wialon Portal</h1>
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