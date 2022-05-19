import { Avatar, Button, Grid, Input, Paper, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ExpenseContext from "../../context-store/Expense-context";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const expCtx = useContext(ExpenseContext);
  const navigate = useNavigate();
  const ariaLabel = { "aria-label": "description" };
  const emailHandler = (e) => {
    setEmailId(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDMAeY4s_3W-uYEak8CGBun_az9tJyeAXo";
      const response = await axios.post(url, {
        email: emailId,
        password: password,
        returnSecureToken: true,
      });
      if (response) {
        console.log(response.data.idToken);
        console.log("loggedin");
        expCtx.login(response.data.idToken, response.data.email);
        navigate("/");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Grid>
      <Paper
        style={{ padding: 30, height: "60vh", width: 280, margin: "80px auto" }}
      >
        <Grid align="center">
          <Avatar style={{ backgroundColor: "#1bbd7e" }}>
            <LockOutlinedIcon></LockOutlinedIcon>
          </Avatar>
          <h2>Login</h2>
        </Grid>
        <br />
        <form onSubmit={submitHandler}>
          <Input
            value={emailId}
            onChange={emailHandler}
            inputProps={ariaLabel}
            placeholder="email Id"
            required
            fullWidth
          />
          <br></br>
          <Input
            value={password}
            onChange={passwordHandler}
            inputProps={ariaLabel}
            placeholder="password"
            type="password"
            required
            fullWidth
          />
          <br></br>
          <Grid align="center">
            <Button
              type="submit"
              variant="contained"
              style={{ marginTop: "20px" }}
              fullWidth
            >
              Login
            </Button>
            <Typography style={{ marginTop: "10px" }}>
              <Link to="/forgot">Forgot Password</Link>
            </Typography>
            <Typography style={{ marginTop: "10px" }}>
              Create an account
              <Link to="/signup">Signup</Link>
            </Typography>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
