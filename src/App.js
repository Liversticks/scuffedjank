import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import Uwuifier from "uwuifier";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import getSymbolFromCurrency from 'currency-symbol-map';

const currencies = [
  "USD",
  "EUR",
  "GBP",
  "JPY"
]

const APIKEY = "b0e918fb6aba705171ea148727f821b9";

// Get data from API
// Render
// Assume all prices come in as CAD
function App() {
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState("");
  const [rate, setRate] = useState(1);
  
  useEffect(() => {
    async function fetchData() {
      const result = await fetch("https://fakestoreapi.com/products");
      const jsonRes = await result.json();
      console.log(jsonRes);
      setData(jsonRes);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchCurrency() {
      setCurrency(currencies[Math.floor(Math.random() * currencies.length)]);
      const url = `http://api.exchangeratesapi.io/v1/latest?access_key=${APIKEY}&symbols=CAD,${currency}`;
      const rateObj = await fetch(url);
      const rateRes = await rateObj.json();
      console.log(rateRes)
      setRate(rateRes.rates[currency]/rateRes.rates["CAD"]);
      
    }
    fetchCurrency();
    
  }, [currency]);


  const uwuifier = new Uwuifier();
  const symbol = getSymbolFromCurrency(currency);


  return (
    <div>
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

export default App;
