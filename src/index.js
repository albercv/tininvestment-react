import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CookieProvider from './provider/CookieProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

root.render(
    <Provider store={store}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <CookieProvider>
                <App />
            </CookieProvider>
        </GoogleOAuthProvider>
    </Provider>

);

