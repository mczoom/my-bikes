import React from 'react';
import {Routes, Route} from 'react-router-dom'
import Header from '../Header/Header';



function App() {
  return (
    <div className="page">
      <Header />
      {/* <Routes>
        <Route path='/' element={<Header />} />
      </Routes> */}
    </div>
  );
}

export default App;
