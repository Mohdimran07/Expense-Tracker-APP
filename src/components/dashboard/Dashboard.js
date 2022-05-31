import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ExpenseList from "../Expenses/ExpenseList";
import "./Dashboard.css";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../redux-store/auth";
import { expenseActions } from "../../redux-store/expense";
import DarkModeToggle from "../DarkMode/DarkModeToggle";

const Dashboard = () => {
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const dispatch = useDispatch();

  const data = useSelector((state) => state.expense.data);
 
  let expenseData = Object.keys(data).map((expData) => data[expData]);


  const logOutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("Id");
  };
  const editHandler = (expense, key) => {
    setId(expense);
    setMoney(key.Money);
    setCategory(key.Category);
    setDescription(key.Description);
  };

  const updateHandler = (id, e) => {
    e.preventDefault();
   
    const string = localStorage.getItem("Id");
    const email = string.replace(/[&,+()$~%@.'":*?<>{}]/g, "");
    axios
      .put(
        `https://react-expense-tracker-b8dfe-default-rtdb.firebaseio.com/ExpenseData${email}/${id}.json`,
        {
          Money: money,
          Description: description,
          Category: category,
        }
      )
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  const sendDataHandler = (e) => {
    e.preventDefault();

    const string = localStorage.getItem("Id");
    const email = string.replace(/[&,+()$~%@.'":*?<>{}]/g, "");

    axios
      .post(
        `https://react-expense-tracker-b8dfe-default-rtdb.firebaseio.com/ExpenseData${email}.json`,
        {
          Money: money,
          Description: description,
          Category: category,
        }
      )
      .then((res) => {
        console.log(res);
        dispatch(expenseActions.addExpense(res));
      })
      .catch((err) => console.log(err));
  };

  const makeCSV = (data) => {
    return data.map((e) => JSON.stringify(e));
  };


  const downloadFileHandler = (e) => {
    e.preventDefault();
    let blob = new Blob([makeCSV(expenseData)]);
    let file = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.download = "mydata.text";
    a.href = file;
    a.click();
  };

  return (
    <>
      <div className="container">
        <div>Expenser Tracker</div>
        <div className="container__right">
          <Typography>
            Complete your <Link to="/profile">Profile</Link>
          </Typography>
        </div>

        <div className="buttons">
          <div>
            <Button onClick={logOutHandler}>Log out</Button>
          </div>
        </div>
      </div>
      <div>
        <DarkModeToggle />
      </div>
      <div>
        <div className="input">
          <div className="ExpContainer">
            <div>
              <h1>Add Expenses</h1>
            </div>
          </div>
          <form>
            <label>Money:</label>
            <input
              type="number"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
              required
            ></input>
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></input>
            <label>Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />

            <div className="actions">
              <button type="submit" onClick={sendDataHandler}>
                submit
              </button>
              <button type="button" onClick={(e) => updateHandler(id, e)}>
                update
              </button>
            </div>
            <div className="actions">
            
              <button onClick={downloadFileHandler}>Download file</button>
            </div>
          </form>
        </div>

        <ExpenseList editHandler={editHandler} />
      </div>
    </>
  );
};

export default Dashboard;
