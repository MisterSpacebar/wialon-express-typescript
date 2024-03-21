// contexts/DataContext.js
import React from 'react';

type User = {
    session_id: string;
    name: string;
    user_id: number;
};

const defaultUser: User = {
    session_id: '',
    name: '',
    user_id: 0
};


const DataContext = React.createContext<User | null>(defaultUser);

export default DataContext;