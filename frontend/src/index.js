import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import {store} from './context/auth/store';
import { checkAuth } from './context/auth/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
const token = localStorage.getItem('token');

if (token) {
  console.log(token)
  // Token varsa ve geçerliyse, Redux store'da kullanıcının oturumunu aç
  store.dispatch(checkAuth());
}
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
