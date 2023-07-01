import React, { useEffect, useState } from "react";
import Subscription from "./Subscription";
import "../css/main.css";
import UserMonth from "./UserMonth";

function SubcriptionCollection() {
  //useState that holds and sets the info of fetch data
  const [subscriptions, setSubscriptions] = useState([]);
  const [filter, setFilter] = useState("");

  //useEffect that only renders once when the application loads and fetchges data from backend
  useEffect(() => {
    fetch(`http://localhost:3210/subscriptions${filter}`)
      .then((res) => res.json())
      .then((data) => {
        setSubscriptions((subscriptions) => (subscriptions = data));
      })
  }, [filter]);

  //receives the event and sets filter state accordinly based on user input
  function onHandleSelect(event) {
    if (event.target.value === "none") setFilter((filter) => (filter = ""));
    else
      setFilter(
        (filter) => (filter = `?subscriptionType=${event.target.value}`)
      );
  }

  //function handles the submit of a search button and sets Filter state
  function onHandleSubmit(event) {
    event.preventDefault();
    const userInput = event.target.name.value;
    setFilter((filter) => (filter = `?type=${userInput}`));
    event.target.reset();
  }

  //function handles the onClick for id allBtn and sets filter to empty
  function handleReload() {
    setFilter((filter) => (filter = ""));
  }

  //returns a set of cards displayimg the information on subsciption
  return (
    <>
      <UserMonth sub={subscriptions} filter={filter} />
      <div className="typesOf">
        <div className="filters">
          <form className="submitbutton" onSubmit={onHandleSubmit}>
            <input placeholder="search..." name="name"></input>
            <button type="submit">search</button>
          </form>
          <button id="allBtn" type="click" onClick={handleReload}>
            Show All Subscriptions
          </button>
          <br></br>
          <div className="selectType">
            <label>Subscription type filter: </label>
            <select onChange={onHandleSelect}>
              <option value="none">none</option>
              <option value="streaming">streaming</option>
              <option value="shopping">shopping</option>
              <option value="insurance">insurance</option>
              <option value="finance">finance</option>
              <option value="miscellaneous">miscellaneous</option>
            </select>
          </div>
        </div>
      </div>
      {subscriptions.length === 0 ? (
        <p className="emptyList">You have no Subscriptions here</p>
      ) : (
        <div className="cards">
          {subscriptions.map((subscription, index) => {
            return (
              <div key={index} className="displayCard">
                <Subscription key={index} sub={subscription} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
export default SubcriptionCollection;
