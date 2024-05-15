import React, { useMemo, useState, createContext } from 'react'
import { Routes,  BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/titleCard.css';

// importing pages/components
import User from './components/User';
import Login from './components/Login';
import HomeScreen from './components/HomeScreen';

// define the user data type
// this will be what is going to be sent to the client
type User = {
  session_id: string;
  name: string;
  user_id: number;
};

// allows child components to access and update the user data
// server URL is exported for clarity instead of hardcoding the URL
export const server = { port: 'http://172.16.1.202:3000' };
export const DataContext = createContext<{ data: User | null, setData: React.Dispatch<React.SetStateAction<User | null>> }>({ data: null, setData: () => {} });

function App() {
  const [data, setData] = useState<User | null>(null);
  const value = useMemo(() => ({ data, setData }), [data, setData]);

  return (
    <DataContext.Provider value={value}>
      <Router>
        <Routes>
          <Route path="/" element={ <HomeScreen />} />
          <Route path="/redirect" element={<Login />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Router>
    </DataContext.Provider>
  );
}

export default App;