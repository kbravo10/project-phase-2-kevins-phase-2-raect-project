import React, { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import "../css/main.css";

function SubInfo() {
  //state that holds and sets the data from the fetch request to backend project
  //add a useHistory variable to send the App where it needs to go after
  //useParams to get the url and use it to find the id for the fetch
  const [subscrption, setSubscription] = useState([]);
  const history = useHistory();
  const params = useParams();
  const [userEdit, setUserEdit] = useState(false);

  //use fetch method to aquire the data
  //useEffect to only render once to prevent loop or multiple renders
  useEffect(() => {
    fetch(`http://localhost:3210/subscriptions/${params.id}`)
      .then((res) => res.json())
      .then((data) => setSubscription((subscrption) => (subscrption = data)));
  }, [params.id]);

  //Delete or cancel the desired subscription removing it from dom
  function onHandleDelete() {
    const userConfirm = window.confirm(
      `Are you SURE you want to remove ${subscrption.type} from list?`
    );
    if (userConfirm) {
      fetch(`http://localhost:3210/subscriptions/${subscrption.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      alert(`${subscrption.type} has been CANCELED!`);
    } else alert(`You have decided to keep ${subscrption.type}`);

    history.push("/subscription");
  }
  //fires when user selcts change price button
  //takes the users new prive and requests a patch to modify object in the server
  function onHandlePriceChange(event) {
    event.preventDefault();
    console.log(event.target.newPrice.value);
    fetch(`http://localhost:3210/subscriptions/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: parseFloat(event.target.newPrice.value),
      }),
    }).then((res) => res.json());
    alert(
      `Price for ${subscrption.type} has been changed to ${event.target.newPrice.value}`
    );
    setUserEdit(false);
    history.push("/subscription");
  }

  // return subscription information
  return (
    <>
      <div className="infocard">
        <img id="infoImg" alt="none" src={subscrption.logo} />
        <h1>{subscrption.type}</h1>
        <p>Type: {subscrption.subscriptionType}</p>
        <strong className="price">Price: ${subscrption.price}</strong>
        <div className="delete">
          <button onClick={onHandleDelete}>Remove Subscription</button>
          <button onClick={() => setUserEdit(true)}>Edit Price</button>
        </div>
      </div>
      {userEdit ? (
        <form className="priceEditBtn" onSubmit={onHandlePriceChange}>
          <label>New price: </label>
          <input type="number" min="0" step="0.01" name="newPrice"></input>
          <button type="submit">submit</button>
        </form>
      ) : (
        <></>
      )}
    </>
  );
}

export default SubInfo;
