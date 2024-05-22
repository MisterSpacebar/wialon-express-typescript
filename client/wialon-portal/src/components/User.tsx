// User.tsx
import { useEffect, useContext, useState } from 'react';
import { server, DataContext } from '../App.tsx';

// child components
import Header from './Header.tsx';
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
  const [userChange, setUserChange] = useState(false);
  // let logged = false;

    useEffect(() => {
      
        // Fetch user data from the server
        // The user data is stored in the user state
        // The user data is also stored in the data context
        // The user data is used to determine if the user is logged in
        const fetchData = async () => {
          try {
            const response = await fetch(server.port+'/user/session', { credentials: 'include' });
            if (response.ok) {
              const responseBody = await response.text();
              console.log('Response body (String):', responseBody);
              console.log('Response body (JSON):', JSON.parse(responseBody));
              let ResBodyJson = JSON.parse(responseBody);
              // force user template to be updated
              // this is to ensure that the user data is updated
              // WARNING: react state updates are asynchronous
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
      
    }, [user]);

    // Reload the page if the user is logged in
    // This is to ensure that the user data is updated
    // and the user is redirected to the correct page
    // This will cause the page to be stuck in a loop if the user is not logged in
    //
    // Hacky fix to get the user data to update after login
    useEffect(() => {
      if (user.name !== '') {
        window.location.reload();
        console.log('User (State):', user);
        console.log('User (Context):', data);
      }
    }, [userChange]);

    useEffect(() => {
      if(userChange == false) { 
        setUserChange(!userChange);
        // logged = true;  
      }
    }, [user]);


    // If the user is not logged in, display a loading message
    if(!user.name) {
      return <div> <Header /> <p>Loading... please try logging in again or refreshing if login is not successful or is stuck on this screen as you may have been timed out from the Wialon servers.</p> </div>
    }

    return (
      <div>
        <Header />
        <Units />
      </div>
    );
  };
  
  export default UserComponent;