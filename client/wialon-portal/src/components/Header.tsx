// Header.tsx
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../App.tsx';

const Header = () => {
    const navigate = useNavigate();
    const { data } = useContext(DataContext);
    const handleLogout = async () => {
        try {

          // Send a request to the server to log the user out
          // AT THE TIME OF IMPLEMENTATION, THIS FUNCTIONALITY SEEMS TO BE BROKEN
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
            navigate('/');
          }
        } catch (error) {
          console.error('Logout failed:', error);
        }
    };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '1em', background: '#f5f5f5' }}>
      <h1 className='user-name-header'>{data ? data.name : 'Loading... please try logging in again if login is not successful'}</h1>
      <button type="button" className="btn btn-primary btn-danger btn-lg logout-button-header" onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;