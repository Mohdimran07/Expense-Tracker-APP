import React from "react";

import axios from "axios";
import { useState, useEffect } from "react";
import "./ExpenseList.css";
import { expenseActions } from "../../redux-store/expense";
import { useDispatch } from "react-redux";


const ExpenseList = ({ editHandler }) => {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 const dispatch = useDispatch();
  let String = localStorage.getItem("Id");
  let email = String.replace(/[&,+()$~%@.'":*?<>{}]/g, "");
  let url = `https://react-expense-tracker-b8dfe-default-rtdb.firebaseio.com/ExpenseData${email}.json`;

  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      console.log(response.data);
      setExpenses(response.data);
      dispatch(expenseActions.expenseData(response.data))
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteHandler = (id, e) => {
    e.preventDefault();
    console.log(id);
    let String = localStorage.getItem("Id");

    let email = String.replace(/[&,+()$~%@.'":*?<>{}]/g, "");
    console.log(email);
    axios
      .delete(
        `https://react-expense-tracker-b8dfe-default-rtdb.firebaseio.com/ExpenseData${email}/${id}.json`
      )
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  return (
    <div className="users">
      <ul>
        {!isLoading &&
          expenses &&
          Object.keys(expenses).map((key) => (
            <li key={key}>
              {expenses[key]["Money"]} {"->"} {expenses[key].Description}
              {" -> "}
              {expenses[key].Category}{" "}
              <button onClick={(e) => editHandler(key, expenses[key], e)}>
                Edit
              </button>{" "}
              <button onClick={(e) => deleteHandler(key, e)}>Delete</button>
            </li>
          ))}
        {isLoading && <p>Loading...</p>}
      </ul>
    </div>
  );
};

export default ExpenseList;
