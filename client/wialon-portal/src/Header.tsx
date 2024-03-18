// Header.tsx
import React from 'react';

const Header = () => {
    const handleLogout = async () => {
        try {
          const response = await fetch('/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}), // If you need to send data to your Express server, add it here
          });
      
          if (response.ok) {
            console.log('User logged out');
            // Handle successful logout (e.g., redirect to login page)
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