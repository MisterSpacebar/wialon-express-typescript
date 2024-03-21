import { access } from 'fs';
import React, { useState, useEffect } from 'react';
import DataContext  from './contexts/DataContext';
import { SetDataContext } from './contexts/SetDataContext';

type User = {
    session_id: string;
    name: string;
    user_id: number;
};

let defaultUser: User = {
    session_id: '',
    name: '',
    user_id: 0
};

const Login = () => {
    
    const [loginStatus, setLoginStatus] = useState('');
    const [requestSent, setRequestSent] = useState(false);
    const [data, setData] = useState<User>(defaultUser);

    let StateData = React.useContext(DataContext);
    const newData = React.useContext(SetDataContext);
    console.log('StateData:', StateData);

    useEffect(() => {
        if(!requestSent) {
            const url = window.location.href;
            const params = new URLSearchParams(url);
            const accessToken = params.get('access_token');
            
            if (accessToken) {
                setLoginStatus('success');
                console.log(accessToken);
                // Send the token to your server
                fetch('http://localhost:3000/auth/token-login', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({ accessToken })
                })
                .then(response => response.text())
                .then(data => {
                    // Handle the response from your server
                    console.log("server response: ",data);
                    let user = JSON.parse(data);
                    console.log('User data:', user);
                    if (user && 'session_id' in user && 'name' in user && 'user_id' in user) {
                        let loggedUser = {
                            session_id: user.session_id,
                            name: user.name,
                            user_id: user.user_id
                        }
                        setData(loggedUser);
                        newData?.(loggedUser);
                    } else {
                        console.error('Unexpected user data:', user);
                    }
                    setRequestSent(true);
                    window.opener.postMessage('login-success', '*');
                    window.opener.postMessage(JSON.stringify(user) , '*');
                    // If the login was successful, close the window after 5 seconds
                    setTimeout(() => {
                        window.close();
                    }, 23000);
                });
            } else {
                setLoginStatus('failure');
            }

        }
    }, []);

    let message;
    if (loginStatus === 'success') {
    message = <div>Login successful! You will be redirected in 5 seconds.</div>;
    } else if (loginStatus === 'failure') {
    message = <div>Login failed!</div>;
    }


    return (
        <DataContext.Provider value={data}>
            <SetDataContext.Provider value={setData}>
                <div>
                    {message}
                </div>
            </SetDataContext.Provider>
        </DataContext.Provider>
    );
}

export default Login;