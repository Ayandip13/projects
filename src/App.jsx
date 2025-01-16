import { useState } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "amount":
        setAmount(value);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div className="card">
        <img
          src={
            "data:image/png;base64,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"
          }
          width="50"
          alt="test"
        />
        <h1 className="text-6xl">Currency Converter</h1>

        {/*Wrapper*/}
        <div className="currency_exchange">
          <div className="input_container">
            <label className="input_lable">Amount</label>
            <input
              type="number"
              onChange={handleChange}
              name="amount"
              value={amount}
              className="input_field"
            />
          </div>

          <div className="input_container">
            <label className="input_lable">To Currency</label>
            <select name="cars" id="cars" className="input_field">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>{" "}
          </div>

          <div className="input_container">
            <label className="input_lable">To Currency</label>
            <select name="cars" id="cars" className="input_field">
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>{" "}
          </div>
        </div>

        <div className="output">
          <h2>Converted Amount</h2>
        </div>
      </div>
    </>
  );
}

export default App;
