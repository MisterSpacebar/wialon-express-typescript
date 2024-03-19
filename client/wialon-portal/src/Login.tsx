import React, { useState, useEffect } from 'react';

const Login = () => {
    const [loginStatus, setLoginStatus] = useState('');

    useEffect(() => {
        const url = window.location.href;
        const params = new URLSearchParams(url);
        const accessToken = params.get('access_token');
        if (accessToken) {
          setLoginStatus('success');
        } else {
          setLoginStatus('failure');
        }
      }, []);

      return (
        <div>
          {loginStatus === 'success' ? (
            <div>Login successful! You will be redirected in 5 seconds.</div>
          ) : loginStatus === 'failure' ? (
            <div>Login failed!</div>
          ) : null}
        </div>
      );
    };
    
export default Login;