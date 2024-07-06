import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Content = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);
  const [sp1, setSp1] = useState("");
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
  
  const newFetch = () => {
    const post_data = { student_id: 2 }; 
    console.log("Starting API call to fetch student data.");
    // axios.post('https://3000-lakeshoreti-md99nodedem-e0x1u9h4lsc.ws-us115.gitpod.io/api/student/imageurl', post_data, { timeout: 5000 })
    axios.get('https://google.com')
      .then(response => {
        console.log('API response:', response.data);
        // const data = response.data.image_data;
        // const groupedData = groupByCourse(data);
        // setClasses(groupedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);

        // Checking if the error has a response from the server
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Error request:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.PUBLIC_URL}/API.json`);
        // console.log('Fetched initial data:', response.data);
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

  const handleStudentClick = (event, student) => {
    event.preventDefault();
    console.log("Made it to handleStudentClick", student.id);
    setSelectedStudent(student);
    newFetch();
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="d-flex">
      <div className="d-flex flex-column p-3" style={{ width: '25%' }}>
        {students.map(student => (
          <div key={student.id} className="student-name-container px-3 mb-2">
            <button onClick={(e) => handleStudentClick(e, student)} className="student-name button w-100">
              {student.name}
            </button>
          </div>
        ))}
      </div>

      <div className="flex-grow-1 p-3">
        {selectedStudent ? (
          <div>
            <h2>{selectedStudent.name}</h2>
            {classes.length === 0 ? (
              <div>Loading...</div>
            ) : (
              <div className="d-flex flex-wrap">
                {classes.map((course) => (
                  <div key={course.course_name} className="d-flex flex-column align-items-center p-2 class-score class-score-container m-3" style={{ flex: '1 0 33%' }}>
                    <h3 className="header">{course.course_name}</h3>
                    <h4 className="sub-header">Score</h4>
                    <div className="radial-score mb-3">
                      {course.images.radial && <img src={sp1} alt="Radial Score" />}
                    </div>
                    <div className="bar-score">
                    <h4 className="body">Class Percentile</h4>
                      {course.images.bar && <img src={course.images.bar.url} className="bar-score" alt="Bar Percentile" />}
                    </div>
                  </div>
                ))}
              </div>
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
