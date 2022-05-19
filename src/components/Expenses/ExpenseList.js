import React from "react";
import Card from "../Expenses/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import "./ExpenseList.css";

const ExpenseList = () => {
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

  return (
    <Card className="users">
      <ul>
        {Object.keys(cartItems).map((key) => (
          <li key={cartItems[key].id}>
            {cartItems[key]["Money"]} {"->"} {cartItems[key].Description}
            {" -> "}
            {cartItems[key].Category}{" "}
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default ExpenseList;
