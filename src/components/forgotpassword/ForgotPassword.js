import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import  './ForgotPassword.css';

const ForgotPassword = () => {
    const emailInputRef = useRef();
    const navigate = useNavigate()

    const submitHandler = (e) => {
      e.preventDefault();
      const enteredEmail = emailInputRef.current.value;

    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDMAeY4s_3W-uYEak8CGBun_az9tJyeAXo', {
        email: enteredEmail,
        requestType: "PASSWORD_RESET"
    }).then(data => {
        console.log(data)
        navigate("/login")
    })
    }
    return (
        <section className="contain">
       
        <form onSubmit={submitHandler}>
          <div className="control">
            <input
              type="email"
              id="email"
              required
              ref={emailInputRef}
              placeholder="email"
            />
          </div>
          <div className="toggle">
          <button >Submit</button>
          </div>
          </form>
          </section>
    )
};

export default ForgotPassword;

