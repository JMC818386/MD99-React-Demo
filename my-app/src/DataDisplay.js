import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DataDisplay = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Fetching Betty's data
                let response = await axios.post('https://8000-jmc818386-md99djangodem-vt7jc03x5sf.ws-us114.gitpod.io/api/get/imageurl/', { user_name: 'Betty' });
                const bettyData = {
                    name: 'Betty',
                    score: response.data.url.value,  // This assumes 'value' contains the score, adjust if needed
                    image: response.data.url.url   // This should be the path to the image
                };

                // Fetching Billy's data
                response = await axios.post('https://8000-jmc818386-md99djangodem-vt7jc03x5sf.ws-us114.gitpod.io/api/get/imageurl/', { user_name: 'Billy' });
                const billyData = {
                    name: 'Billy',
                    score: response.data.url.value,  // This assumes 'value' contains the score, adjust if needed
                    image: response.data.url.url   // This should be the path to the image
                };
                console.log("response:", response)
                setUsers([bettyData, billyData]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            {users.map(user => (
                <div key={user.name}>
                    <h1>{user.name}: {user.score}</h1>
                    <img src={user.image} alt={`${user.name} Score`} style={{ maxWidth: '300px', maxHeight: '300px' }} />
                </div>
            ))}
        </div>
    );
};

export default DataDisplay;
