import React from "react";

const Card = (props) => {
  return (
    <div className="card-from-function">
      <h3>{props.name}</h3>
      <p><strong>Location:</strong> {props.location}</p>
      <p><strong>Instagram:</strong> @{props.instagram?.toLowerCase()}</p>
    </div>
  );
};

export default Card;
