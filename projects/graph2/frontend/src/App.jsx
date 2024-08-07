import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState(null);
  const [name, setName] = useState('');

  const fetchData = () => {
    fetch('http://localhost:5000/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button onClick={fetchData}>Fetch Data</button>
      {data && (
        <div>
          <h1>{data.name}</h1>
          <p>Value: {data.value}</p>
        </div>
      )}
    </div>
  );
};

export default App
