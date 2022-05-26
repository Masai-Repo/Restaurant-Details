// import React from "react";

function RestaurantDetails({ name, cost, cuisine, image: url, rating, votes }) {
  console.log(name);
  return (
    <div style={{ display: "flex", gap: "20px", border: "1px solid black" }}>
      <div>
        <img width="50px" height="100px" src={url} alt={name} />
        <div>Name:{name}</div>
        <div>Cost:{cost}</div>
        <div>Cuisine:{cuisine}</div>
        <div>Rating:{rating}</div>
        <div>Votes:{votes}</div>
      </div>
    </div>
  );
}

export default RestaurantDetails;
