import React from "react";
import { ICopCardProps } from "./ICopCardProps";
import "./_copcard.css";

const CopCard: React.FC<ICopCardProps> = (props) => {
  return (
    <div
      className={props.isSelected ? "cop-selected-card" : "cop-card-container"}
      onClick={props.onSelect}
    >
      <img
        src={`/images/${props.cops.image}.png`}
        className="cop-card-img"
        alt={`${props.cops.name}`}
      />
      <span className="cop-number-text">{`${props.cops.name}`}</span>
    </div>
  );
};

export default CopCard;
