//import logo from './logo.svg';
import logo from "./customlogo.png";
import './App.css';
import React, { useState, useEffect } from "react";
import Uwuifier from "uwuifier";
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, Spinner } from 'reactstrap';
import getSymbolFromCurrency from 'currency-symbol-map';
import { useForm } from 'react-hook-form';
import Search from "./search.js"

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
  const [query, setQuery] = useState("fan");

  const { register, handleSubmit, watch, formState: {errors}} = useForm();
  const onSubmit = async data => {
    console.log(data.exampleRequired);
    setQuery(data.exampleRequired);
    const result = await fetch(`http://localhost:8000/results/${data.exampleRequired}`);
    const jsonRes = await result.json();
    setData(jsonRes.data);
  };
  
  useEffect(() => {
    setCurrency(currencies[Math.floor(Math.random() * currencies.length)]);
  }, [])

  useEffect(() => {
    async function fetchData() {
      //const result = await fetch("https://fakestoreapi.com/products");
      const result = await fetch("http://localhost:8000/results/fan");
      const jsonRes = await result.json();
      console.log(jsonRes);
      console.log(jsonRes['data']);
      setData(jsonRes['data']);
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
      <div className="rootwrap">        
        <img src={logo} alt="title" className="logo"/>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("exampleRequired", {required: true})} />
            
            <input type="submit"/>
        </form>
        <div className="of-container">
          {data.length == 0 ? uwuifier.uwuifySentence(`Sorry! We couldn't find anything matching ${query}.`) : 
          data.map(item => (
            <div>
              <Card className="box">
                <CardBody>
                  <CardTitle tag="h2">{uwuifier.uwuifySentence(item.name)}</CardTitle>
                  <CardSubtitle tag="h3" className="text-muted">{symbol} {Number.parseFloat(item.price * rate).toFixed(2)}</CardSubtitle>
                </CardBody>
                <CardImg 
                  src={item.image}
                  alt={item.name + "bruh moment"}
                  top width="100%"  
                />
                { /*
                <CardBody>
                  <CardText>{uwuifier.uwuifySentence(item.description)}</CardText>
                </CardBody>
                */ }
              </Card>             
            </div>
          ))
          
          }

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
