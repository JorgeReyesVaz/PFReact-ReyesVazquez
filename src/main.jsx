import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import {initializeApp} from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDG6NuK4QpvyzdmkH7GG9m4RdL4bRk4RqI",
  authDomain: "panelstore-proyectofinal.firebaseapp.com",
  projectId: "panelstore-proyectofinal",
  storageBucket: "panelstore-proyectofinal.appspot.com",
  messagingSenderId: "881601864590",
  appId: "1:881601864590:web:097c36ce5fe901eae4fadf"
};

const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
