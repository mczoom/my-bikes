import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import App from './Components/App/App';
import './Components/Calendar.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(  
    <React.StrictMode> 
      <BrowserRouter> 
        <AuthProvider>    
          <App /> 
        </AuthProvider>
      </BrowserRouter>       
    </React.StrictMode>  
);
