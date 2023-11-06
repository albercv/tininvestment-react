import React, { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const CookieContext = createContext();

export const useCookies = () => {
    return useContext(CookieContext);
};

const CookieProvider = ({ children }) => {
    // Estado para saber si el usuario está autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Suponiendo que guardas un token en la cookie 'token' cuando el usuario se autentica
    const checkAuthentication = () => {
        const token = getCookie('token');
        setIsAuthenticated(!!token);
    };

    const setCookie = (name, value) => {
        Cookies.set(name, value, {
            expires: 10 / (24 * 60),
            secure: false, // Cambiar esto en producción
            // httpOnly: true,
            // domain: 'tu-dominio.com', // Cambiar esto en producción
        });
        // Cada vez que estableces una cookie, comprueba si es la de autenticación
        if (name === 'token') {
            checkAuthentication();
        }
    };

    const getCookie = (name) => {
        return Cookies.get(name);
    };

    const removeCookie = (name) => {
        Cookies.remove(name);
        // Si eliminas la cookie de autenticación, actualiza el estado
        if (name === 'token') {
            setIsAuthenticated(false);
        }
    };

    // Inicializar el estado de autenticación en el montaje del componente
    React.useEffect(() => {
        checkAuthentication();
    }, []);

    const value = {
        setCookie,
        getCookie,
        removeCookie,
        isAuthenticated, // Estado de autenticación
        setIsAuthenticated, // Función para actualizar el estado de autenticación
    };

    return (
        <CookieContext.Provider value={value}>
            {children}
        </CookieContext.Provider>
    );
};

export default CookieProvider;
