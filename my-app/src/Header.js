import React from 'react';
import './App.css';

const Header = () => {
  return (
    <div className="header">
      <h1>Student Progress Report</h1>
      <div className="report-date">
        <span>09/01/2024 - 12/17/2024</span>
        <span>Fall Semester 2024</span>
      </div>
    </div>
  );
};

export default Header;
