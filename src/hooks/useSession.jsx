import { useState, useEffect } from 'react';

const useSession = (key, initialValue) => {
    const [sessionAuth, setSessionAuth] = useState(() => {
        const storedValue = sessionStorage.getItem(key);
        if (!storedValue) {
            return initialValue;
        }
            return JSON.parse(storedValue);
    });
    
    useEffect(() => {
        if (sessionAuth === null) {
            sessionStorage.removeItem(key);
        } else {
            sessionStorage.setItem(key, JSON.stringify(sessionAuth));
        }
    }, [key, sessionAuth]);
    
    return [sessionAuth, setSessionAuth];

}

export default useSession;