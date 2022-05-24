import { Avatar, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const paperStyled = {
    padding: 30,
    height: "60vh",
    width: 280,
    margin: "80px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const ariaLabel = { "aria-label": "description" };
  const emailHandler = (e) => {
    setEmailId(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        return alert("password do not match");
      }
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDMAeY4s_3W-uYEak8CGBun_az9tJyeAXo";
      const response = await axios.post(url, {
        email: emailId,
        password: password,
        returnSecureToken: true,
      });
      if (response) {
        console.log(response.data);
        console.log("user signed up");
        axios
          .post(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDMAeY4s_3W-uYEak8CGBun_az9tJyeAXo",
            {
              requestType: "VERIFY_EMAIL",
              idToken: response.data.idToken,
            }
          )
          .then((res) => {
            console.log(res);
            console.log("sucess");
            navigate("/login");
          });
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Grid>
      <Paper style={paperStyled}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon></LockOutlinedIcon>
          </Avatar>
          <h2>sign up</h2>
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
          <Input
            value={confirmPassword}
            onChange={confirmPasswordHandler}
            inputProps={ariaLabel}
            placeholder="Confirm password"
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
              Sign up
            </Button>

            <Typography style={{ marginTop: "15px" }}>
              Already have an account?
              <Link to="/login">Login</Link>
            </Typography>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default SignUp;
