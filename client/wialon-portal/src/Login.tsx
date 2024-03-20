import { access } from 'fs';
import React, { useState, useEffect } from 'react';

const Login = () => {
    const [loginStatus, setLoginStatus] = useState('');
    const [requestSent, setRequestSent] = useState(false);

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
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({ accessToken })
                })
                .then(response => response.text())
                .then(data => {
                    // Handle the response from your server
                    console.log(data);
                        setRequestSent(true);
                        window.opener.postMessage('login-success', '*');
                        // If the login was successful, close the window after 5 seconds
                        setTimeout(() => {
                            window.close();
                        }, 5000);
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
    <div>
        {message}
    </div>
    );
}

export default Login;