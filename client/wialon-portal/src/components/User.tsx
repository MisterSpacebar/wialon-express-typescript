// User.tsx
import React, { useEffect, useContext, useState } from 'react';
import Header from './Header.tsx';
import { server, DataContext } from '../App.tsx';

import Units from './Units.tsx';

type User = {
    session_id: string;
    name: string;
    user_id: number;
};

let templateUser: User = {
    session_id: '',
    name: '',
    user_id: 0
};

const UserComponent = () => {
  let [user, setUser] = useState<User>(templateUser);
  const { data, setData } = useContext(DataContext);

    useEffect(() => {
      
        const fetchData = async () => {
          try {
            const response = await fetch(server.port+'user/session', { credentials: 'include' });
            if (response.ok) {
              const responseBody = await response.text();
              console.log('Response body (String):', responseBody);
              console.log('Response body (JSON):', JSON.parse(responseBody));
              let ResBodyJson = JSON.parse(responseBody);
              // force user template to be updated
              let userData: User = {
                session_id: ResBodyJson.user.session_id,
                name: ResBodyJson.user.name,
                user_id: ResBodyJson.user.user_id
              };
              // update user state
              setUser(userData);
              setData(userData);
              console.log('setUser', user);
            } else {
              console.error('Fetching user data failed:', response);
            }
          } catch (error) {
            console.log('Fetching user data failed:', error);
          }
        };
        fetchData();
      
    }, []);



    console.log('User (State):', user);
    console.log('User (Context):', data);

    if(!user.name) {
      return <div> <Header /> <p>Loading...</p> </div>
    }

    return (
      <div>
        <Header />
        <Units />
      </div>
    );
  };
  
  export default UserComponent;