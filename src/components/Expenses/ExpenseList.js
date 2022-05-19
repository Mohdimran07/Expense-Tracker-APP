import React from "react";
import Card from "../Expenses/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import "./ExpenseList.css";

const ExpenseList = ({ editHandler}) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    let String = localStorage.getItem("UserId");

    let email = String.replace(/[&,+()$~%@.'":*?<>{}]/g, "");

    axios
      .get(
        `https://react-expense-tracker-b8dfe-default-rtdb.firebaseio.com/ExpenseData${email}.json`
      )
      .then((response) => {
        console.log(response.data);
        setCartItems(response.data);
      });
  }, []);

  const deleteHandler = (props, e) => {
    e.preventDefault();
    console.log(props);
    let String = localStorage.getItem("UserId");

    let email = String.replace(/[&,+()$~%@.'":*?<>{}]/g, "");
    console.log(email)
    axios.delete(
      `https://react-expense-tracker-b8dfe-default-rtdb.firebaseio.com/ExpenseData${email}/${props}.json`
    ).then((res) => console.log(res)).catch((e) => console.log(e))
  };



  return (
    <Card className="users">
      <ul>
        {Object.keys(cartItems).map((key) => (
          //  console.log(key)
          <li key={cartItems[key].id}>
            {cartItems[key]["Money"]} {"->"} {cartItems[key].Description}
            {" -> "}
            {cartItems[key].Category} <button onClick={(e) => editHandler(key, cartItems[key], e)}>Edit</button>{" "}
            <button onClick={(e) => deleteHandler(key, e)}>Delete</button>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ExpenseList;
