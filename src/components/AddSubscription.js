//get the user input for a new subscription and add it to backend of project

import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../css/main.css";

function AddSubscription() {
  //declares useHistory and assigns it to a const
  const history = useHistory();

  //handle the submit button and convert form into an object
  //insets information into backend db.json project and displays in DOM
  function onHandleSubmit(event) {
    event.preventDefault();
    const submitForm = Object.fromEntries(new FormData(event.target).entries());
    if (submitForm.type !== "" && submitForm.price !== "") {
      if (submitForm.subscriptionType === "") {
        submitForm.subscriptionType = "miscellaneous";
      }
      submitForm.price = parseFloat(submitForm.price);
      fetch(`http://localhost:3210/subscriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitForm),
      }).then((res) => res.json());
      alert(`${submitForm.type} has been added to your list!`);
    } else
      alert("INAVLID INFORMATION....MUST HAVE NAME AND PRICE of SUBSCRIPTION");
    history.push("/subscription");
  }
  return (
    <form className="addSubscriptionForm" onSubmit={onHandleSubmit}>
      <div className="addSub">
        <div className="type">
          <label>Name of Subscription: </label>
          <input type="text" name="type" placeholder="ex: Netflix ..."></input>
        </div>
        <div className="price">
          <label>Price of Subscription</label>
          <input
            type="number"
            min="0"
            step="0.01"
            name="price"
            placeholder="ex: 9.99 ..."
          ></input>
        </div>
        <div className="logo">
          <label>Image of logo, if desired: </label>
          <input
            type="text"
            name="logo"
            placeholder=" insert image adress ..."
          ></input>
        </div>
        <div className="user-eneter-type">
          <label>
            Enter the type of subscription "if nothing selected default
            miscellaneous":{" "}
          </label>
          <select name="subscriptionType">
            <option value=""></option>
            <option value="streaming">streaming</option>
            <option value="shopping">shopping</option>
            <option value="insurance">insurance</option>
            <option value="finance">finance</option>
            <option value="miscellaneous">miscellaneous</option>
          </select>
        </div>
        <div className="submit">
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}

export default AddSubscription;
