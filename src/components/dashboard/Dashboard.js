import { Button, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ExpenseContext from "../../context-store/Expense-context";
import ExpenseList from "../Expenses/ExpenseList";
import "./Dashboard.css";
import Card from "../Expenses/Card";
import axios from "axios";

const Dashboard = () => {
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const expCtx = useContext(ExpenseContext);
  const logOutHandler = () => {
    expCtx.logout();
  };
  const editHandler = (props, key) => {
    console.log(props);
    console.log(key.Money);
    setMoney(key.Money);
    setCategory(key.Category);
    setDescription(key.Description);
    const string = localStorage.getItem("UserId");
    const email = string.replace(/[&,+()$~%@.'":*?<>{}]/g, "");
    axios.put(
      `https://react-expense-tracker-b8dfe-default-rtdb.firebaseio.com/ExpenseData${email}/${props}.json`,
      {
         money,
         description,
         category,
      }
    );
  };

  const sendDataHandler = (e) => {
    e.preventDefault();

    const string = localStorage.getItem("UserId");
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
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
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
        <div>
          <Button onClick={logOutHandler}>Log out</Button>
        </div>
      </div>
      <div>
        <Card className="input">
          <div className="ExpContainer">
            <div>
              <h1>Add Expenses</h1>
            </div>
          </div>
          <form onSubmit={sendDataHandler}>
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
              <button type="submit">submit</button>
            </div>
          </form>
        </Card>
        <ExpenseList editHandler={editHandler} />
      </div>
    </>
  );
};

export default Dashboard;
