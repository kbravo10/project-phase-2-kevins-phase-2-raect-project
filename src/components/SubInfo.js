import React, { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import "./main.css";

function SubInfo() {
  //state that holds and sets the data from the fetch request to backend project
  const [subscrption, setSubscription] = useState([]);
  const history = useHistory();
  const params = useParams();

  //use fetch method to aquire the data
  //useEffect to only render once to prevent loop or multiple renders
  useEffect(() => {
    fetch(`http://localhost:3000/subscriptions/${params.id}`)
      .then((res) => res.json())
      .then((data) => setSubscription((subscrption) => (subscrption = data)));
  }, [params.id]);

  //Delete or cancel the desired subscription removing it from dom
  function onHandleDelete() {
    fetch(`http://localhost:3000/subscriptions/${subscrption.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    alert(`${subscrption.type} has been CANCELED!`);

    history.push("/subscription");
  }

  // return subscription information
  return (
    <div className="infocard">
      <img id="infoImg" alt="none" src={subscrption.logo} />
      <h2>{subscrption.type}</h2>

      <span className="meta">Price: {subscrption.price}</span>
      <div className="delete">
        <button onClick={onHandleDelete}>Cancel Subscription</button>
      </div>
    </div>
  );
}

export default SubInfo;
