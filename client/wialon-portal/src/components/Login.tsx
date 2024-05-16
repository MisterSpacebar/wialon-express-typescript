
import { useState, useEffect, useContext } from 'react';
//import DataContext  from './contexts/DataContext';
import { server, DataContext } from '../App.tsx';
import { Card } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

const Login = () => {
    console.log('login component mounted');
    const [loginStatus, setLoginStatus] = useState('');
    const [requestSent, setRequestSent] = useState(false);
    // const newData = React.useContext(SetDataContext);
    const { data, setData } = useContext(DataContext);

    useEffect(() => {
        // Check if the request has been sent
        if(!requestSent) {
            const url = window.location.href;
            const params = new URLSearchParams(url);
            const accessToken = params.get('access_token');
            
            // Check if the access token is present
            // If the access token is present, send it to the server
            // If the access token is not present, display an error message
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

                    // Check if the user data is in the expected format
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

    // Send the user data to the parent window
    // and close the popup window
    useEffect(() => {
        console.log('Data (stored):', data);
        window.opener.postMessage('login-success', '*');
        window.opener.postMessage(JSON.stringify(data) , '*');
        // Close the window after 3 seconds
        // Seems to get stuck at 2 seconds
        setTimeout(() => {
            window.close();
        }, 3000);
    }, [data]);

    // Display a message to the user
    // based on the login status
    // and the request status
    // This will be displayed while the request is being processed
    let message;
    if (loginStatus === 'success') {
    message = <div>Handshake Achieved! You should be redirected in a few seconds.</div>;
    } else if (loginStatus === 'failure') {
    message = <div>Login failed!</div>;
    }

    return (

        <div className="jumbotron jumbotron-fluid main-jumbo">
            <Card className='main-page title-card band-card'>
                <div>
                    {message}
                    <br></br>
                </div>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Card>
        </div>
    );
}

export default Login;