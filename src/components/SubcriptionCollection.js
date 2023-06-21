import React, { useEffect, useState } from "react";
import Subscription from "./Subscription"

function Body() {
  //useState that holds and sets the info of fetch data 
  const [subdcriptions, setSubscriptions] = useState([]);

  //useEffect that only renders once when the application loads and fetchges data from backend
  useEffect(() => {
    fetch(`http://localhost:3000/subscriptions`)
      .then((res) => res.json())
      .then((data) => setSubscriptions(data));
  }, []);
  //returns a set of cards displayimg the information on subsciption 
  return (
    <div className="cards">
        {subdcriptions.map((subscription, index) =>{
            return(
                <Subscription key={index} sub={subscription}/>
            )
        })}
    </div>
  )
}
export default Body;
