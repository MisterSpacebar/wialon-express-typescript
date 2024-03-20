// Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

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
      <h1>Welcome to the User Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;