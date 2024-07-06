import React, { useEffect } from 'react';

const ApiComponent = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://3000-https://lakeshoreti-md99nodedem-e0x1u9h4lsc.ws-us115.gitpod.io/');
        if (!response.ok) {
          throw new Error('Network response was not ok' + response.statusText);
        }
        const data = await response.json();
        console.log('Response:', data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>API Data Fetching</h1>
      <p>Check the console for the API response.</p>
    </div>
  );
};

export default ApiComponent;
