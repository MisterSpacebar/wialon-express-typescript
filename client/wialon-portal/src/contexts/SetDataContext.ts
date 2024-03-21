import { createContext, Dispatch, SetStateAction } from 'react';

type User = {
    session_id: string;
    name: string;
    user_id: number;
};

export const SetDataContext = createContext<Dispatch<SetStateAction<User>> | undefined>(undefined);