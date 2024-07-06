import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Assuming you want to style the component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Content = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const students = [
    { id: 1, name: 'Ethan Martin', gpa: 3.5 },
    { id: 2, name: 'Amelia Harris', gpa: 3.0 },
    { id: 3, name: 'Mason Lee', gpa: 3.0 },
    { id: 4, name: 'Charlotte Jackson', gpa: 3.0 },
    { id: 5, name: 'Lucas Moore', gpa: 3.0 },
    { id: 6, name: 'Mia Thomas', gpa: 3.0 },
    { id: 7, name: 'Benjamin Taylor', gpa: 3.0 },
    { id: 8, name: 'Isabella Anderson', gpa: 3.0 },
    { id: 9, name: 'James Wilson', gpa: 3.0 },
    { id: 10, name: 'Sophia Rodriguez', gpa: 3.0 },
    { id: 11, name: 'William Garcia', gpa: 3.0 },
    { id: 12, name: 'Ava Martinez', gpa: 3.0 },
    { id: 13, name: 'Liam Davis', gpa: 3.0 },
    { id: 14, name: 'Olivia Brown', gpa: 3.0 }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.PUBLIC_URL}/API.json`);
        console.log('API response:', response.data);
        const data = response.data.image_data;
        const groupedData = groupByCourse(data);
        setClasses(groupedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  const groupByCourse = (data) => {
    const grouped = data.reduce((acc, item) => {
      const course = acc[item.course_name] || { course_name: item.course_name, images: {} };
      if (item.url.includes('radial-simple')) {
        course.images.radial = item;
      } else if (item.url.includes('bar-simple')) {
        course.images.bar = item;
      }
      acc[item.course_name] = course;
      return acc;
    }, {});
    return Object.values(grouped);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="content d-flex flex-row">
      <div className="left-panel">
        {students.map(student => (
          <div key={student.id} className="student-name-container px-3">
            <button onClick={() => handleStudentClick(student)} className="student-name button">
              {student.name}
            </button>
          </div>
        ))}
      </div>

      <div className="right-panel d-flex">
        {selectedStudent ? (
          <div className=" d-flex flex-row">
            <h1 className="title">{selectedStudent.name}'s Scores</h1>
            {classes.length === 0 ? (
              <div>Loading...</div>
            ) : (
              classes.map((course) => (
                <div key={course.course_name} className="class-score class-score-container">
                  <h3 className="header">{course.course_name}</h3>
                  <h4 className="sub-header">Score</h4>
                  {course.images.radial && <img src={course.images.radial.url} alt="Radial Score" />}
                  <h4 className="body">Class Percentile</h4>
                  {course.images.bar && <img src={course.images.bar.url} alt="Bar Percentile" />}
                </div>
              ))
            )}
          </div>
        ) : (
          <div>Select a student to view their scores.</div>
        )}
      </div>
    </div>
  );
};

export default Content;
