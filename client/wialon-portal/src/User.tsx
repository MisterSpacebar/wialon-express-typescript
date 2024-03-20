// User.tsx
import React, { useEffect, useState } from 'react';
import Header from './Header';

type User = {
    session_id: string;
    name: string;
    user_id: number;
};

const UserComponent = () => {
    const [user, setUser] = useState<User | null>(null);
    const [requestSent, setRequestSent] = useState(false);

    useEffect(() => {
      if(!requestSent){
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3000/user/session');
            if (response.ok) {
              const responseBody = await response.text();
              console.log('Response body:', responseBody);
  
              // Now try to parse it as JSON
              const data = JSON.parse(responseBody);
              console.log('Fetched data:', data);
              setUser(data.user);
              setRequestSent(true);
            } else {
              console.error('Fetching user data failed with status:', response.status);
              console.log('Response:', response);
            }
          } catch (error) {
            console.log('Fetching user data failed:', error);
          }
        };
        fetchData();
      }
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