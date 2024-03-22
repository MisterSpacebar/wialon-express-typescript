import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoggedOut: React.FC = () => {
    const navigate = useNavigate();

    try {
        fetch('/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }

    const handleLogoutSuccess = (event: React.MouseEvent<HTMLButtonElement>) => {
        navigate('/');
    };

    return (
        <div>
            <h1>Logged Out</h1>
            <button onClick={handleLogoutSuccess}>Go to Main Page</button>
        </div>
    );
};

export default LoggedOut;