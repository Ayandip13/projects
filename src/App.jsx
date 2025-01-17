import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios"; // Importing axios for API requests

function App() {
  // State to store the exchange rates fetched from the API
  const [exchangeRate, setExchangeRate] = useState({});

  // State for user input: amount to be converted
  const [amount, setAmount] = useState(1);

  // State for selected base currency
  const [fromCurrency, setFromCurrency] = useState("USD");

  // State for selected target currency
  const [toCurrency, setToCurrency] = useState("INR");

  // State for storing the final converted amount
  const [convertedAmount, setConverterdAmount] = useState(null);

  // Function to handle input changes (if-else logic instead of switch-case)
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      setAmount(value); // Update the amount entered by the user
    } else if (name === "fromCurrency") {
      setFromCurrency(value); // Update the base currency
    } else if (name === "toCurrency") {
      setToCurrency(value); // Update the target currency
    }
  };


  

  // Fetch exchange rates whenever the base currency changes
  useEffect(() => {
    const apiUrl = `https://api.exchangerate.api.com/v4/latest/${fromCurrency}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setExchangeRate(response.data.rates); // Update exchange rates in state
      })
      .catch((error) => {
        console.error("Error fetching the exchange rates:", error); // Log any errors
      });
  }, [fromCurrency]); // Dependency array ensures this runs only when `fromCurrency` changes




  // Calculate the converted amount whenever the relevant inputs change
  useEffect(() => {
    const conversionRate = exchangeRate[toCurrency];

    // If the conversion rate exists, calculate and update the converted amount
    if (conversionRate) {
      const converted = amount * conversionRate;
      setConverterdAmount(converted.toFixed(2)); // Round to 2 decimal places
    }
  }, [amount, fromCurrency, toCurrency, exchangeRate]); // Runs whenever any of these dependencies change

  return (
    <>
      <div className="card">
        {/* App Logo */}
        <img
          src={"image.png"} // Replace with the path to your logo
          width="50"
          alt="test"
        />
        <h1 className="text-6xl">Currency Converter</h1>

        {/* Main wrapper for input fields */}
        <div className="currency_exchange">
          {/* Input for the amount to be converted */}
          <div className="input_container">
            <label className="input_label">Amount</label>
            <input
              type="number"
              onChange={handleChange}
              name="amount"
              value={amount}
              className="input_field"
            />
          </div>

          {/* Dropdown for selecting the base currency */}
          <div className="input_container">
            <label className="input_label">From Currency</label>
            <select
              value={fromCurrency}
              name="fromCurrency"
              onChange={handleChange}
              className="input_field"
            >
              {Object.keys(exchangeRate).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>

          {/* Dropdown for selecting the target currency */}
          <div className="input_container">
            <label className="input_label">To Currency</label>
            <select
              name="toCurrency"
              onChange={handleChange}
              value={toCurrency}
              className="input_field"
            >
              {Object.keys(exchangeRate).map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Display the converted amount */}
        <div className="output">
          <h2>
            Converted Amount: <p>{convertedAmount}</p>
          </h2>
        </div>
      </div>
    </>
  );
}

export default App;
