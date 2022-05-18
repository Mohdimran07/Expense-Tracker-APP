import React from 'react'
import "./Profile.css";
import axios from 'axios';
import { useContext, useRef } from "react";
import ExpenseContext from "../../context-store/Expense-context";

const Profile = () => {
    const nameRef = useRef();
    const profileRef = useRef();
    const expCtx = useContext(ExpenseContext);
    
  
    const submitHandler = async(e) => {
      e.preventDefault();
  
      const Name = nameRef.current.value;
      const Profile = profileRef.current.value;

      try{
          const res = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDMAeY4s_3W-uYEak8CGBun_az9tJyeAXo", {
            idToken: expCtx.token,
            displayName: Name,
            photoUrl: Profile,
            deleteAttribute: "Display_Name",
            returnSecureToken: true, 
          })
          if(res){
              console.log(res)
          }
      } catch(e){
          console.log(e);
      }
  
    //   fetch(
    //     "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD1BTMA7z79Hl-kprnDA2dYOj0ZeIHyiEs",
    //     {
    //       method: "POST",
    //       body: JSON.stringify({
    //         idToken: expCtx.token,
    //         displayName: Name,
    //         photoUrl: Profile,
    //         deleteAttribute: "Display_Name",
    //         returnSecureToken: true,
    //       }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   ).then((res) => {
    //     console.log(res);
    //     axios.get('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD1BTMA7z79Hl-kprnDA2dYOj0ZeIHyiEs',{
    //      idToken: res.data.idToken,
    //     }).then(data => {
    //         console.log(data)
    //     })
        
    //   }).catch(err => {
    //       console.log(err);
    //   })
  
     
  
  };
  return (
    <section className="contain">
    <header>
      <div>
        <h1>Contact Details</h1>
      </div>
      <form onSubmit={submitHandler}>
        <div className="control">
          <label>Name:</label>
          <br></br>
          <input type="text" required ref={nameRef}></input>
        </div>
        <div className="control">
          <label>Profile Photo URL:</label>
          <br></br>
          <input type="text" required ref={profileRef}></input>
        </div>
        <div className="action">
          <button>Update</button>
        </div>
      </form>
    </header>
  </section>
  )
}

export default Profile
