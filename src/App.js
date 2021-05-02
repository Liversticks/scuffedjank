//import logo from './logo.svg';
import logo from "./customlogo.png";
import './App.css';
import React, { useState, useEffect } from "react";
import Uwuifier from "uwuifier";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Spinner } from 'reactstrap';
import getSymbolFromCurrency from 'currency-symbol-map';

const currencies = [
  "USD",
  "GBP",
  "JPY",
  "CHF",
  "CNY",
  "ZAR",
  "MXN"
]

const APIKEY = "b0e918fb6aba705171ea148727f821b9";

// Get data from API
// Render
// Assume all prices come in as CAD
function App() {
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState();
  const [rate, setRate] = useState(1);
  const [currencyReady, setCurrencyReady] = useState(false);
  
  useEffect(() => {
    setCurrency(currencies[Math.floor(Math.random() * currencies.length)]);
  }, [])

  useEffect(() => {
    async function fetchData() {
      //const result = await fetch("https://fakestoreapi.com/products");
      const result = await fetch("http://localhost:8000/results/bruh");
      const jsonRes = await result.json();
      console.log(jsonRes);
      setData(jsonRes);
    }

    fetchData();
    
  }, []);

  useEffect(() => {
    
    async function fetchCurrency() {
      const url = `http://api.exchangeratesapi.io/v1/latest?access_key=${APIKEY}&symbols=CAD,${currency}`;
      const rateObj = await fetch(url);
      const rateRes = await rateObj.json();
      console.log(rateRes)
      setRate((rateRes.rates.hasOwnProperty(currency) ? rateRes.rates[currency] : 1)/rateRes.rates["CAD"]);
      setCurrencyReady(true);      
    }
    
    fetchCurrency();
    
  }, [currency]);

  const uwuifier = new Uwuifier();
  const symbol = getSymbolFromCurrency(currency);

  if (currencyReady) {
    return (
<<<<<<< HEAD
      <div className="rootwrap">
=======
      <div>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          <img src={logo} alt="" className="site-name"/>
        </a>
>>>>>>> master
        <div className="of-container">
          {data.map(item => (
            <div key={item.id}>
              <Card className="box">
                <CardBody>
                  <CardTitle tag="h2">{uwuifier.uwuifySentence(item.title)}</CardTitle>
                  <CardSubtitle tag="h3" className="text-muted">{symbol} {Number.parseFloat(item.price * rate).toFixed(2)}</CardSubtitle>
                </CardBody>
                <CardImg 
                  src={item.image}
                  alt={item.title + "bruh moment"}
                  top width="100%"  
                />
                { /*
                <CardBody>
                  <CardText>{uwuifier.uwuifySentence(item.description)}</CardText>
                </CardBody>
                */ }
              </Card>             
            </div>
          ))}
        </div>
      </div>
    );
  }
  else {
    return (
      <div>
        <h1>Loading...</h1>
        
      </div>
    );
  }
  
}

export default App;
