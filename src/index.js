import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthenticationCore from "./Components/Authentication/Core/AuthenticationCore";
import {ConversationContextProvider} from "./Context/ConversationContext";
import {OpenContextProvider} from "./Context/OpenContext";
import {ResourceSharingContextProvider} from "./Context/ResourceSharingContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <OpenContextProvider>
        <ConversationContextProvider>
            <ResourceSharingContextProvider>
                <React.StrictMode>
                    <BrowserRouter>
                        <Routes>
                            <Route index element={<App/>}/>
                            <Route path={'/authentication'} element={<AuthenticationCore/>}/>
                        </Routes>
                        }
                    </BrowserRouter>
                </React.StrictMode>
            </ResourceSharingContextProvider>
        </ConversationContextProvider>
    </OpenContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
