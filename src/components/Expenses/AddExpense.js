import axios from "axios";
import React from "react";
import { useRef } from "react";
import "./AddExpense.css";
import Card from "./Card";

const AddExpense = (props) => {
  const MoneyInputRef = useRef();
  const DesInputRef = useRef();
  const CatInputRef = useRef();
  console.log(props)

  const sendDataHandler = (e) => {
    e.preventDefault();
    const Money = MoneyInputRef.current.value;
    const Description = DesInputRef.current.value;
    const Category = CatInputRef.current.value;

    const string = localStorage.getItem("UserId");
    const email = string.replace(/[&,+()$~%@.'":*?<>{}]/g, "");

    axios
      .post(
        `https://react-expense-tracker-b8dfe-default-rtdb.firebaseio.com/ExpenseData${email}.json`,
        {
          Money: Money,
          Description: Description,
          Category: Category,
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    

      MoneyInputRef.current.value = "";
      DesInputRef.current.value = "";
      CatInputRef.current.value = "";
  };

//   const editHandler = (props, e) => {
//      e.preventDefault();
//      console.log(props)
//   }

  return (
    <Card className="input">
      <div className="ExpContainer">
        <div>
          <h1>Add Expenses</h1>
        </div>
      </div>
      <form onSubmit={sendDataHandler}>
        <label>Money:</label>
        <input type="number" ref={MoneyInputRef} required></input>
        <label>Description:</label>
        <input type="text" ref={DesInputRef} required></input>
        <label>Category:</label>
        <input type="text" ref={CatInputRef} required />

        <div className="actions">
          <button type="submit">submit</button>
        </div>
      </form>
    </Card>
  );
};

export default AddExpense;
