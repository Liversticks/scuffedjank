import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";

// Get data from API
// Render
function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const result = await fetch("https://fakestoreapi.com/products");
      const jsonRes = await result.json();
      await console.log(jsonRes);
      setData(jsonRes);
    }

    fetchData();
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        {data.map(item => (
          <div key={item.id}>
              <div>{item.title} {item.price}</div>
              <img src={item.image} alt={item.title + "bruh moment"}></img>
              <div>{item.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
