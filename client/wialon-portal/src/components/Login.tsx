import { access } from 'fs';
import React, { useState, useEffect, useContext } from 'react';
//import DataContext  from './contexts/DataContext';
import { server, DataContext } from '../App.tsx';
import { Card } from 'react-bootstrap';

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

let fetchCount: number = 1;

const Login = () => {
    console.log('login component mounted');
    const [loginStatus, setLoginStatus] = useState('');
    const [requestSent, setRequestSent] = useState(false);
    // const newData = React.useContext(SetDataContext);
    const { data, setData} = useContext(DataContext);

    useEffect(() => {
        if(!requestSent) {
            const url = window.location.href;
            const params = new URLSearchParams(url);
            const accessToken = params.get('access_token');
            
            if (accessToken) {
                setLoginStatus('success');
                console.log(accessToken);
                // Send the token to your server
                fetch(server.port+'/auth/token-login', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({ accessToken })
                })
                .then(response => response.text())
                .then(responseData => {
                    // Handle the response from your server
                    console.log("server response: ",responseData);
                    let user = JSON.parse(responseData);
                    console.log('User data:', user);
                    console.log('fetchCount:', fetchCount);
                    fetchCount++;
                    if (user && 'session_id' in user && 'name' in user && 'user_id' in user) {
                        if (setData) {
                            setData(user);
                        }
                    } else {
                        console.error('Unexpected user data:', user);
                    }
                    setRequestSent(true);
                    // If the login was successful, close the window after 5 seconds
                });
            } else {
                setLoginStatus('failure');
            }

        }
    }, []);

    useEffect(() => {
        console.log('Data (stored):', data);
        window.opener.postMessage('login-success', '*');
        window.opener.postMessage(JSON.stringify(data) , '*');
        setTimeout(() => {
            window.close();
        }, 3000);
    }, [data]);

    let message;
    if (loginStatus === 'success') {
    message = <div>Login successful! You will be redirected in 5 seconds.</div>;
    } else if (loginStatus === 'failure') {
    message = <div>Login failed!</div>;
    }

    return (

        <div className="jumbotron jumbotron-fluid main-jumbo">
            <Card className='main-page title-card band-card'>
                <div>
                    {message}
                </div>
            </Card>
        </div>
    );
}

export default Login;