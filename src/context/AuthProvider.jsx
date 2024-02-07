import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(() => {
        const storedSession = sessionStorage.getItem("sessionAuth");
        if (!storedSession) {
            return null;
        }
        return JSON.parse(storedSession);
    });

    useEffect(() => {
        sessionStorage.setItem('sessionAuth', JSON.stringify(auth));
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            { children }
        </AuthContext.Provider>
    )
}
export default AuthProvider;