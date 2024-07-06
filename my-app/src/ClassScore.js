import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Assuming you want to style the component

const ClassScore = () => {
  const [classes, setClasses] = useState([]);
  const [error, setError] = useState(null);

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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="class-score-container">
      {classes.length === 0 ? (
        <div>Loading...</div>
      ) : (
        classes.map((course) => (
          <div key={course.course_name} className="class-score">
            <h3>{course.course_name}</h3>
            <h4>Score</h4>
            {course.images.radial && <img src={course.images.radial.url} alt="Radial Score" />}
            <h4>Class Percentile</h4>
            {course.images.bar && <img src={course.images.bar.url} alt="Bar Percentile" />}
          </div>
        ))
      )}
    </div>
  );
};

export default ClassScore;
