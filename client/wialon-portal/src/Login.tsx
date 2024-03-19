import React, { useState, useEffect } from 'react';

const Login = () => {
    const [loginStatus, setLoginStatus] = useState('');

    useEffect(() => {
        const url = window.location.href;
        const params = new URLSearchParams(url);
        const accessToken = params.get('access_token');
        
        if (accessToken) {
            setLoginStatus('success');
            console.log(accessToken);
            // Send the token to your server
            fetch('http://localhost:5173/auth/token-login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
                },
            })
            .then(response => response.json())
            .then(data => {
                // Handle the response from your server
                if (data.success) {
                    // If the login was successful, close the window after 5 seconds
                    setTimeout(() => {
                    window.close();
                    }, 5000);
                }
            });
        } else {
            setLoginStatus('failure');
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