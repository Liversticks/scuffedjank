import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import Uwuifier from "uwuifier";

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
  const uwuifier = new Uwuifier();

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
          <div key={item.id} className="box">
              <div className="itemHeader">
                <div>{item.title}</div>
                <div>{item.price}</div>
              </div>
              <div className="description">
                {uwuifier.uwuifySentence(item.description)}
              </div>
              <img 
                src={item.image}
                alt={item.title + "bruh moment"}
                className="productImg"  
              ></img>
              
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
