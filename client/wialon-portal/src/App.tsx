import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  const handleLogin = () => {
    const loginWindow = window.open('https://hosting.wialon.us/login.html?access_type=-1&activation_time=0&duration=0&lang=en&flags=0&response_type=token', 'Login', 'width=500,height=500');

    const timer = setInterval(() => {
      if (loginWindow && loginWindow.closed) {
        clearInterval(timer);
        return;
      }

      let url: any;
      try {
        url = loginWindow?.location.href;
      } catch (err) {
        console.error('Failed to access login window URL');
        return;
      }

      if (url.includes('access_token=')) {
        clearInterval(timer);
        const token = new URL(url).searchParams.get('access_token');
        console.log('Token:', token);
        // Send the token back to the server
        fetch('/route/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        })
        .then(response => response.json())
        .then(data => {
          // Handle the server's response
          console.log(data);
        })
        .catch(error => {
          // Handle the error
          console.error('Error:', error);
        });
      }
    }, 1000);
  };

  return (
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
  )
}

export default App
