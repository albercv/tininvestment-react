import React, { createContext, useContext } from 'react';
import Cookies from 'js-cookie';

// Crear un Context para las cookies
const CookieContext = createContext();

export const useCookies = () => {
    return useContext(CookieContext);
};

const CookieProvider = ({ children }) => {
    const setCookie = (name, value) => {
        Cookies.set(name, value, {
            expires: 10 / (24 * 60),
            secure: false, // TODO change this on production
            // httpOnly: true,
            // domain: 'localhost:3000', //TODO change this on production
        });
    };

    const getCookie = (name) => {
        return Cookies.get(name);
    };

    const removeCookie = (name) => {
        Cookies.remove(name);
    };

    const value = {
        setCookie,
        getCookie,
        removeCookie,
    };

    return (
        <CookieContext.Provider value={value}>
            {children}
        </CookieContext.Provider>
    );
};

export default CookieProvider;