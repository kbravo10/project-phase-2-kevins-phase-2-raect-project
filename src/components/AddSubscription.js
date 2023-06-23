//get the user input for a new subscription and add it to backend of project

import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AddSubscription() {

    const history = useHistory();
  //handle the submit button and convert form into an object
  //insets information into backend db.json project and displays in DOM
  function onHandleSubmit(event) {
    event.preventDefault();
    const submitForm = Object.fromEntries(new FormData(event.target).entries());
    fetch(`http://localhost:3100/subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitForm),
    }).then((res) => res.json());
    alert(`${submitForm.type} has been added to your list!`)
    history.push("/subscription")
  }
  return (
    <form className="add-subscription" onSubmit={onHandleSubmit}>
      <div className="type">
        <label>Name of Subscription: </label>
        <input type="text" name="type" placeholder="ex: Netflix ..."></input>
      </div>
      <div className="price">
        <label>Price of Subscription</label>
        <input type="text" name="price" placeholder="ex: 9.99 ..."></input>
      </div>
      <div className="logo">
        <label>Image of logo, if desired: </label>
        <input
          type="text"
          name="logo"
          placeholder=" insert image adress ..."
        ></input>
      </div>
      <div className="submit">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}

export default AddSubscription;
