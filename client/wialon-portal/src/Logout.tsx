import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoggedOut: React.FC = () => {
    const navigate = useNavigate();

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