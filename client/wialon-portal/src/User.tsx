// User.tsx
import React, { useEffect, useState } from 'react';
import Header from './Header';

type User = {
    name: string;
    id: string;
};

const UserComponent = () => {
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
        fetch('http://localhost:5173/auth/session')
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('Fetched data:', data);
            setUser(data.user);
          })
          .catch(error => {
            console.log('Fetching user data failed:', error);
          });
      }, []);
  
    return (
      <div>
        <Header />
        <p>This is the User component.</p>
        {user && <p>Welcome, {user.name}!</p>}
      </div>
    );
  };
  
  export default UserComponent;