import React from 'react';
import './App.css';

const StudentName = ({ name, gpa }) => {
  return (
    <div className="student-name">
      <span>{name}</span>
      <span>{gpa}</span>
    </div>
  );
};

export default StudentName;
