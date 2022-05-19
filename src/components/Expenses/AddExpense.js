import React from "react";
import { useRef } from "react";
import "./AddExpense.css";
import Card from "./Card";

const AddExpense = () => {
  const MoneyInputRef = useRef();
  const DesInputRef = useRef();
  const CatInputRef = useRef();

  return (
    <Card className="input">
      <div className="ExpContainer">
        <div>
          <h1>Add Expenses</h1>
        </div>
      </div>
      <form>
        <label>Money:</label>
        <input type="number" ref={MoneyInputRef} required></input>
        <label>Description:</label>
        <input type="text" ref={DesInputRef} required></input>
        <label>Category:</label>
        <input type="text" ref={CatInputRef} required />

        <div className="actions">
          <button>submit</button>
        </div>
      </form>
    </Card>
  );
};

export default AddExpense;
