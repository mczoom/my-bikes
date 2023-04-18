import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import App from './Components/App/App';
import './Components/Calendar.css'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
    <React.StrictMode>
      <App />
    </React.StrictMode>
  
);
