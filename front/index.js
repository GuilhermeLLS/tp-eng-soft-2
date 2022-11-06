import React from 'react';
import axios from 'axios';
import { SWRConfig } from 'swr';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './contexts/AuthContext';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
axios.defaults.baseURL = BASE_URL;

ReactDOM.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: (url) => axios.get(url).then((res) => res.data.content),
      }}
    >
      <AuthProvider>
        <App />
      </AuthProvider>
    </SWRConfig>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
