// User.tsx
import React, { useEffect, useState } from 'react';
import Header from './Header';
import DataContext from './contexts/DataContext';

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

  //const [user, setUser] = useState<User>(templateUser);
  //const [requestSent, setRequestSent] = useState(false);

  let UserData = React.useContext(DataContext);
  console.log('UserData:', UserData);

    // useEffect(() => {
    //   if(!requestSent){
    //     const fetchData = async () => {
    //       try {
    //         const response = await fetch('http://localhost:3000/user/session');
    //         if (response.ok) {
    //           const responseBody = await response.text();
    //           console.log('Response body:', response);
  
    //           // Now try to parse it as JSON
    //           const data = JSON.parse(responseBody);
    //           console.log('Fetched data:', data);
    //           console.log('data(user):', UserData);
    //           setRequestSent(true);
    //         } else {
    //           console.error('Fetching user data failed with status:', response.status);
    //           console.log('Response:', response);
    //         }
    //       } catch (error) {
    //         console.log('Fetching user data failed:', error);
    //       }
    //     };
    //     fetchData();
    //   }
    // }, []);

    return (
      <div>
        <Header />
        <p>This is the User component.</p>
        {UserData && <p>Welcome, {UserData.name}!</p>}
      </div>
    );
  };
  
  export default UserComponent;