import React from "react";

function UserMonth({ sub, filter }) {
  //turn number into currency
  let totalInDollars = new Intl.NumberFormat(`en-US`, {
    style: "currency",
    currency: "USD",
  });

  //adds all prices and sets sum to total
  let sum = 0;
  sub.forEach((element) => {
    sum += element.price;
  });

  //gets substring and returns filter
  function newFilter() {
    const newText = filter.split("=")[1].toUpperCase();
    return newText;
  }
  return (
    <div className="monthly">
      <p>
        Total spent per month on {filter === "" ? "ALL" : newFilter()}{" "}
        subsciption(s)
      </p>
      <p>{totalInDollars.format(sum)}</p>
    </div>
  );
}
export default UserMonth;
