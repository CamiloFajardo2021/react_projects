import React, { useState, useEffect } from 'react';
//import './App.css'

const Data = ({data,setData}) => {
  //const [data, setData] = useState(null);
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
      .then(data => {
        setData(data)
        console.log(data)
      }
    )
      //.then(newData => setData({ 'name': name, 'value': newData.value }))
      //.then(data => setData(data)) > given 
      .catch(error => console.error('Error:', error));
  };
  return (
    <div style={{width:'auto',backgroundColor:'lightgray',paddingRight:'5px'}}>
      <h2>Red</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <button style = {{display:'flex'}} onClick={fetchData}>Fetch Data</button>
      {data && (
        <div>
          
          <h3>{name}</h3>
        </div>
      )}
    </div>
  );
};

export default Data
