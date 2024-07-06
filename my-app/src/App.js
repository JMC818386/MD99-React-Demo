import React, { useEffect, useState } from 'react';
import Header from './Header';
import Content from './Content';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const App = () => {

  return (
    <div className="app-container background-color">
      <Header />
      <Content />
    </div>
  );
};

export default App;
