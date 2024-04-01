// Header.tsx
import React, { useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../App.tsx';

const Header = () => {
    const navigate = useNavigate();
    const { data, setData } = useContext(DataContext);
    const handleLogout = async () => {
        try {
          const response = await fetch('/logout', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
      
          if (response.ok) {
            console.log('User logged out');
            // Handle successful logout and redirect to the login page
            navigate('/');
          } else {
            // Handle unsuccessful logout
            console.error('Logout failed');
          }
        } catch (error) {
          console.error('Logout failed:', error);
        }
    };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1em', background: '#f5f5f5' }}>
      <h1>Welcome, {data ? data.name : 'Loading...'}</h1>
      <button type="button" className="btn btn-primary btn-danger btn-lg" onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;